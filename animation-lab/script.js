export const concepts = [
  {
    name: "Liquid Pulse",
    category: "energy",
    description: "A luminous fluid core swells and ripples from within.",
    scene: `<circle class="liquid-halo" cx="80" cy="80" r="40"/><path class="liquid-orb" d="M80 39c-16 0-29 14-29 31 0 17 13 31 29 31s29-14 29-31c0-17-13-31-29-31Z"/><path class="liquid-shine" d="M65 57c3-7 9-11 16-11"/><path class="liquid-wave" d="M56 83c8-9 15 9 24 0s15 8 24-1"/>`,
  },
  {
    name: "Electric Storm",
    category: "energy",
    description: "Forked electric arcs flash between charged points.",
    scene: `<circle class="storm-core" cx="80" cy="80" r="22"/><path class="storm-bolt bolt-a" d="m83 37-19 32h15l-8 34 26-43H82l11-23Z"/><path class="storm-arc arc-a" d="m42 51 12 8-7 9"/><path class="storm-arc arc-b" d="m114 101-12-8 7-9"/><circle class="storm-spark spark-a" cx="43" cy="101" r="3"/><circle class="storm-spark spark-b" cx="117" cy="53" r="2"/>`,
  },
  {
    name: "Plasma Core",
    category: "energy",
    description: "A hot star spins inside a magnetic field.",
    scene: `<circle class="plasma-aura" cx="80" cy="80" r="36"/><circle class="plasma-sun" cx="80" cy="80" r="19"/><path class="plasma-flare flare-a" d="M80 34c8 13 8 18 0 24-8-6-8-11 0-24Z"/><path class="plasma-flare flare-b" d="M80 126c-8-13-8-18 0-24 8 6 8 11 0 24Z"/><ellipse class="plasma-field" cx="80" cy="80" rx="51" ry="22"/>`,
  },
  {
    name: "Neon Surge",
    category: "energy",
    description: "Bright current lines sweep across a dark field.",
    scene: `<path class="surge-wave wave-a" d="M16 59c17-28 32 28 49 0s32 28 49 0"/><path class="surge-wave wave-b" d="M16 79c17-28 32 28 49 0s32 28 49 0"/><path class="surge-wave wave-c" d="M16 99c17-28 32 28 49 0s32 28 49 0"/><circle class="surge-node" cx="80" cy="80" r="5"/>`,
  },
  {
    name: "Firestorm",
    category: "energy",
    description: "Stylized flames flicker around a warm ember.",
    scene: `<circle class="fire-glow" cx="80" cy="89" r="28"/><path class="flame flame-back" d="M80 33c5 20 24 25 19 47-2 13-10 22-19 22S62 91 61 80c-2-16 12-22 19-47Z"/><path class="flame flame-front" d="M81 65c2 11 12 14 9 26-1 7-5 12-10 12s-10-6-10-12c0-9 7-13 11-26Z"/><circle class="fire-ember ember-a" cx="49" cy="69" r="2"/><circle class="fire-ember ember-b" cx="108" cy="79" r="2"/><circle class="fire-ember ember-c" cx="62" cy="43" r="1.5"/>`,
  },
  {
    name: "Cosmic Flow",
    category: "galaxy",
    description: "A small planet follows a glowing orbital path.",
    scene: `<circle class="cosmos-sun" cx="80" cy="80" r="19"/><ellipse class="cosmos-orbit" cx="80" cy="80" rx="49" ry="22"/><circle class="cosmos-planet" cx="121" cy="63" r="8"/><circle class="cosmos-star star-a" cx="36" cy="47" r="2"/><circle class="cosmos-star star-b" cx="119" cy="111" r="2"/>`,
  },
  {
    name: "Saturn's Orbit",
    category: "galaxy",
    description: "A banded gas giant rolls inside a turning ring.",
    scene: `<circle class="saturn-body" cx="80" cy="80" r="24"/><path class="saturn-band band-a" d="M58 72c14 8 30 8 44 0"/><path class="saturn-band band-b" d="M57 84c15 6 31 6 46 0"/><ellipse class="saturn-ring" cx="80" cy="80" rx="49" ry="17"/><ellipse class="saturn-ring ring-front" cx="80" cy="80" rx="49" ry="17"/>`,
  },
  {
    name: "Black Hole",
    category: "galaxy",
    description: "An accretion disk spirals toward a dark center.",
    scene: `<ellipse class="black-disk disk-a" cx="80" cy="80" rx="54" ry="20"/><ellipse class="black-disk disk-b" cx="80" cy="80" rx="38" ry="14"/><circle class="black-shadow" cx="80" cy="80" r="19"/><circle class="black-lens" cx="80" cy="80" r="23"/><circle class="cosmos-star star-a" cx="35" cy="50" r="2"/>`,
  },
  {
    name: "Shooting Stars",
    category: "galaxy",
    description: "Meteor streaks cross the sky one after another.",
    scene: `<circle class="cosmos-star star-a" cx="34" cy="39" r="2"/><circle class="cosmos-star star-b" cx="101" cy="37" r="1.5"/><circle class="cosmos-star star-c" cx="62" cy="105" r="2"/><path class="meteor meteor-a" d="M23 76h31"/><circle class="meteor-head head-a" cx="54" cy="76" r="3"/><path class="meteor meteor-b" d="M81 56h30"/><circle class="meteor-head head-b" cx="111" cy="56" r="2.5"/><path class="meteor meteor-c" d="M71 119h21"/><circle class="meteor-head head-c" cx="92" cy="119" r="2"/>`,
  },
  {
    name: "Galaxy Portal",
    category: "galaxy",
    description: "Nested light gates open and close in sequence.",
    scene: `<ellipse class="portal-ring ring-a" cx="80" cy="80" rx="38" ry="48"/><ellipse class="portal-ring ring-b" cx="80" cy="80" rx="28" ry="38"/><ellipse class="portal-ring ring-c" cx="80" cy="80" rx="18" ry="28"/><circle class="portal-core" cx="80" cy="80" r="12"/><circle class="portal-star star-a" cx="39" cy="53" r="2"/><circle class="portal-star star-b" cx="120" cy="102" r="2"/>`,
  },
  {
    name: "Sleepy Cat",
    category: "creatures",
    description: "A little cat blinks, breathes, and curls its tail.",
    scene: `<path class="cat-tail" d="M103 91c25 9 14 31 1 20"/><path class="cat-body" d="M51 91c3-17 13-25 29-25s29 10 29 27c0 13-12 20-30 20-18 0-30-8-28-22Z"/><path class="cat-ear" d="m53 64 2-25 22 17m5 0 23-17 1 26"/><circle class="cat-face" cx="80" cy="68" r="27"/><path class="cat-eye eye-left" d="M66 68q5 6 10 0"/><path class="cat-eye eye-right" d="M85 68q5 6 10 0"/><path class="cat-nose" d="m77 75 3 2 3-2"/><path class="cat-whisker" d="M48 72 65 75m-16 5 16-1m32-4 17-3m-17 7 16 2"/>`,
  },
  {
    name: "Panda Dreams",
    category: "creatures",
    description: "A gentle panda sways and gives a sleepy blink.",
    scene: `<ellipse class="panda-body" cx="80" cy="92" rx="30" ry="28"/><circle class="panda-ear" cx="58" cy="48" r="12"/><circle class="panda-ear" cx="102" cy="48" r="12"/><circle class="panda-face" cx="80" cy="68" r="30"/><ellipse class="panda-patch patch-a" cx="68" cy="67" rx="7" ry="10"/><ellipse class="panda-patch patch-b" cx="92" cy="67" rx="7" ry="10"/><circle class="panda-eye" cx="68" cy="67" r="2.5"/><circle class="panda-eye" cx="92" cy="67" r="2.5"/><ellipse class="panda-nose" cx="80" cy="79" rx="5" ry="3"/>`,
  },
  {
    name: "Neon Dragon",
    category: "creatures",
    description: "A friendly dragon flaps its wings and breathes sparks.",
    scene: `<path class="dragon-wing wing-left" d="M69 75 39 47l8 34-17 4 34 9Z"/><path class="dragon-wing wing-right" d="m91 75 30-28-8 34 17 4-34 9Z"/><path class="dragon-tail" d="M92 96c20 8 22 21 9 24"/><ellipse class="dragon-body" cx="80" cy="89" rx="20" ry="24"/><path class="dragon-head" d="M59 57 53 39l20 11q8-3 16 0l19-11-5 20q7 8 2 17-7 10-26 10T57 76q-5-10 2-19Z"/><circle class="dragon-eye" cx="69" cy="65" r="2.5"/><circle class="dragon-eye" cx="93" cy="65" r="2.5"/><path class="dragon-spark" d="m112 72 5-3-2 6 6 2-7 1-3 6-1-7-5-2 6-1Z"/>`,
  },
  {
    name: "Cyber Fox",
    category: "creatures",
    description: "A curious fox bobs its ears and swishes its tail.",
    scene: `<path class="fox-tail" d="M94 93c16-4 24 8 19 19-8 5-16-1-19-10Z"/><path class="fox-body" d="M55 94c0-16 11-26 25-26s25 10 25 26c0 13-10 20-25 20s-25-7-25-20Z"/><path class="fox-ear ear-left" d="m54 66 1-29 21 22Z"/><path class="fox-ear ear-right" d="m84 59 22-22 1 30Z"/><path class="fox-face" d="M55 58q25-17 50 0l-3 26q-4 15-22 19-18-4-22-19Z"/><path class="fox-muzzle" d="m65 79 15 7 15-7q-3 17-15 17T65 79Z"/><circle class="fox-eye" cx="69" cy="73" r="2"/><circle class="fox-eye" cx="91" cy="73" r="2"/><circle class="fox-nose" cx="80" cy="87" r="2"/>`,
  },
  {
    name: "Floating Butterflies",
    category: "creatures",
    description: "Two tiny butterflies flutter on a drifting path.",
    scene: `<path class="butterfly-path path-a" d="M28 105c28-50 47-33 54-21s-14 39-39 17 6-45 40-22"/><g class="butterfly butterfly-a"><ellipse class="wing wing-top" cx="53" cy="61" rx="10" ry="15"/><ellipse class="wing wing-bottom" cx="53" cy="79" rx="8" ry="11"/><path class="wing-vein" d="M53 58v27m0-15-8-7m8 16 7-7"/><path class="butterfly-body" d="M53 58v29m0-23-5-6m5 6 5-6"/></g><g class="butterfly butterfly-b"><ellipse class="wing wing-top" cx="99" cy="81" rx="8" ry="12"/><ellipse class="wing wing-bottom" cx="99" cy="95" rx="6" ry="9"/><path class="butterfly-body" d="M99 80v23"/></g>`,
  },
  {
    name: "Cyber HUD",
    category: "gaming",
    description: "A targeting reticle scans and locks onto a core.",
    scene: `<circle class="hud-ring ring-outer" cx="80" cy="80" r="43"/><circle class="hud-ring ring-inner" cx="80" cy="80" r="28"/><path class="hud-tick" d="M80 27v13m0 80v13M27 80h13m80 0h13M43 43l9 9m56 56 9 9m0-74-9 9M52 108l-9 9"/><path class="hud-scan" d="M80 80 80 39a41 41 0 0 1 29 12Z"/><circle class="hud-core" cx="80" cy="80" r="8"/><path class="hud-bracket" d="M58 62h-8v-8m44 0v8h8m0 36h-8v8m-36 0v-8h-8"/>`,
  },
  {
    name: "Matrix Rain",
    category: "gaming",
    description: "Digital glyphs stream down in staggered columns.",
    scene: `<text class="matrix-column col-a" x="28" y="25">1<tspan x="28" dy="15">0</tspan><tspan x="28" dy="15">1</tspan><tspan x="28" dy="15">0</tspan><tspan x="28" dy="15">1</tspan><tspan x="28" dy="15">0</tspan></text><text class="matrix-column col-b" x="55" y="18">0<tspan x="55" dy="15">1</tspan><tspan x="55" dy="15">1</tspan><tspan x="55" dy="15">0</tspan><tspan x="55" dy="15">0</tspan><tspan x="55" dy="15">1</tspan></text><text class="matrix-column col-c" x="84" y="31">1<tspan x="84" dy="15">1</tspan><tspan x="84" dy="15">0</tspan><tspan x="84" dy="15">1</tspan><tspan x="84" dy="15">0</tspan><tspan x="84" dy="15">0</tspan></text><text class="matrix-column col-d" x="111" y="14">0<tspan x="111" dy="15">1</tspan><tspan x="111" dy="15">0</tspan><tspan x="111" dy="15">0</tspan><tspan x="111" dy="15">1</tspan><tspan x="111" dy="15">1</tspan></text>`,
  },
  {
    name: "Digital Reactor",
    category: "gaming",
    description: "Interlocking reactor rings turn around a live center.",
    scene: `<circle class="reactor-core" cx="80" cy="80" r="13"/><circle class="reactor-ring ring-a" cx="80" cy="80" r="27"/><circle class="reactor-ring ring-b" cx="80" cy="80" r="40"/><path class="reactor-tooth tooth-a" d="M76 33h8v10h-8zm0 84h8v10h-8zM33 76h10v8H33zm84 0h10v8h-10z"/><path class="reactor-link" d="M54 54 44 44m62 62-10-10m0-42 10-10m-62 62 10-10"/>`,
  },
  {
    name: "Neon Respawn",
    category: "gaming",
    description: "A pixel heart re-forms inside a healing ring.",
    scene: `<path class="respawn-heart" d="M80 104 48 76q-10-18 7-27 15-5 25 10 10-15 25-10 17 9 7 27Z"/><circle class="respawn-ring ring-a" cx="80" cy="80" r="47"/><circle class="respawn-ring ring-b" cx="80" cy="80" r="36"/><path class="respawn-plus" d="M80 66v28m-14-14h28"/><path class="respawn-pixel pixel-a" d="M36 89h8v8h-8z"/><path class="respawn-pixel pixel-b" d="M116 55h7v7h-7z"/>`,
  },
  {
    name: "Holographic Core",
    category: "gaming",
    description: "A faceted hologram rotates through shifting colors.",
    scene: `<path class="holo-shape" d="m80 35 34 20v42l-34 20-34-20V55Z"/><path class="holo-facet facet-a" d="m80 35 0 82m0-82-34 20m34-20 34 20M46 55l68 42m0-42-68 42"/><path class="holo-scan" d="M48 67h64M48 83h64M48 99h64"/><circle class="holo-dot" cx="80" cy="80" r="5"/>`,
  },
  {
    name: "Liquid Chrome",
    category: "aesthetic",
    description: "Mirror-bright liquid folds reshape in slow motion.",
    scene: `<path class="chrome-blob" d="M48 83c-9-12 4-30 18-25 8-17 32-12 35 2 16 1 21 19 9 28 5 16-13 27-25 17-12 14-33 5-32-10-12 2-18-6-5-12Z"/><path class="chrome-glint glint-a" d="M59 69q9-12 19-7"/><path class="chrome-glint glint-b" d="M89 101q12-3 15-14"/>`,
  },
  {
    name: "Crystal Bloom",
    category: "aesthetic",
    description: "Faceted petals unfurl one by one around a crystal.",
    scene: `<path class="crystal-petal petal-a" d="M80 78Q48 59 65 40q17 9 15 38Z"/><path class="crystal-petal petal-b" d="M82 78q19-32 38-15-9 17-38 17Z"/><path class="crystal-petal petal-c" d="M82 82q32-19 15 19-17-9-17-19Z"/><path class="crystal-petal petal-d" d="M78 82q-19 32-38 15 9-17 38-17Z"/><path class="crystal-petal petal-e" d="M78 78Q59 46 40 63q9 17 38 17Z"/><path class="crystal-center" d="m80 68 12 12-12 12-12-12Z"/>`,
  },
  {
    name: "Golden Particles",
    category: "aesthetic",
    description: "Warm gold specks rise, twinkle, and drift away.",
    scene: `<circle class="gold-speck speck-a" cx="46" cy="103" r="3"/><circle class="gold-speck speck-b" cx="69" cy="110" r="2"/><circle class="gold-speck speck-c" cx="92" cy="105" r="3"/><circle class="gold-speck speck-d" cx="111" cy="94" r="2"/><circle class="gold-speck speck-e" cx="57" cy="78" r="2"/><circle class="gold-speck speck-f" cx="100" cy="69" r="2"/><path class="gold-star star-a" d="m80 35 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/>`,
  },
  {
    name: "Floating Glass",
    category: "aesthetic",
    description: "Transparent glass forms glide past one another.",
    scene: `<path class="glass-form form-a" d="m51 52 21-12 21 12v25L72 89 51 77Z"/><path class="glass-form form-b" d="m76 80 18-11 18 11v22l-18 11-18-11Z"/><path class="glass-edge edge-a" d="m51 52 21 13 21-13M72 65v24m22-9 18-11"/><circle class="glass-bubble bubble-a" cx="42" cy="101" r="4"/><circle class="glass-bubble bubble-b" cx="115" cy="47" r="3"/>`,
  },
  {
    name: "Aurora Waves",
    category: "aesthetic",
    description: "Silky ribbons of northern light flow across the sky.",
    scene: `<path class="aurora-ribbon ribbon-a" d="M20 99c19-39 32-41 47-7s28 31 45-8"/><path class="aurora-ribbon ribbon-b" d="M17 78c20-31 34-33 49-5s27 27 48-9"/><path class="aurora-ribbon ribbon-c" d="M29 115c18-28 31-29 44-5s23 20 39-7"/><circle class="aurora-star star-a" cx="38" cy="48" r="1.5"/><circle class="aurora-star star-b" cx="107" cy="48" r="2"/>`,
  },
];

