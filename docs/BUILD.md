# Build and publish ChargeFX for Android

## Requirements

- Node.js 20+
- Android Studio with Android SDK Platform 35 and Build Tools installed
- JDK 21 for the Capacitor 7 Android project

Open `android/` in Android Studio to install any missing SDK components, or build from a terminal.

## Debug APK (Windows PowerShell)

From the project root:

```powershell
npm ci
npm run cap:sync
.\android\gradlew.bat -p android assembleDebug
```

The installable debug APK is written to:

`android\app\build\outputs\apk\debug\app-debug.apk`

Install it on a connected device with Android Debug Bridge:

```powershell
adb install -r .\android\app\build\outputs\apk\debug\app-debug.apk
```

## Signed release APK

Create a private Android signing keystore once and store it outside this repository. Back it up securely: losing the key prevents updates to an app signed with it. Never commit the keystore or passwords.

Set these environment variables in the build shell:

- `CHARGEFX_KEYSTORE_PATH`
- `CHARGEFX_KEYSTORE_PASSWORD`
- `CHARGEFX_KEY_ALIAS`
- `CHARGEFX_KEY_PASSWORD`

Then run:

```powershell
npm ci
npm run cap:sync
.\android\gradlew.bat -p android assembleRelease
```

When all four variables are present, Gradle signs the release APK. It is written to `android\app\build\outputs\apk\release\app-release.apk`. Verify the signature with `apksigner verify --verbose --print-certs <apk-path>` before distributing it.

## GitHub Releases

The workflow at `.github/workflows/android-release.yml` builds and uploads a signed APK when a `v*` tag is pushed. Before using it:

1. Generate a private release keystore and keep the original backup secure.
2. Add GitHub Actions repository secrets named `CHARGEFX_KEYSTORE_BASE64`, `CHARGEFX_KEYSTORE_PASSWORD`, `CHARGEFX_KEY_ALIAS`, and `CHARGEFX_KEY_PASSWORD`. The first is the base64 encoding of the keystore file. Never place these values in source files.
3. Push a version tag such as `v1.0.0`. The workflow fails before building if a signing secret is missing.
4. Review the workflow result and test the APK on a physical Android device before announcing the release.

The workflow requires `contents: write` permission to create the GitHub Release. Treat the release keystore as the app's identity; do not rotate or replace it for updates.

The workflow assigns a monotonically increasing Android `versionCode` from its run number and uses the release tag as `versionName`. For manual release builds, set `CHARGEFX_VERSION_CODE` to an integer greater than the last published build and `CHARGEFX_VERSION_NAME` to the user-facing version.
