# ChargeFX

**Make Every Charge a Moment.**
Designed & Developed by Kim Ji-ho.dev

ChargeFX is a mobile-first Liquid Glass app with a Capacitor Android wrapper. It includes five categories, 25 individually styled animation concepts, search/filtering, previews, favorites, locally saved settings, and a native Android battery/charger bridge.

## Run the prototype

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

To create the web assets and sync the Android project:

```sh
npm run cap:sync
```

## Android features and limitations

- In the Android app, battery percentage and charging status are read from Android. Browser previews clearly label their example values.
- Charger connection can create one optional Android notification when enabled and permitted. Tapping it opens the selected charging experience; it never forcibly opens an activity on top of other apps or the lock screen.
- Notification permission is requested only when the user enables charger notifications on Android 13+.
- Favorites and settings remain local. The app has no account, analytics, or backend.
- Android builds require Android Studio/SDK and JDK 21.

## Current interaction map

- Home: featured animation, quick preview, category shortcuts, trending collection.
- Discover: case-insensitive search, category filters, and all 25 concepts.
- Favorites: add/remove saved concepts and an empty state.
- Settings: locally persisted preferences, default animation, reduced-motion and battery-friendly options.
- Preview: replay, favorite, and apply-to-default actions; preview data is clearly marked.
- `Ctrl/Cmd + K`: jump to animation search.

## Build, install, and distribute

- See [docs/BUILD.md](docs/BUILD.md) for debug/release builds, signing, and GitHub Releases.
- See [docs/INSTALLATION.md](docs/INSTALLATION.md) for sideloading instructions.
- See [docs/ANDROID_PERMISSIONS.md](docs/ANDROID_PERMISSIONS.md) for native permissions and OS behavior.

### Download the Android test build

[Open the ChargeFX download website](https://beverlyreed.github.io/kimjiho.dev/download/) or [download ChargeFX-debug.apk](./ChargeFX-debug.apk) directly to install the current debug build. This APK is debug-signed and has not been tested on a physical device; it is for testing, not a production release. See the build guide above to create a signed release APK.
