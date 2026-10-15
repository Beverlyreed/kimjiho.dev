const apkLink = document.querySelector("#download-apk");
const apkSize = document.querySelector("[data-apk-size]");
const downloadStatus = document.querySelector("#download-status");

if (apkSize) {
  const sizeInBytes = 4_118_301;
  const sizeInMegabytes = (sizeInBytes / (1024 * 1024)).toFixed(1);
  apkSize.textContent = `APK · ${sizeInMegabytes} MB`;
}

apkLink?.addEventListener("click", () => {
  if (downloadStatus) {
    downloadStatus.textContent = "Your download is starting. Open the APK when it finishes.";
  }
});
