package dev.kimjihodev.chargefx;

import android.content.Context;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.ExistingWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import java.util.concurrent.TimeUnit;

final class UpdateCheckScheduler {
    private static final String PERIODIC_WORK = "chargefx_update_check_periodic";
    private static final String IMMEDIATE_WORK = "chargefx_update_check_immediate";

    private UpdateCheckScheduler() {}

    static void configure(Context context, boolean enabled) {
        WorkManager workManager = WorkManager.getInstance(context);
        if (!enabled) {
            workManager.cancelUniqueWork(PERIODIC_WORK);
            workManager.cancelUniqueWork(IMMEDIATE_WORK);
            return;
        }

        Constraints constraints = new Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build();
        OneTimeWorkRequest immediateCheck = new OneTimeWorkRequest.Builder(
            UpdateCheckWorker.class
        )
            .setConstraints(constraints)
            .build();
        PeriodicWorkRequest periodicCheck = new PeriodicWorkRequest.Builder(
            UpdateCheckWorker.class,
            24,
            TimeUnit.HOURS
        )
            .setConstraints(constraints)
            .build();
        workManager.enqueueUniqueWork(
            IMMEDIATE_WORK,
            ExistingWorkPolicy.KEEP,
            immediateCheck
        );
        workManager.enqueueUniquePeriodicWork(
            PERIODIC_WORK,
            ExistingPeriodicWorkPolicy.UPDATE,
            periodicCheck
        );
    }
}
