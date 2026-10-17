package dev.kimjihodev.chargefx;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build;
import android.provider.Settings;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.PermissionState;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "ChargeFXBattery",
    permissions = {
        @Permission(
            alias = "notifications",
            strings = { Manifest.permission.POST_NOTIFICATIONS }
        )
    }
)
public class ChargeFXBatteryPlugin extends Plugin {
    private BroadcastReceiver batteryReceiver;
    private BroadcastReceiver chargingReceiver;
    private boolean pendingChargingRequest;

    @Override
    public void load() {
        batteryReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                notifyListeners("batteryStatus", readBatteryStatus(intent));
            }
        };
        ContextCompat.registerReceiver(
            getContext(),
            batteryReceiver,
            new IntentFilter(Intent.ACTION_BATTERY_CHANGED),
            ContextCompat.RECEIVER_NOT_EXPORTED
        );
        chargingReceiver = new ChargingNotificationReceiver();
        IntentFilter chargingFilter = new IntentFilter();
        chargingFilter.addAction(Intent.ACTION_POWER_CONNECTED);
        chargingFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        ContextCompat.registerReceiver(
            getContext(),
            chargingReceiver,
            chargingFilter,
            ContextCompat.RECEIVER_NOT_EXPORTED
        );
    }

    @Override
    protected void handleOnDestroy() {
        if (batteryReceiver != null) {
            getContext().unregisterReceiver(batteryReceiver);
            batteryReceiver = null;
        }
        if (chargingReceiver != null) {
            getContext().unregisterReceiver(chargingReceiver);
            chargingReceiver = null;
        }
        super.handleOnDestroy();
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        if (intent.getBooleanExtra(ChargingNotificationReceiver.EXTRA_OPEN_CHARGING, false)) {
            pendingChargingRequest = true;
            JSObject event = new JSObject();
            event.put("openCharging", true);
            notifyListeners("chargingRequested", event);
        }
        super.handleOnNewIntent(intent);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        Intent battery = getContext().registerReceiver(
            null,
            new IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        );
        call.resolve(battery == null ? unavailableStatus() : readBatteryStatus(battery));
    }

    @PluginMethod
    public void setPreferences(PluginCall call) {
        getContext()
            .getSharedPreferences(ChargingNotificationReceiver.PREFERENCES, Context.MODE_PRIVATE)
            .edit()
            .putBoolean("chargingAnimations", call.getBoolean("chargingAnimations", true))
            .putBoolean("automaticActivation", call.getBoolean("automaticActivation", false))
            .putBoolean("updateNotifications", call.getBoolean("updateNotifications", true))
            .putString("selectedAnimation", call.getString("selectedAnimation", "liquid-pulse"))
            .apply();
        UpdateCheckScheduler.configure(
            getContext(),
            call.getBoolean("updateNotifications", true)
        );
        call.resolve();
    }

    @PluginMethod
    public void requestNotifications(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            JSObject result = new JSObject();
            result.put("granted", notificationsEnabled());
            call.resolve(result);
            return;
        }
        if (getPermissionState("notifications") == PermissionState.GRANTED) {
            JSObject result = new JSObject();
            result.put("granted", true);
            call.resolve(result);
            return;
        }
        requestPermissionForAlias("notifications", call, "notificationPermissionCallback");
    }

    @PermissionCallback
    private void notificationPermissionCallback(PluginCall call) {
        JSObject result = new JSObject();
        result.put("granted", getPermissionState("notifications") == PermissionState.GRANTED);
        call.resolve(result);
    }

    @PluginMethod
    public void getLaunchRequest(PluginCall call) {
        Intent intent = getActivity().getIntent();
        boolean openCharging = pendingChargingRequest || (intent != null && intent.getBooleanExtra(
            ChargingNotificationReceiver.EXTRA_OPEN_CHARGING,
            false
        ));
        if (openCharging) {
            pendingChargingRequest = false;
            if (intent != null) {
                intent.removeExtra(ChargingNotificationReceiver.EXTRA_OPEN_CHARGING);
                getActivity().setIntent(intent);
            }
        }
        JSObject result = new JSObject();
        result.put("openCharging", openCharging);
        call.resolve(result);
    }

    @PluginMethod
    public void openDreamSettings(PluginCall call) {
        Intent settingsIntent = new Intent(Settings.ACTION_DREAM_SETTINGS);
        if (settingsIntent.resolveActivity(getContext().getPackageManager()) == null) {
            call.reject("Android screen saver settings are not available on this device.");
            return;
        }
        getActivity().startActivity(settingsIntent);
        call.resolve();
    }

    private boolean notificationsEnabled() {
        return NotificationManagerCompat.from(getContext()).areNotificationsEnabled()
            && (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
                || getPermissionState("notifications") == PermissionState.GRANTED);
    }

    private JSObject unavailableStatus() {
        JSObject result = new JSObject();
        result.put("available", false);
        result.put("percentage", JSObject.NULL);
        result.put("charging", JSObject.NULL);
        result.put("full", false);
        result.put("plugged", false);
        result.put("notificationsEnabled", notificationsEnabled());
        return result;
    }

    private JSObject readBatteryStatus(Intent intent) {
        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        int pluggedState = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, 0);
        boolean available = level >= 0 && scale > 0;
        boolean full = status == BatteryManager.BATTERY_STATUS_FULL;
        Boolean charging = status == BatteryManager.BATTERY_STATUS_CHARGING || full
            ? pluggedState != 0
            : status == BatteryManager.BATTERY_STATUS_DISCHARGING
                || status == BatteryManager.BATTERY_STATUS_NOT_CHARGING
                    ? false
                    : null;
        JSObject result = new JSObject();
        result.put("available", available);
        result.put("percentage", available ? Math.round(level * 100f / scale) : JSObject.NULL);
        result.put("charging", charging == null ? JSObject.NULL : charging);
        result.put("full", full);
        result.put("plugged", pluggedState != 0);
        result.put("notificationsEnabled", notificationsEnabled());
        return result;
    }
}
