# Android permissions and charging behavior

ChargeFX asks for notification permission only when **Charging notification** is enabled in Settings on Android 13 or newer.
Version 0.1.2 and newer also request it for the enabled **App update notifications** setting.

| Capability | Android mechanism | User impact |
| --- | --- | --- |
| Battery percentage and charge state | System `ACTION_BATTERY_CHANGED` broadcast, read while the app is active | No runtime permission |
| Charger connect/disconnect | Runtime receiver registered while the native app process is active | No runtime permission; disconnect dismisses the ChargeFX notification |
| Charging experience activation | User-tappable notification | Never starts an activity over another app or lock screen |
| Notification display | `POST_NOTIFICATIONS` on Android 13+ | Explicit OS permission; feature stays opt-in |
| Update availability | WorkManager checks a public version JSON endpoint daily when online | Requires update notifications enabled and permitted; checks may be delayed by Android power management |
| APK installation | Android package installer, opened from the download page | User downloads the APK, permits installs from the browser if prompted, and approves the install |
| Local preferences | Android app storage / WebView local storage | No cloud backup, network account, or server |

The battery and charger receivers are registered with the native plugin and unregistered with the Android activity lifecycle. Android 8+ restricts manifest-declared receivers for many implicit broadcasts, including charger-connect events, so the charger receiver is registered dynamically. A notification is posted when the app process is active, the user enabled the feature, and notifications are allowed. Android may stop a background process, and force-stopping the app prevents it from receiving charger events until the app is opened again. ChargeFX does not run a foreground service to keep monitoring continuously. Android 13+ can block notifications until the user grants permission; Android settings can also disable them later.

The notification is an invitation, not an automatic overlay. The user must tap it to open the charging experience. Android and device manufacturers can impose additional background restrictions, so behavior must be tested on each target device.

No wake lock, foreground service, exact alarm, overlay permission, or boot receiver is used.

The update metadata is served from `download/update.json`. Whenever a newer APK is published, update its `versionCode` and `versionName` to match the Android build. An update notification opens the download page; Android does not allow silent self-installation. Versions older than 0.1.2 have no update checker and must be upgraded manually once before they can receive future update alerts.
