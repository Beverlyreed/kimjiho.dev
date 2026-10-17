const apkLink = document.querySelector("#download-apk");
const apkSize = document.querySelector("[data-apk-size]");
const downloadStatus = document.querySelector("#download-status");
const isUpdate = new URLSearchParams(window.location.search).get("update") === "1";

if (isUpdate) {
  document.title = "Update ChargeFX for Android";
  document.querySelector("#download-eyebrow").lastChild.textContent = " YOUR CHARGEFX UPDATE IS READY";
  document.querySelector("#hero-title").innerHTML = "A fresher charge <span>is ready.</span>";
  document.querySelector("#download-intro").textContent =
    "Download the latest ChargeFX APK, then open it and confirm the Android update prompt.";
  document.querySelector("#download-label").textContent = "Download update APK";
  document.querySelector("#download-guidance").textContent =
    "Your existing ChargeFX installation and settings will be updated. You do not need to uninstall the app.";
}

fetch("./update.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Update metadata returned HTTP ${response.status}.`);
    return response.json();
  })
  .then((metadata) => {
    if (apkSize && Number.isInteger(metadata.versionCode) && metadata.versionName) {
      apkSize.textContent = `Latest APK · v${metadata.versionName}`;
      if (isUpdate) {
        document.querySelector("#download-label").textContent =
          `Download update APK · v${metadata.versionName}`;
      }
    }
  })
  .catch((error) => console.warn("Latest ChargeFX version could not be loaded.", error));

apkLink?.addEventListener("click", () => {
  if (downloadStatus) {
    downloadStatus.textContent = isUpdate
      ? "Your update download is starting. Open the APK when it finishes and confirm the Android update prompt."
      : "Your download is starting. Open the APK when it finishes to install or update ChargeFX.";
  }
});
