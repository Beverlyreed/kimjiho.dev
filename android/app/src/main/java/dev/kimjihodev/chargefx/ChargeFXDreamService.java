package dev.kimjihodev.chargefx;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.service.dreams.DreamService;
import android.view.View;

public class ChargeFXDreamService extends DreamService {
    private BroadcastReceiver batteryReceiver;
    private DreamAnimationView animationView;

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        setInteractive(true);
        setFullscreen(true);
        setScreenBright(false);
        animationView = new DreamAnimationView(this);
        animationView.setOnClickListener(view -> finish());
        setContentView(animationView);
    }

    @Override
    public void onDreamingStarted() {
        super.onDreamingStarted();
        boolean animationsEnabled = getSharedPreferences(
            ChargingNotificationReceiver.PREFERENCES,
            MODE_PRIVATE
        ).getBoolean("chargingAnimations", true);
        if (!animationsEnabled) {
            finish();
            return;
        }
        if (animationView == null) return;

        Intent battery = registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        updateBattery(battery);
        batteryReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                updateBattery(intent);
            }
        };
        registerReceiver(batteryReceiver, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        animationView.start();
    }

    @Override
    public void onDreamingStopped() {
        if (animationView != null) animationView.stop();
        if (batteryReceiver != null) {
            unregisterReceiver(batteryReceiver);
            batteryReceiver = null;
        }
        super.onDreamingStopped();
    }

    @Override
    public void onWakeUp() {
        finish();
        super.onWakeUp();
    }

    private void updateBattery(Intent intent) {
        if (intent == null || animationView == null) return;
        int level = intent.getIntExtra("level", -1);
        int scale = intent.getIntExtra("scale", -1);
        boolean charging = intent.getIntExtra("plugged", 0) != 0;
        if (level >= 0 && scale > 0) {
            animationView.setBattery(Math.round(level * 100f / scale), charging);
        }
    }
}