if (document.querySelector(".gallery")) {
const labels = {
  energy: "Energy",
  galaxy: "Galaxy",
  creatures: "Animals & Creatures",
  gaming: "Gaming",
  aesthetic: "Aesthetic",
};

const gallery = document.querySelector(".gallery");
const filters = [...document.querySelectorAll("[data-filter]")];
const motionToggle = document.querySelector(".motion-toggle");
const demo = document.querySelector(".demo-phone");
const connectButton = document.querySelector(".demo-connect");
const startNowButton = document.querySelector(".demo-now");
const showButton = document.querySelector(".demo-show");
const disconnectButton = document.querySelector(".demo-disconnect");
const demoStatus = document.querySelector(".demo-status");
const demoScreen = document.querySelector(".demo-screen");
const demoPercent = document.querySelector(".demo-percent");
let activeFilter = "all";
let isPaused = false;
let demoState = "disconnected";
let demoPercentage = 64;
let entranceTimer;
let percentageTimer;

function render() {
  const visible = concepts.filter(
    (concept) => activeFilter === "all" || concept.category === activeFilter,
  );

  gallery.innerHTML = visible
    .map(
      (concept) => `
        <article class="concept-card" data-concept="${concept.name}">
          <div class="scene scene-${concept.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}" role="img" aria-label="Animated code-drawn preview: ${concept.name}">
            <svg viewBox="0 0 160 160" aria-hidden="true">${concept.scene}</svg>
            <span class="live-indicator"><i></i> LIVE</span>
          </div>
          <div class="concept-info">
            <span class="category-label">${labels[concept.category]}</span>
            <h2>${concept.name}</h2>
            <p>${concept.description}</p>
          </div>
        </article>`,
    )
    .join("");
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((item) => {
      const selected = item === filter;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    render();
  });
});

