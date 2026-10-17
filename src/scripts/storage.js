const KEY = "chargefx.preferences.v1";

const defaults = {
  favorites: [],
  selectedAnimation: "liquid-pulse",
  introSeen: false,
  settings: {
    chargingAnimations: true,
    automaticActivation: false,
    updateNotifications: true,
    showPercentage: true,
    batteryEffects: true,
    fullChargeEffect: true,
    soundEffects: false,
    batteryFriendly: true,
    reducedMotion: false,
    animationSpeed: "normal"
  }
};

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      ...defaults,
      ...stored,
      favorites: Array.isArray(stored.favorites) ? stored.favorites : [],
      settings: { ...defaults.settings, ...(stored.settings || {}) }
    };
  } catch (error) {
    console.error("ChargeFX preferences could not be loaded.", error);
    return structuredClone(defaults);
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      favorites: state.favorites,
      selectedAnimation: state.selectedAnimation,
      introSeen: state.introSeen,
      settings: state.settings
    }));
  } catch (error) {
    console.error("ChargeFX preferences could not be saved.", error);
    throw new Error("Your changes could not be saved on this device.");
  }
}
