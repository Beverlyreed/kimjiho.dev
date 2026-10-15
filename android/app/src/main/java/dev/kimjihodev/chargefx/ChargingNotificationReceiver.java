package dev.kimjihodev.chargefx;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class ChargingNotificationReceiver extends BroadcastReceiver {
    static final String PREFERENCES = "ChargeFXSettings";
    static final String EXTRA_OPEN_CHARGING = "dev.kimjihodev.chargefx.OPEN_CHARGING";
    private static final String CHANNEL_ID = "chargefx_charging";
    private static final int NOTIFICATION_ID = 7401;

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        NotificationManager manager = (NotificationManager) context.getSystemService(
            Context.NOTIFICATION_SERVICE
        );
        if (manager == null) return;
        if (Intent.ACTION_POWER_DISCONNECTED.equals(action)) {
            manager.cancel(NOTIFICATION_ID);
            return;
        }
        if (!Intent.ACTION_POWER_CONNECTED.equals(action)) return;

        boolean enabled = context
            .getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
            .getBoolean("chargingAnimations", true);
        boolean automatic = context
            .getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE)
            .getBoolean("automaticActivation", false);
        if (!enabled || !automatic || !notificationsAllowed(context, manager)) return;

        ensureChannel(manager);
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(
            context.getPackageName()
        );
        if (launchIntent == null) return;
        launchIntent.putExtra(EXTRA_OPEN_CHARGING, true);
        launchIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            context,
            0,
            launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        Notification notification = new NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_lock_power_off)
            .setContentTitle("ChargeFX is ready")
            .setContentText("Tap to open your charging animation.")
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build();
        manager.notify(NOTIFICATION_ID, notification);
    }

    private boolean notificationsAllowed(Context context, NotificationManager manager) {
        if (!NotificationManagerCompat.from(context).areNotificationsEnabled()) return false;
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
            || context.checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS)
                == android.content.pm.PackageManager.PERMISSION_GRANTED;
    }

    private void ensureChannel(NotificationManager manager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Charging animations",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Tap to open a ChargeFX charging animation.");
            manager.createNotificationChannel(channel);
        }
    }
}
