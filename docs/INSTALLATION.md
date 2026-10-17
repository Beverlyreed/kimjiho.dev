# Installing a ChargeFX APK

1. Download `ChargeFX-debug.apk` from the project repository for testing, or download `app-release.apk` from a GitHub Release when one is available.
2. Open the downloaded APK. If Android asks, allow Chrome to **Install unknown apps** in Android Settings, then return and retry the installation.
3. Review the Android install prompt and install ChargeFX.
4. Open ChargeFX. To show a notification after a charger connects, open Settings, enable **Charging notification**, and grant notification permission when Android asks. Keep ChargeFX running in the background; Android may stop its process, and force-stopping the app prevents charger notifications until you open it again.
5. Tap the ChargeFX notification to open the charging experience. Android does not permit the app to force-open over another app or lock screen.
6. In version 0.1.2 and newer, leave **App update notifications** enabled and allow notifications. ChargeFX checks for updates when opened and periodically in the background while connected to the internet. Tap an update alert to open the download page, download the APK, and approve Android's installation prompt.

The repository APK is debug-signed and intended for testing. A future release APK will use a separate release signing key, so Android may not allow it to update an installation of the debug build. Only install APKs from a source you trust. Menu names may differ between Android versions and device manufacturers.

Earlier versions do not contain an update checker and cannot be alerted automatically. Those users must install version 0.1.2 manually once; later versions can notify them about subsequent updates. Android always requires the user to approve sideloaded APK installations.
