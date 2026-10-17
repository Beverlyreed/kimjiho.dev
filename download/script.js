const apkLink = document.querySelector("#download-apk");
const apkSize = document.querySelector("[data-apk-size]");
const downloadStatus = document.querySelector("#download-status");

fetch("./update.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Update metadata returned HTTP ${response.status}.`);
    return response.json();
  })
  .then((metadata) => {
    if (apkSize && Number.isInteger(metadata.versionCode) && metadata.versionName) {
      apkSize.textContent = `Latest APK · v${metadata.versionName}`;
    }
  })
  .catch((error) => console.warn("Latest ChargeFX version could not be loaded.", error));

apkLink?.addEventListener("click", () => {
  if (downloadStatus) {
    downloadStatus.textContent = "Your download is starting. Open the APK when it finishes.";
  }
});
