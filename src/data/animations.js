export const categories = [
  { id: "energy", name: "Energy", icon: "✦", tint: "blue" },
  { id: "galaxy", name: "Galaxy", icon: "◉", tint: "violet" },
  { id: "creatures", name: "Creatures", icon: "✿", tint: "pink" },
  { id: "gaming", name: "Gaming", icon: "⌘", tint: "cyan" },
  { id: "aesthetic", name: "Aesthetic", icon: "❋", tint: "gold" }
];

const entries = [
  ["liquid-pulse", "Liquid Pulse", "energy", "A living glass core, charged with a quiet kind of magic.", "orb"],
  ["electric-storm", "Electric Storm", "energy", "A bright current dancing through midnight.", "storm"],
  ["plasma-core", "Plasma Core", "energy", "A contained star with a heartbeat of its own.", "plasma"],
  ["neon-surge", "Neon Surge", "energy", "A vivid neon wave surging into life.", "surge"],
  ["firestorm", "Firestorm", "energy", "Warm embers orbit a brilliant solar heart.", "fire"],
  ["cosmic-flow", "Cosmic Flow", "galaxy", "A miniature universe caught in a graceful orbit.", "planet"],
  ["saturns-orbit", "Saturn’s Orbit", "galaxy", "A luminous ring turning through the deep.", "saturn"],
  ["black-hole", "Black Hole", "galaxy", "A mysterious gravitational glow at the edge of light.", "hole"],
  ["shooting-stars", "Shooting Stars", "galaxy", "Little streaks of light across a velvet sky.", "stars"],
  ["galaxy-portal", "Galaxy Portal", "galaxy", "A doorway opening into distant colour.", "portal"],
  ["sleepy-cat", "Sleepy Cat", "creatures", "A tiny dreamer drifting among soft stars.", "cat"],
  ["panda-dreams", "Panda Dreams", "creatures", "A peaceful little world in black and white.", "panda"],
  ["neon-dragon", "Neon Dragon", "creatures", "A mythical glow with a playful spark.", "dragon"],
  ["cyber-fox", "Cyber Fox", "creatures", "A curious spirit lit up in electric colour.", "fox"],
  ["floating-butterflies", "Floating Butterflies", "creatures", "Delicate light taking flight in slow motion.", "butterfly"],
  ["cyber-hud", "Cyber HUD", "gaming", "A crisp holographic interface powering up.", "hud"],
  ["matrix-rain", "Matrix Rain", "gaming", "A cascade of luminous digital fragments.", "matrix"],
  ["digital-reactor", "Digital Reactor", "gaming", "Precision-engineered light at the centre.", "reactor"],
  ["neon-respawn", "Neon Respawn", "gaming", "A fresh start in a vivid neon world.", "respawn"],
  ["holographic-core", "Holographic Core", "gaming", "An iridescent reactor, rendered in light.", "holo"],
  ["liquid-chrome", "Liquid Chrome", "aesthetic", "Mirror-bright curves with a liquid finish.", "chrome"],
  ["crystal-bloom", "Crystal Bloom", "aesthetic", "A faceted flower opening in soft light.", "crystal"],
  ["golden-particles", "Golden Particles", "aesthetic", "A constellation of warm, floating gold.", "gold"],
  ["floating-glass", "Floating Glass", "aesthetic", "Weightless glass forms in a quiet dance.", "glass"],
  ["aurora-waves", "Aurora Waves", "aesthetic", "Silky ribbons of colour across the night.", "aurora"]
];

export const animations = entries.map(([id, name, category, description, visual], index) => ({
  id, name, category, description, visual, featured: index < 5
}));

export function getAnimation(id) {
  return animations.find((animation) => animation.id === id);
}

export function getCategory(id) {
  return categories.find((category) => category.id === id);
}
