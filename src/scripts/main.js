import { animations, categories, getAnimation, getCategory } from "../data/animations.js";
import { loadState, saveState } from "./storage.js";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor, registerPlugin } from "@capacitor/core";
import "../styles/main.css";

const state = loadState();
state.screen = "intro";
state.battery = { native: false, available: false, percentage: null, charging: null, full: false };
const app = document.querySelector("#app");
const nativeBattery = registerPlugin("ChargeFXBattery");
const icons = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z"/>',
  discover: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  favorites: '<path d="M20.8 8.7c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.8Z"/>',
  back: '<path d="m15 18-6-6 6-6"/><path d="M9 12h11"/>',
  play: '<path d="m8 5 12 7-12 7V5Z" fill="currentColor" stroke="none"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>'
};

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.bolt}</svg>`;
}

function categoryName(id) {
  return getCategory(id)?.name || "Animation";
}

function art(animation, extra = "") {
  return `<div class="art art-${animation.visual} ${extra}" aria-hidden="true"><span class="art-orbit"></span><span class="art-core"><i></i><b></b></span><span class="art-spark spark-one"></span><span class="art-spark spark-two"></span><span class="art-spark spark-three"></span></div>`;
}

function favoriteButton(animation, large = false) {
  const active = state.favorites.includes(animation.id);
  return `<button class="favorite-button ${active ? "is-favorite" : ""} ${large ? "favorite-large" : ""}" data-favorite="${animation.id}" aria-label="${active ? "Remove" : "Add"} ${animation.name} ${active ? "from" : "to"} favorites" aria-pressed="${active}">${icon("favorites", large ? 21 : 17)}</button>`;
}

function card(animation, featured = false) {
  return `<article class="animation-card ${featured ? "animation-card-featured" : ""}">
    <button class="art-button" data-preview="${animation.id}" aria-label="Preview ${animation.name}">${art(animation)}<span class="art-play">${icon("play", 17)}</span></button>
    <div class="animation-card-info"><div><span class="eyebrow">${categoryName(animation.category)}</span><h3>${animation.name}</h3></div>${favoriteButton(animation)}</div>
  </article>`;
}

function header() {
  return `<header class="topbar"><button class="brand brand-button" data-route="home" aria-label="ChargeFX home"><img src="/assets/chargefx-mark.svg" alt=""><span>Charge<span>FX</span></span></button><div class="topbar-right"><span class="offline-pill"><i></i> Works offline</span><button class="icon-button" data-route="settings" aria-label="Open settings">${icon("settings")}</button></div></header>`;
}

function navigation() {
  const items = [["home", "Home"], ["discover", "Discover"], ["favorites", "Favorites"], ["settings", "Settings"]];
  return `<nav class="bottom-nav" aria-label="Main navigation">${items.map(([id, label]) => `<button class="nav-item ${state.screen === id ? "active" : ""}" data-route="${id}" ${state.screen === id ? 'aria-current="page"' : ""}>${icon(id, 19)}<span>${label}</span></button>`).join("")}</nav>`;
}

function shell(content) {
  return `${header()}<main class="main-content">${content}</main>${navigation()}<div class="toast-region" aria-live="polite"></div>`;
}

function batteryCard() {
  const battery = state.battery;
  const percent = !state.settings.showPercentage
    ? "Battery"
    : battery.native
    ? battery.available ? `${battery.percentage}%` : "—"
    : "78%";
  const note = battery.native
    ? battery.available ? "Android battery" : "Battery unavailable"
    : "Sample preview data";
  return `<div class="battery-chip"><div class="battery-icon"><i style="width:${battery.native && battery.available ? battery.percentage : battery.native ? 0 : 78}%"></i></div><div><strong>${percent}</strong><small>${note}</small></div></div>`;
}

function categoryStrip(selected = "") {
  return `<div class="category-strip">${categories.map((category) => `<button class="category-chip ${category.tint} ${selected === category.id ? "selected" : ""}" data-category="${category.id}"><span>${category.icon}</span><small>${category.name}</small></button>`).join("")}</div>`;
}

function homeScreen() {
  const featured = getAnimation(state.selectedAnimation) || animations[0];
  const trending = animations.filter((animation) => animation.id !== featured.id).slice(0, 4);
  return `<section class="hero-copy"><div class="eyebrow hero-kicker"><span></span> YOUR PHONE, REIMAGINED</div><h1>Make every charge<br><span>a little more magic.</span></h1><p>A little more magic every time you plug in.</p></section>
    <section class="featured-panel glass-panel"><div class="featured-art">${art(featured, "art-large")}<div class="featured-orbit"></div><span class="preview-tag">VISUAL PREVIEW</span></div>
      <div class="featured-content"><div class="featured-topline"><span class="status-dot"></span> YOUR NEXT CHARGE</div><h2>${featured.name}</h2><p>${featured.description}</p>
        <div class="featured-bottom">${batteryCard()}<div class="charge-state"><span class="charge-icon">${icon("bolt", 15)}</span><span>${chargingLabel()}</span></div></div>
        <div class="featured-actions"><button class="button button-primary" data-preview="${featured.id}">${icon("play", 16)} Preview animation</button><button class="button button-quiet" data-replay="${featured.id}">Replay</button></div>
      </div>
    </section>
    <section class="content-section"><div class="section-heading"><div><span class="eyebrow">FIND YOUR FREQUENCY</span><h2>Explore styles</h2></div><button class="text-button" data-route="discover">See all ${icon("back", 14)}</button></div>${categoryStrip()}</section>
    <section class="content-section"><div class="section-heading"><div><span class="eyebrow">A LITTLE SPARK</span><h2>Trending animations</h2></div><button class="text-button" data-route="discover">Explore all ${icon("back", 14)}</button></div><div class="card-grid">${trending.map((animation) => card(animation)).join("")}</div></section>
    <footer class="signature">ChargeFX <span>·</span> Designed &amp; Developed by Kim Ji-ho.dev</footer>`;
}

function discoverScreen() {
  const query = state.query.trim().toLowerCase();
  const list = animations.filter((animation) => {
    const matchesQuery = !query || animation.name.toLowerCase().includes(query);
    return matchesQuery && (!state.category || animation.category === state.category);
  });
  return `<section class="page-heading"><span class="eyebrow">THE ANIMATION LIBRARY</span><h1>Find your <span>flow.</span></h1><p>Twenty-five little worlds, ready for your next charge.</p></section>
    <label class="search-box">${icon("search")}<input id="animation-search" type="search" placeholder="Search animations" value="${escapeHtml(state.query)}" autocomplete="off"><kbd>⌘ K</kbd></label>
    ${categoryStrip(state.category)}
    <div class="section-heading results-heading"><div><span class="eyebrow">${state.category ? categoryName(state.category).toUpperCase() : "ALL STYLES"}</span><h2>${query ? "Search results" : state.category ? `${categoryName(state.category)} animations` : "All animations"}</h2></div><span class="result-count">${list.length} animations</span></div>
    ${list.length ? `<div class="card-grid">${list.map((animation) => card(animation)).join("")}</div>` : `<div class="empty-state"><div class="empty-orb">${icon("search", 25)}</div><h2>No animations found</h2><p>Try another name or clear your filters to explore the full collection.</p><button class="button button-secondary" data-clear-filters>Clear filters</button></div>`}`;
}

function favoritesScreen() {
  const saved = state.favorites.map(getAnimation).filter(Boolean);
  return `<section class="page-heading"><span class="eyebrow">YOUR PERSONAL COLLECTION</span><h1>Made <span>yours.</span></h1><p>Keep the animations you love close at hand.</p></section>
    ${saved.length ? `<div class="section-heading results-heading"><div><span class="eyebrow">SAVED FOR LATER</span><h2>Your favorites</h2></div><span class="result-count">${saved.length} saved</span></div><div class="card-grid">${saved.map((animation) => card(animation)).join("")}</div>` : `<div class="empty-state"><div class="empty-orb">${icon("favorites", 25)}</div><h2>A little room for wonder</h2><p>Your favorites will live here. Tap the heart on any animation to save it for later.</p><button class="button button-primary" data-route="discover">Explore animations ${icon("back", 15)}</button></div>`}`;
}

const settingsOptions = [
  ["chargingAnimations", "Charging animations", "Enable animation experiences when charging."],
  ["automaticActivation", "Charging notification", "On charger connect, show a notification you tap to open."],
  ["showPercentage", "Show battery percentage", "Include the percentage in the animation preview."],
  ["batteryEffects", "Battery-level effects", "Let the visual intensity respond to battery level."],
  ["fullChargeEffect", "Full-charge moment", "Celebrate when your device reaches 100%."],
  ["soundEffects", "Sound effects", "Optional audio accents. Sound is off by default."],
  ["batteryFriendly", "Battery-friendly mode", "Reduce intensive effects and continuous motion."],
  ["reducedMotion", "Reduced motion", "Use gentler transitions throughout the app."]
];

function settingsScreen() {
  return `<section class="page-heading"><span class="eyebrow">MAKE IT YOURS</span><h1>Quietly <span>configured.</span></h1><p>Your preferences stay on this device.</p></section>
    <div class="settings-layout"><section class="settings-card glass-panel"><div class="settings-card-heading"><span class="eyebrow">YOUR EXPERIENCE</span><h2>Animation settings</h2></div>
      <div class="setting-row"><div><strong>Default animation</strong><small>Choose the look for your next charge.</small></div><select id="default-animation">${animations.map((animation) => `<option value="${animation.id}" ${animation.id === state.selectedAnimation ? "selected" : ""}>${animation.name}</option>`).join("")}</select></div>
      ${settingsOptions.map(([key, label, description]) => {
        const androidOnly = key === "automaticActivation" && !Capacitor.isNativePlatform();
        const helper = androidOnly ? "Available in the installed Android app; not active in this browser." : description;
        return `<label class="setting-row"><span><strong>${label}</strong><small>${helper}</small></span><input class="switch-input" type="checkbox" data-setting="${key}" ${state.settings[key] ? "checked" : ""} ${androidOnly ? "disabled" : ""} aria-label="${label}"></label>`;
      }).join("")}
      <div class="setting-row"><div><strong>Animation speed</strong><small>Set the pace of visual previews.</small></div><select data-setting-select="animationSpeed"><option value="slow" ${state.settings.animationSpeed === "slow" ? "selected" : ""}>Gentle</option><option value="normal" ${state.settings.animationSpeed === "normal" ? "selected" : ""}>Balanced</option><option value="fast" ${state.settings.animationSpeed === "fast" ? "selected" : ""}>Expressive</option></select></div>
    </section>
    <aside class="about-card glass-panel"><img src="/assets/chargefx-mark.svg" alt="" width="46" height="46"><span class="eyebrow">A NOTE FROM THE MAKER</span><h2>ChargeFX</h2><p>Make Every Charge a Moment.</p><div class="about-divider"></div><small>Designed &amp; Developed by<br><strong>Kim Ji-ho.dev</strong></small><p class="privacy-note">Battery readings are used only to show your charge status. Preferences are kept on-device. Notifications are optional and require your permission. No account or analytics are used.</p><button class="text-button" data-route="about">About &amp; privacy ${icon("back", 14)}</button></aside></div>
    <footer class="signature">ChargeFX <span>·</span> Version 0.1.0 · Visual prototype</footer>`;
}

function aboutScreen() {
  return `<button class="back-link" data-route="settings">${icon("back", 17)} Settings</button><section class="about-page glass-panel"><img src="/assets/chargefx-mark.svg" width="64" height="64" alt="ChargeFX glass sphere logo"><span class="eyebrow">A CHARGING MOMENT, REIMAGINED</span><h1>ChargeFX</h1><p class="about-tagline">Make Every Charge a Moment.</p><p>Designed &amp; Developed by <strong>Kim Ji-ho.dev</strong></p><div class="about-divider"></div><h2>Privacy, simply</h2><p>ChargeFX stores your favorites and preferences locally in your browser. This visual prototype does not request battery or notification permissions, collect personal information, or make network requests for app features.</p><p>Battery values in this prototype are illustrative and are not live device readings. Native Android battery access and charging activation are not included in this milestone.</p></section>`;
}

function previewScreen() {
  const animation = getAnimation(state.previewId);
  if (!animation) return discoverScreen();
  const battery = state.battery;
  const previewPercentage = battery.native
    ? battery.available ? `${battery.percentage}%` : "—"
    : state.settings.showPercentage ? "78%" : "Charging";
  const previewStatus = battery.native
    ? battery.available ? chargingLabel() : "Battery status unavailable"
    : "Sample display · not live battery data";
  return `<button class="back-link" data-back>${icon("back", 17)} Back to ${state.previousScreen === "home" ? "Home" : state.previousScreen === "favorites" ? "Favorites" : "Discover"}</button>
    <section class="preview-layout"><div class="preview-stage glass-panel"><div class="preview-stage-top"><span class="live-preview"><i></i> VISUAL PREVIEW</span>${favoriteButton(animation, true)}</div>${art(animation, "art-preview")}<div class="preview-readout"><strong>${state.settings.showPercentage ? previewPercentage : "Charging"}</strong><span>${previewStatus}</span></div><div class="preview-stage-caption"><span class="status-dot"></span> Charging experience preview</div></div>
      <div class="preview-details"><span class="eyebrow">${categoryName(animation.category).toUpperCase()} · ANIMATION PREVIEW</span><h1>${animation.name}</h1><p>${animation.description}</p><div class="preview-meta"><span>Designed for a calm, immersive charge</span><span class="meta-dot"></span><span>Sound ${state.settings.soundEffects ? "enabled" : "off"}</span></div>
        <button class="button button-primary button-wide" data-apply="${animation.id}">${icon("bolt", 17)} Apply animation</button><button class="button button-secondary button-wide" data-start-charging="${animation.id}">${icon("play", 16)} Open charging experience</button><button class="button button-secondary button-wide" data-replay="${animation.id}">${icon("play", 16)} Replay preview</button><p class="compatibility-note">Automatic activation uses a notification you tap; Android does not allow this app to force an activity over other apps or the lock screen.</p></div></section>`;
}

function chargingScreen() {
  const animation = getAnimation(state.selectedAnimation) || animations[0];
  const battery = state.battery;
  const percentage = battery.native
    ? battery.available ? battery.percentage : null
    : 78;
  const status = battery.native
    ? battery.available ? chargingLabel() : "Battery status unavailable"
    : "Sample display · not live battery data";
  return `<section class="charging-experience">${art(animation, "art-charging")}<button class="close-charging" data-route="home" aria-label="Close charging preview">${icon("close")}</button><span class="eyebrow">${battery.native ? "CHARGING EXPERIENCE" : "CHARGING EXPERIENCE · PREVIEW"}</span><h1>${animation.name}</h1><div class="charging-percentage">${state.settings.showPercentage && percentage !== null ? percentage : ""}<span>${state.settings.showPercentage && percentage !== null ? "%" : status}</span></div><p><span class="status-dot"></span> ${status}</p><button class="button button-secondary" data-route="home">Close experience</button></section>`;
}

function chargingLabel() {
  if (!state.battery.native) return "Preview status";
  if (!state.battery.available || state.battery.charging === null) return "Charging status unavailable";
  if (state.battery.full) return "Fully charged";
  return state.battery.charging ? "Charging" : "Not charging";
}

function introScreen() {
  return `<section class="intro-screen"><div class="intro-glow"></div><div class="intro-content"><img src="/assets/chargefx-mark.svg" alt="" class="intro-mark"><span class="eyebrow">A LITTLE MAGIC, IN EVERY CHARGE</span><h1>Charge<span>FX</span></h1><p>Make Every Charge a Moment.</p><small>Designed &amp; Developed by Kim Ji-ho.dev</small></div><button class="intro-skip" data-finish-intro>Skip intro</button></section><div class="toast-region" aria-live="polite"></div>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function render() {
  document.body.classList.toggle("reduced-motion", Boolean(state.settings.reducedMotion || state.settings.batteryFriendly));
  const level = state.battery.percentage;
  document.body.classList.toggle("battery-low", Boolean(state.settings.batteryEffects && state.battery.native && level !== null && level <= 20));
  document.body.classList.toggle("battery-high", Boolean(state.settings.batteryEffects && state.battery.native && level !== null && level >= 80));
  document.body.classList.toggle("battery-full", Boolean(state.settings.fullChargeEffect && state.battery.native && state.battery.full));
  if (state.screen === "intro") {
    app.innerHTML = `<div class="app-shell intro-shell">${introScreen()}</div>`;
    window.clearTimeout(introTimer);
    const reduceMotion = state.settings.reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    introTimer = window.setTimeout(finishIntro, reduceMotion ? 120 : state.introSeen ? 650 : 2200);
    return;
  }
  if (state.screen === "preview") {
    app.innerHTML = `<div class="app-shell">${header()}<main class="main-content preview-main">${previewScreen()}</main><div class="toast-region" aria-live="polite"></div></div>`;
    return;
  }
  if (state.screen === "charging") {
    app.innerHTML = `<div class="charging-shell">${chargingScreen()}<div class="toast-region" aria-live="polite"></div></div>`;
    return;
  }
  const content = state.screen === "home" ? homeScreen()
    : state.screen === "discover" ? discoverScreen()
    : state.screen === "favorites" ? favoritesScreen()
    : state.screen === "about" ? aboutScreen()
    : settingsScreen();
  app.innerHTML = `<div class="app-shell">${shell(content)}</div>`;
}