motionToggle.addEventListener("click", () => {
  isPaused = !isPaused;
  document.body.classList.toggle("motion-paused", isPaused);
  motionToggle.setAttribute("aria-pressed", String(isPaused));
  motionToggle.lastChild.textContent = isPaused ? "Resume motion" : "Pause motion";
  motionToggle.querySelector(".motion-indicator").classList.toggle("is-paused", isPaused);
});

document.querySelector('[data-count="all"]').textContent = concepts.length;
render();

function updateDemo() {
  demo.dataset.state = demoState;
  const demoConnected = demoState !== "disconnected";
  connectButton.hidden = demoConnected;
  startNowButton.hidden = demoState !== "idle";
  showButton.hidden = demoState !== "awake";
  disconnectButton.hidden = !demoConnected;
  demoPercent.innerHTML = `${demoPercentage}<span>%</span>`;

  if (demoState === "disconnected") {
    demoStatus.textContent = "Plug in to begin the screen saver preview.";
  } else if (demoState === "idle") {
    demoStatus.textContent = "Charger connected · the phone is idle. Waiting for the screen saver timeout.";
  } else if (demoState === "dream") {
    demoStatus.textContent = "ChargeFX screen saver is active. Tap the screen to wake the phone.";
  } else if (demoState === "awake") {
    demoStatus.textContent = "The phone woke up · charging continues. Let it idle to see the screen saver again.";
  }
}

function enterDream() {
  if (demoState !== "idle") return;
  window.clearTimeout(entranceTimer);
  demoState = "dream";
  updateDemo();
}

function startIdlePeriod() {
  window.clearTimeout(entranceTimer);
  demoState = "idle";
  updateDemo();
  entranceTimer = window.setTimeout(enterDream, 4000);
}

function startDemo() {
  window.clearTimeout(entranceTimer);
  window.clearInterval(percentageTimer);
  demoPercentage = 64;
  startIdlePeriod();

  percentageTimer = window.setInterval(() => {
    if (demoPercentage < 100) {
      demoPercentage += 1;
      updateDemo();
    }
  }, 5000);
}

function dismissDemo() {
  if (demoState !== "dream") return;
  demoState = "awake";
  updateDemo();
}

function stopDemo() {
  demoState = "disconnected";
  window.clearTimeout(entranceTimer);
  window.clearInterval(percentageTimer);
  updateDemo();
}

connectButton.addEventListener("click", startDemo);
startNowButton.addEventListener("click", enterDream);
showButton.addEventListener("click", startIdlePeriod);
disconnectButton.addEventListener("click", stopDemo);
demoScreen.addEventListener("click", dismissDemo);
demoScreen.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    dismissDemo();
  }
});
}
