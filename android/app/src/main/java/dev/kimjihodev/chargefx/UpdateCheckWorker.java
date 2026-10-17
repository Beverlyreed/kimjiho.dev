package dev.kimjihodev.chargefx;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONException;
import org.json.JSONObject;

public class UpdateCheckWorker extends Worker {
    private static final String TAG = "ChargeFXUpdate";
    private static final String METADATA_URL =
        "https://beverlyreed.github.io/kimjiho.dev/download/update.json";
    private static final String DOWNLOAD_PAGE =
        "https://beverlyreed.github.io/kimjiho.dev/download/";
    private static final String CHANNEL_ID = "chargefx_updates";
    private static final int NOTIFICATION_ID = 7402;
    private static final String PREFERENCES = "ChargeFXUpdates";
    private static final String LAST_NOTIFIED_CODE = "lastNotifiedVersionCode";

    public UpdateCheckWorker(Context context, WorkerParameters parameters) {
        super(context, parameters);
    }

    @Override
    public Result doWork() {
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) new URL(METADATA_URL).openConnection();
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(15000);
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Cache-Control", "no-cache");
            connection.setUseCaches(false);
            int responseCode = connection.getResponseCode();
            if (responseCode < 200 || responseCode >= 300) {
                Log.w(TAG, "Update metadata request returned HTTP " + responseCode);
                return Result.retry();
            }

            StringBuilder body = new StringBuilder();
            try (InputStream input = connection.getInputStream()) {
                byte[] buffer = new byte[4096];
                int count;
                while ((count = input.read(buffer)) != -1) {
                    body.append(new String(buffer, 0, count, java.nio.charset.StandardCharsets.UTF_8));
                    if (body.length() > 16384) {
                        Log.e(TAG, "Update metadata response exceeded the size limit.");
                        return Result.failure();
                    }
                }
            }
            checkForUpdate(new JSONObject(body.toString()));
            return Result.success();
        } catch (IOException error) {
            Log.w(TAG, "Could not reach the update metadata endpoint.", error);
            return Result.retry();
        } catch (JSONException | PackageManager.NameNotFoundException error) {
            Log.e(TAG, "Update metadata could not be processed.", error);
            return Result.failure();
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private void checkForUpdate(JSONObject metadata)
        throws JSONException, PackageManager.NameNotFoundException {
        int latestVersionCode = metadata.getInt("versionCode");
        String latestVersionName = metadata.getString("versionName");
        if (latestVersionCode <= 0 || latestVersionName.trim().isEmpty()) {
            throw new JSONException("Update metadata contains an invalid version.");
        }

        PackageInfo installed = getApplicationContext()
            .getPackageManager()
            .getPackageInfo(getApplicationContext().getPackageName(), 0);
        long installedVersionCode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
            ? installed.getLongVersionCode()
            : installed.versionCode;
        if (latestVersionCode <= installedVersionCode) return;

        Context context = getApplicationContext();
        if (!notificationsAllowed(context)) {
            Log.i(TAG, "Update is available, but notifications are not allowed.");
            return;
        }

        int lastNotifiedCode = context
            .getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
            .getInt(LAST_NOTIFIED_CODE, 0);
        if (latestVersionCode <= lastNotifiedCode) return;

        NotificationManager manager = (NotificationManager) context.getSystemService(
            Context.NOTIFICATION_SERVICE
        );
        if (manager == null) {
            Log.e(TAG, "Notification service is unavailable.");
            return;
        }
        ensureChannel(manager);

        Intent downloadIntent = new Intent(
            Intent.ACTION_VIEW,
            Uri.parse(DOWNLOAD_PAGE)
        );
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            1,
            downloadIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        NotificationCompat.Builder notification = new NotificationCompat.Builder(
            context,
            CHANNEL_ID
        )
            .setSmallIcon(android.R.drawable.stat_sys_download_done)
            .setContentTitle("ChargeFX update available")
            .setContentText("Version " + latestVersionName + " is ready to install.")
            .setStyle(
                new NotificationCompat.BigTextStyle()
                    .bigText("Version " + latestVersionName
                        + " is available. Tap to download and install it.")
            )
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT);
        NotificationManagerCompat.from(context).notify(NOTIFICATION_ID, notification.build());
        context
            .getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
            .edit()
            .putInt(LAST_NOTIFIED_CODE, latestVersionCode)
            .apply();
    }

    private boolean notificationsAllowed(Context context) {
        return NotificationManagerCompat.from(context).areNotificationsEnabled()
            && (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
                || context.checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS)
                    == PackageManager.PERMISSION_GRANTED);
    }

    private void ensureChannel(NotificationManager manager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "App updates",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Alerts when a newer ChargeFX version is available.");
            manager.createNotificationChannel(channel);
        }
    }
}
