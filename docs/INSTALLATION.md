# Installing a ChargeFX APK

1. Download `ChargeFX-debug.apk` from the project repository for testing, or download `app-release.apk` from a GitHub Release when one is available.
2. Open the downloaded APK. If Android asks, allow Chrome to **Install unknown apps** in Android Settings, then return and retry the installation.
3. Review the Android install prompt and install ChargeFX.
4. Open ChargeFX. To show a notification after a charger connects, open Settings, enable **Charging notification**, and grant notification permission when Android asks.
5. Tap the ChargeFX notification to open the charging experience. Android does not permit the app to force-open over another app or lock screen.

The repository APK is debug-signed and intended for testing. A future release APK will use a separate release signing key, so Android may not allow it to update an installation of the debug build. Only install APKs from a source you trust. Menu names may differ between Android versions and device manufacturers.