let introTimer;
function finishIntro() {
  if (state.screen !== "intro") return;
  state.introSeen = true;
  state.screen = "home";
  persist();
  render();
}

function persist() {
  try {
    saveState(state);
  } catch (error) {
    notify(error.message);
    return;
  }
  if (Capacitor.isNativePlatform()) syncNativePreferences();
}

async function syncNativePreferences() {
  try {
    await nativeBattery.setPreferences({
      chargingAnimations: state.settings.chargingAnimations,
      automaticActivation: state.settings.automaticActivation,
      selectedAnimation: state.selectedAnimation
    });
  } catch (error) {
    console.error("ChargeFX could not update Android charging preferences.", error);
    notify("Android charging preferences could not be updated.");
  }
}

function updateBatteryStatus(status) {
  state.battery = {
    native: true,
    available: Boolean(status.available && Number.isFinite(status.percentage)),
    percentage: Number.isFinite(status.percentage) ? status.percentage : null,
    charging: typeof status.charging === "boolean" ? status.charging : null,
    full: Boolean(status.full)
  };
  if (["home", "preview", "charging"].includes(state.screen)) render();
}

async function openNotificationChargingExperience() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const launch = await nativeBattery.getLaunchRequest();
    if (launch.openCharging) {
      state.screen = "charging";
      render();
    }
  } catch (error) {
    console.error("ChargeFX could not read the Android notification launch request.", error);
    notify("The charging experience could not be opened from the notification.");
  }
}

function handleChargingRequest() {
  if (state.screen === "charging") return;
  state.screen = "charging";
  render();
}

async function initializeAndroidBridge() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (state.screen === "intro") {
        finishIntro();
      } else if (state.screen === "preview") {
        state.screen = state.previousScreen || "discover";
        render();
      } else if (state.screen === "charging") {
        state.screen = "home";
        render();
      } else if (state.screen !== "home") {
        state.screen = "home";
        render();
      } else if (!canGoBack) {
        CapacitorApp.exitApp();
      }
    });
    await nativeBattery.addListener("batteryStatus", updateBatteryStatus);
    await nativeBattery.addListener("chargingRequested", handleChargingRequest);
    const status = await nativeBattery.getStatus();
    updateBatteryStatus(status);
    await syncNativePreferences();
    await openNotificationChargingExperience();
  } catch (error) {
    console.error("ChargeFX Android integration could not be initialized.", error);
    notify("Android battery status is temporarily unavailable.");
  }
}

let toastTimer;
function notify(message) {
  const region = document.querySelector(".toast-region");
  if (!region) return;
  region.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { region.innerHTML = ""; }, 2600);
}

function openPreview(id) {
  if (!getAnimation(id)) return;
  state.previousScreen = state.screen;
  state.previewId = id;
  state.screen = "preview";
  render();
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.hasAttribute("data-finish-intro")) {
    window.clearTimeout(introTimer);
    finishIntro();
  } else if (target.dataset.route) {
    state.screen = target.dataset.route;
    state.category = "";
    render();
  } else if (target.dataset.favorite) {
    const id = target.dataset.favorite;
    state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
    persist();
    render();
  } else if (target.dataset.preview) {
    openPreview(target.dataset.preview);
  } else if (target.dataset.category) {
    state.category = state.category === target.dataset.category ? "" : target.dataset.category;
    state.query = "";
    state.screen = "discover";
    render();
  } else if (target.hasAttribute("data-back")) {
    state.screen = state.previousScreen || "discover";
    render();
  } else if (target.dataset.apply) {
    state.selectedAnimation = target.dataset.apply;
    persist();
    state.screen = "home";
    render();
    notify(`${getAnimation(state.selectedAnimation).name} is your default animation.`);
  } else if (target.dataset.startCharging) {
    state.selectedAnimation = target.dataset.startCharging;
    persist();
    state.screen = "charging";
    render();
  } else if (target.dataset.replay) {
    const artElement = document.querySelector(".art");
    if (artElement) {
      artElement.classList.remove("replay");
      void artElement.offsetWidth;
      artElement.classList.add("replay");
    }
  } else if (target.hasAttribute("data-clear-filters")) {
    state.category = "";
    state.query = "";
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "animation-search") {
    const cursor = event.target.selectionStart;
    state.query = event.target.value;
    render();
    const input = document.querySelector("#animation-search");
    input?.focus();
    input?.setSelectionRange(cursor, cursor);
  }
  if (event.target.matches("[data-setting]")) {
    state.settings[event.target.dataset.setting] = event.target.checked;
    persist();
    document.body.classList.toggle("reduced-motion", Boolean(state.settings.reducedMotion || state.settings.batteryFriendly));
    if (event.target.dataset.setting === "automaticActivation" && event.target.checked && Capacitor.isNativePlatform()) {
      nativeBattery.requestNotifications().then((result) => {
        if (!result.granted) {
          state.settings.automaticActivation = false;
          persist();
          render();
          notify("Allow notifications in Android settings to use charger alerts.");
          return;
        }
        notify("Charger notifications are enabled. Tap the notification to open ChargeFX.");
      }).catch((error) => {
        console.error("ChargeFX notification permission request failed.", error);
        state.settings.automaticActivation = false;
        persist();
        render();
        notify("Android notification permission could not be requested.");
      });
    }
  }
});

app.addEventListener("change", (event) => {
  if (event.target.id === "default-animation") {
    state.selectedAnimation = event.target.value;
    persist();
    notify("Your default animation has been updated.");
  }
  if (event.target.matches("[data-setting-select]")) {
    state.settings[event.target.dataset.settingSelect] = event.target.value;
    persist();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    state.screen = "discover";
    render();
    document.querySelector("#animation-search")?.focus();
  }
  if (event.key === "Escape" && state.screen === "preview") {
    state.screen = state.previousScreen || "discover";
    render();
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "chargefx.preferences.v1") {
    Object.assign(state, loadState());
    render();
  }
});

render();
initializeAndroidBridge();
document.addEventListener("visibilitychange", openNotificationChargingExperience);
window.addEventListener("focus", openNotificationChargingExperience);
