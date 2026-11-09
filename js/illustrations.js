/**
 * ReturnHer Illustration Kit (ART)
 * Generated entirely in inline vector SVG code - requires no image files.
 * Adheres strictly to BRIEF.md v2:
 * - 6 skin tones, 4 hair colors, adult and dignified proportions (never childlike).
 * - Cultural motifs: marigold, paisley (kairi), lotus, bangles, rangoli, squiggles, etc.
 * - Strictly NO 4-point sparkle star, robot, or magic wand.
 * - Flat solid fills only; no gradients or drop-shadows.
 * - Overflow visible for lively bleed and card breakout.
 */

window.ART = (function () {
  "use strict";

  // --- Palette from BRIEF.md ---
  const PALETTE = {
    forest: "#0E4B33",
    deepForest: "#0A2F21",
    marigold: "#FFC21A",
    vermilion: "#D2401F",
    vermilionBright: "#E8512E",
    cobalt: "#2B59D9",
    blush: "#F6C1CF",
    rani: "#D6336C",
    cream: "#FFF6E5",
    oat: "#F1E8D8",
    ink: "#2A2622",

    // Skin tones (BRIEF.md)
    skinTones: ["#F3D0B0", "#E0A877", "#C08052", "#94603A", "#6B4228", "#46291A"],

    // Hair tones (BRIEF.md)
    hairTones: {
      black: "#1B1210",
      darkBrown: "#3A2418",
      warmBrown: "#6B3F25",
      grey: "#B9B4AE"
    }
  };

  // Helper to escape attributes
  function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // --- 1. Organic Blobs (ART.blob) ---
  const BLOB_PATHS = [
    // 0: Asymmetric pear / arch blob
    "M70,25 C130,10 190,30 215,80 C240,135 225,200 180,235 C135,270 70,265 35,220 C0,175 10,110 35,65 C50,38 55,28 70,25 Z",
    // 1: Wide smooth pebble
    "M60,40 C110,20 170,25 210,60 C250,95 260,160 230,205 C200,250 140,260 85,245 C30,230 10,175 15,120 C20,70 30,50 60,40 Z",
    // 2: Tall tilted egg
    "M90,20 C145,15 195,45 210,100 C225,160 205,215 160,250 C115,285 55,270 25,220 C-5,170 5,100 35,55 C55,25 70,22 90,20 Z",
    // 3: Soft cloud scalloped
    "M80,35 C130,25 180,40 215,85 C250,130 240,190 205,230 C170,270 105,265 60,240 C15,215 5,160 15,105 C25,55 50,40 80,35 Z",
    // 4: Flowing leaf-shaped blob
    "M40,40 C120,15 220,50 240,130 C260,210 190,260 110,255 C30,250 10,180 15,110 C18,70 25,50 40,40 Z",
    // 5: Rounded arch base blob
    "M40,100 C40,40 100,20 160,20 C220,20 250,55 250,110 C250,180 230,240 160,245 C90,250 40,210 40,100 Z"
  ];

  function blob(colour, seed = 0) {
    const idx = Math.abs(typeof seed === "number" ? seed : seed.length || 0) % BLOB_PATHS.length;
    const pathD = BLOB_PATHS[idx];
    const fill = colour || PALETTE.oat;
    return `<path d="${pathD}" fill="${fill}" />`;
  }

  // --- 2. Decorative Motifs (ART.decor) ---
  function decor(name, opts = {}) {
    const size = opts.size || 48;
    const color = opts.color || PALETTE.marigold;
    const color2 = opts.color2 || PALETTE.vermilion;
    const color3 = opts.color3 || PALETTE.forest;
    const cls = opts.className ? ` class="${esc(opts.className)}"` : "";
    const style = opts.style ? ` style="${esc(opts.style)}"` : "";

    switch (name) {
      case "marigold":
        // 8-petal marigold flower per BRIEF.md
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <ellipse cx="32" cy="14" rx="7" ry="11" fill="${color}" />
          <ellipse cx="32" cy="50" rx="7" ry="11" fill="${color}" />
          <ellipse cx="14" cy="32" rx="11" ry="7" fill="${color}" />
          <ellipse cx="50" cy="32" rx="11" ry="7" fill="${color}" />
          <ellipse cx="19" cy="19" rx="7" ry="11" transform="rotate(-45 19 19)" fill="${color2}" />
          <ellipse cx="45" cy="45" rx="7" ry="11" transform="rotate(-45 45 45)" fill="${color2}" />
          <ellipse cx="45" cy="19" rx="7" ry="11" transform="rotate(45 45 19)" fill="${color2}" />
          <ellipse cx="19" cy="45" rx="7" ry="11" transform="rotate(45 19 45)" fill="${color2}" />
          <circle cx="32" cy="32" r="10" fill="${color2}" />
          <circle cx="32" cy="32" r="6" fill="${PALETTE.marigold}" />
          <circle cx="32" cy="32" r="2.5" fill="${PALETTE.forest}" />
        </svg>`;

      case "paisley":
        // Traditional Indian Kairi / Paisley teardrop
        return `<svg viewBox="0 0 64 80" width="${size}" height="${Math.round(size * 1.25)}"${cls}${style} fill="none" aria-hidden="true">
          <path d="M32,75 C14,75 6,60 6,42 C6,24 22,12 36,4 C38,12 36,24 26,30 C20,34 18,38 18,44 C18,52 24,62 34,62 C44,62 52,54 52,44 C52,36 46,30 42,26 C46,20 54,16 58,16 C58,32 58,75 32,75 Z" fill="${color}" />
          <circle cx="34" cy="46" r="4.5" fill="${color2}" />
          <circle cx="28" cy="53" r="2.5" fill="${PALETTE.cream}" />
          <circle cx="40" cy="53" r="2.5" fill="${PALETTE.cream}" />
        </svg>`;

      case "lotus":
        return `<svg viewBox="0 0 64 56" width="${size}" height="${Math.round(size * 0.88)}"${cls}${style} fill="none" aria-hidden="true">
          <path d="M32,6 C38,18 42,32 32,46 C22,32 26,18 32,6 Z" fill="${PALETTE.rani}" />
          <path d="M32,46 C44,44 54,34 56,18 C48,28 40,36 32,46 Z" fill="${PALETTE.blush}" />
          <path d="M32,46 C20,44 10,34 8,18 C16,28 24,36 32,46 Z" fill="${PALETTE.blush}" />
          <path d="M32,46 C48,48 58,42 62,30 C52,38 42,42 32,46 Z" fill="${color}" />
          <path d="M32,46 C16,48 6,42 2,30 C12,38 22,42 32,46 Z" fill="${color}" />
          <circle cx="32" cy="46" r="4" fill="${PALETTE.marigold}" />
        </svg>`;

      case "bangles":
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="22" stroke="${PALETTE.rani}" stroke-width="4.5" />
          <circle cx="32" cy="32" r="22" stroke="${PALETTE.marigold}" stroke-width="4.5" />
          <circle cx="36" cy="36" r="22" stroke="${PALETTE.cobalt}" stroke-width="4.5" />
          <circle cx="34" cy="34" r="16" stroke="${PALETTE.forest}" stroke-width="2.5" stroke-dasharray="4 3" />
        </svg>`;

      case "rangoli":
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="26" stroke="${color}" stroke-width="2" stroke-dasharray="4 4" />
          <rect x="22" y="22" width="20" height="20" transform="rotate(45 32 32)" stroke="${color2}" stroke-width="2.5" fill="none" />
          <circle cx="32" cy="32" r="7" fill="${color}" />
          <circle cx="32" cy="12" r="3.5" fill="${color2}" />
          <circle cx="32" cy="52" r="3.5" fill="${color2}" />
          <circle cx="12" cy="32" r="3.5" fill="${color2}" />
          <circle cx="52" cy="32" r="3.5" fill="${color2}" />
        </svg>`;

      case "squiggle":
        return `<svg viewBox="0 0 80 24" width="${size}" height="${Math.round(size * 0.3)}"${cls}${style} fill="none" aria-hidden="true">
          <path d="M4,12 C12,2 20,22 28,12 C36,2 44,22 52,12 C60,2 68,22 76,12" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        </svg>`;

      case "hatch":
        return `<svg viewBox="0 0 48 48" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <line x1="8" y1="40" x2="40" y2="8" stroke="${color}" stroke-width="3" stroke-linecap="round" />
          <line x1="16" y1="44" x2="44" y2="16" stroke="${color}" stroke-width="3" stroke-linecap="round" />
          <line x1="4" y1="32" x2="32" y2="4" stroke="${color}" stroke-width="3" stroke-linecap="round" />
          <line x1="24" y1="48" x2="48" y2="24" stroke="${color}" stroke-width="3" stroke-linecap="round" />
        </svg>`;

      case "sun":
        return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="14" fill="${PALETTE.marigold}" />
          <line x1="32" y1="6" x2="32" y2="12" stroke="${PALETTE.vermilion}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="32" y1="52" x2="32" y2="58" stroke="${PALETTE.vermilion}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="6" y1="32" x2="12" y2="32" stroke="${PALETTE.vermilion}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="52" y1="32" x2="58" y2="32" stroke="${PALETTE.vermilion}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="14" y1="14" x2="18" y2="18" stroke="${PALETTE.marigold}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="46" y1="46" x2="50" y2="50" stroke="${PALETTE.marigold}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="50" y1="14" x2="46" y2="18" stroke="${PALETTE.marigold}" stroke-width="3.5" stroke-linecap="round" />
          <line x1="14" y1="50" x2="18" y2="46" stroke="${PALETTE.marigold}" stroke-width="3.5" stroke-linecap="round" />
        </svg>`;

      case "leaf":
        return `<svg viewBox="0 0 48 64" width="${size}" height="${Math.round(size * 1.3)}"${cls}${style} fill="none" aria-hidden="true">
          <path d="M24,4 C38,18 44,40 24,60 C4,40 10,18 24,4 Z" fill="${color3}" />
          <line x1="24" y1="12" x2="24" y2="56" stroke="${PALETTE.cream}" stroke-width="2" stroke-linecap="round" />
          <line x1="24" y1="26" x2="33" y2="20" stroke="${PALETTE.cream}" stroke-width="1.8" stroke-linecap="round" />
          <line x1="24" y1="38" x2="33" y2="32" stroke="${PALETTE.cream}" stroke-width="1.8" stroke-linecap="round" />
          <line x1="24" y1="26" x2="15" y2="20" stroke="${PALETTE.cream}" stroke-width="1.8" stroke-linecap="round" />
          <line x1="24" y1="38" x2="15" y2="32" stroke="${PALETTE.cream}" stroke-width="1.8" stroke-linecap="round" />
        </svg>`;

      case "bird":
        // Dignified flying small sparrow
        return `<svg viewBox="0 0 64 48" width="${size}" height="${Math.round(size * 0.75)}"${cls}${style} fill="none" aria-hidden="true">
          <path d="M8,26 C16,18 28,14 42,16 C48,10 56,6 62,8 C56,16 54,24 50,30 C38,36 24,36 14,30 C10,34 6,36 2,36 C4,32 6,28 8,26 Z" fill="${color}" />
          <path d="M28,16 C22,6 32,2 40,4 C38,10 34,14 28,16 Z" fill="${color2}" />
          <circle cx="54" cy="14" r="1.8" fill="${PALETTE.ink}" />
        </svg>`;

      case "dots":
        return `<svg viewBox="0 0 48 48" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5" fill="${color}" />
          <circle cx="24" cy="12" r="3.5" fill="${color2}" />
          <circle cx="36" cy="12" r="3.5" fill="${color}" />
          <circle cx="12" cy="24" r="3.5" fill="${color2}" />
          <circle cx="24" cy="24" r="5" fill="${color}" />
          <circle cx="36" cy="24" r="3.5" fill="${color2}" />
          <circle cx="12" cy="36" r="3.5" fill="${color}" />
          <circle cx="24" cy="36" r="3.5" fill="${color2}" />
          <circle cx="36" cy="36" r="3.5" fill="${color}" />
        </svg>`;

      case "bloom":
        // Petal-burst celebration for save states
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}"${cls}${style} fill="none" aria-hidden="true">
          <g class="bloom-group" style="transform-origin:50px 50px;">
            <circle cx="50" cy="50" r="10" fill="${PALETTE.vermilion}" />
            <circle cx="50" cy="50" r="6" fill="${PALETTE.marigold}" />
            <ellipse cx="50" cy="22" rx="5" ry="12" fill="${PALETTE.marigold}" />
            <ellipse cx="50" cy="78" rx="5" ry="12" fill="${PALETTE.marigold}" />
            <ellipse cx="22" cy="50" rx="12" ry="5" fill="${PALETTE.marigold}" />
            <ellipse cx="78" cy="50" rx="12" ry="5" fill="${PALETTE.marigold}" />
            <ellipse cx="30" cy="30" rx="6" ry="12" transform="rotate(-45 30 30)" fill="${PALETTE.rani}" />
            <ellipse cx="70" cy="70" rx="6" ry="12" transform="rotate(-45 70 70)" fill="${PALETTE.rani}" />
            <ellipse cx="70" cy="30" rx="6" ry="12" transform="rotate(45 70 30)" fill="${PALETTE.vermilionBright}" />
            <ellipse cx="30" cy="70" rx="6" ry="12" transform="rotate(45 30 70)" fill="${PALETTE.vermilionBright}" />
          </g>
        </svg>`;

      default:
        return decor("marigold", opts);
    }
  }

  // --- 3. Hand-drawn Marks (ART.hand) ---
  const hand = {
    underline(colour = PALETTE.marigold) {
      return `<svg viewBox="0 0 180 20" fill="none" preserveAspectRatio="none" style="width:100%; height:18px; display:block;" aria-hidden="true">
        <path d="M4,14 C42,5 98,3 176,12 C130,17 74,16 16,15" stroke="${colour}" stroke-width="4.5" stroke-linecap="round" />
      </svg>`;
    },
    circle(colour = PALETTE.vermilion) {
      return `<svg viewBox="0 0 160 70" fill="none" preserveAspectRatio="none" style="width:100%; height:100%; display:block;" aria-hidden="true">
        <path d="M20,38 C14,16 60,6 110,8 C148,10 156,28 148,46 C138,62 82,66 34,60 C12,58 6,42 18,32 C26,24 44,20 60,18" stroke="${colour}" stroke-width="3.5" stroke-linecap="round" />
      </svg>`;
    },
    arrowDotted(colour = PALETTE.forest) {
      return `<svg viewBox="0 0 80 40" fill="none" style="width:70px; height:36px; display:inline-block;" aria-hidden="true">
        <path d="M6,26 C24,12 48,10 70,22" stroke="${colour}" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round" fill="none" />
        <polyline points="60,14 72,22 62,32" stroke="${colour}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>`;
    }
  };

  // --- 4. Woman Figure Generator (ART.woman) ---
  // opts: skin, hair, hairStyle, top, bottom, dupatta, accessory, prop, pose, mirror, asGroup
  function woman(opts = {}) {
    const skin = opts.skin || PALETTE.skinTones[1];
    const hair = opts.hair || PALETTE.hairTones.black;
    const hairStyle = opts.hairStyle || "bun";
    const top = opts.top || PALETTE.vermilion;
    const bottom = opts.bottom || "saree";
    const dupatta = opts.dupatta || null;
    const accessory = opts.accessory || "bindi";
    const prop = opts.prop || null;
    const pose = opts.pose || "stand";
    const mirror = Boolean(opts.mirror);
    const asGroup = Boolean(opts.asGroup);

    let parts = [];

    // Transform wrapper for mirror / pose
    const mirrorAttr = mirror ? ' transform="scale(-1, 1) translate(-200, 0)"' : "";

    // -- Bottom Garment & Legs --
    if (bottom === "jeans") {
      // Modern kurta over denim
      parts.push(`
        <!-- Legs / Jeans -->
        <path d="M84,170 L80,250 L92,250 L96,170 Z" fill="${PALETTE.cobalt}" />
        <path d="M104,170 L108,250 L120,250 L116,170 Z" fill="${PALETTE.cobalt}" />
        <ellipse cx="86" cy="252" rx="9" ry="4" fill="${PALETTE.ink}" />
        <ellipse cx="114" cy="252" rx="9" ry="4" fill="${PALETTE.ink}" />
        <!-- Kurta Top over Jeans -->
        <path d="M72,112 L128,112 L134,180 L66,180 Z" fill="${top}" />
        <path d="M66,180 L66,160 M134,180 L134,160" stroke="${PALETTE.cream}" stroke-width="1.5" />
      `);
    } else if (bottom === "salwar") {
      // Salwar Kameez
      parts.push(`
        <!-- Salwar pants -->
        <path d="M76,160 C70,200 74,235 82,250 L94,250 C96,230 94,195 98,160 Z" fill="${PALETTE.cream}" />
        <path d="M124,160 C130,200 126,235 118,250 L106,250 C104,230 106,195 102,160 Z" fill="${PALETTE.cream}" />
        <ellipse cx="86" cy="252" rx="8" ry="3.5" fill="${skin}" />
        <ellipse cx="114" cy="252" rx="8" ry="3.5" fill="${skin}" />
        <!-- Kameez Kurta -->
        <path d="M70,110 L130,110 L136,190 L64,190 Z" fill="${top}" />
        <line x1="100" y1="110" x2="100" y2="155" stroke="${PALETTE.cream}" stroke-width="2" />
      `);
    } else if (bottom === "skirt") {
      // Long flared skirt
      parts.push(`
        <path d="M74,130 L126,130 L146,248 L54,248 Z" fill="${top === PALETTE.cobalt ? PALETTE.marigold : PALETTE.cobalt}" />
        <ellipse cx="86" cy="250" rx="8" ry="3.5" fill="${skin}" />
        <ellipse cx="114" cy="250" rx="8" ry="3.5" fill="${skin}" />
        <path d="M76,108 L124,108 L128,138 L72,138 Z" fill="${top}" />
      `);
    } else {
      // Saree (default)
      const sareeColor = top;
      const border = sareeColor === PALETTE.marigold ? PALETTE.vermilion : PALETTE.marigold;
      parts.push(`
        <!-- Saree skirt & pleats -->
        <path d="M70,130 L130,130 C136,180 138,220 134,250 L66,250 C62,220 64,180 70,130 Z" fill="${sareeColor}" />
        <!-- Pleat lines -->
        <line x1="94" y1="130" x2="94" y2="248" stroke="${border}" stroke-width="2.5" />
        <line x1="100" y1="130" x2="100" y2="248" stroke="${border}" stroke-width="2.5" />
        <line x1="106" y1="130" x2="106" y2="248" stroke="${border}" stroke-width="2.5" />
        <!-- Bottom golden border -->
        <path d="M66,244 L134,244 L134,250 L66,250 Z" fill="${border}" />
        <!-- Feet -->
        <ellipse cx="88" cy="252" rx="8" ry="3.5" fill="${skin}" />
        <ellipse cx="112" cy="252" rx="8" ry="3.5" fill="${skin}" />
        <!-- Blouse & draped pallu -->
        <path d="M74,106 L126,106 L128,135 L72,135 Z" fill="${sareeColor}" />
        <!-- Pallu sash diagonal -->
        <path d="M70,135 L124,106 L130,118 L76,145 Z" fill="${border}" />
      `);
    }

    // -- Torso & Neck --
    parts.push(`
      <!-- Neck -->
      <rect x="94" y="80" width="12" height="28" rx="4" fill="${skin}" />
      <!-- Shoulders -->
      <path d="M70,106 C78,98 90,96 100,96 C110,96 122,98 130,106 Z" fill="${top}" />
    `);

    // -- Dupatta if present --
    if (dupatta) {
      parts.push(`
        <!-- Flowing Dupatta -->
        <path d="M66,106 C80,125 120,125 134,106 C144,140 142,200 136,230 L126,230 C130,195 132,145 124,118 C108,132 88,132 74,118 C68,145 70,195 74,230 L64,230 C58,200 56,140 66,106 Z" fill="${dupatta}" opacity="0.95" />
      `);
    }

    // -- Arms / Poses --
    if (pose === "wave") {
      parts.push(`
        <!-- Left arm resting -->
        <path d="M72,106 L58,160 L68,164 L78,114 Z" fill="${top}" />
        <circle cx="60" cy="166" r="6.5" fill="${skin}" />
        <!-- Right arm waving high -->
        <path d="M128,106 L148,70 L158,74 L136,114 Z" fill="${top}" />
        <circle cx="152" cy="66" r="7" fill="${skin}" />
        <!-- Hand palm open -->
        <path d="M148,60 C148,54 158,54 158,60 Z" fill="${skin}" />
      `);
    } else if (pose === "hold-up") {
      parts.push(`
        <!-- Both arms holding prop proudly up -->
        <path d="M72,106 L62,130 L90,125 L92,118 Z" fill="${top}" />
        <circle cx="92" cy="124" r="6" fill="${skin}" />
        <path d="M128,106 L140,125 L110,125 L108,118 Z" fill="${top}" />
        <circle cx="108" cy="124" r="6" fill="${skin}" />
      `);
    } else if (pose === "sit") {
      parts.push(`
        <!-- Arms placed gently on lap -->
        <path d="M72,106 L68,146 L95,152 L95,142 Z" fill="${top}" />
        <circle cx="96" cy="148" r="6.5" fill="${skin}" />
        <path d="M128,106 L132,146 L105,152 L105,142 Z" fill="${top}" />
        <circle cx="104" cy="148" r="6.5" fill="${skin}" />
      `);
    } else {
      // Default: stand with arms at sides / holding
      parts.push(`
        <!-- Left arm -->
        <path d="M72,106 L64,152 L74,155 L80,114 Z" fill="${top}" />
        <circle cx="68" cy="158" r="6.5" fill="${skin}" />
        <!-- Right arm -->
        <path d="M128,106 L136,152 L126,155 L120,114 Z" fill="${top}" />
        <circle cx="132" cy="158" r="6.5" fill="${skin}" />
      `);
    }

    // Bangles accessory on wrists
    if (accessory === "bangles") {
      parts.push(`
        <rect x="64" y="150" width="8" height="4" rx="2" fill="${PALETTE.marigold}" />
        <rect x="64" y="145" width="8" height="3" rx="1.5" fill="${PALETTE.rani}" />
        <rect x="128" y="150" width="8" height="4" rx="2" fill="${PALETTE.marigold}" />
        <rect x="128" y="145" width="8" height="3" rx="1.5" fill="${PALETTE.rani}" />
      `);
    }

    // Cane accessory
    if (accessory === "cane") {
      parts.push(`
        <!-- Walking Cane in right hand -->
        <path d="M132,156 L138,252 M132,156 C132,146 142,146 142,152" stroke="${PALETTE.ink}" stroke-width="3.5" stroke-linecap="round" fill="none" />
      `);
    }

    // -- Head & Face --
    parts.push(`
      <!-- Head Circle -->
      <circle cx="100" cy="62" r="21" fill="${skin}" />
      <!-- Eyes: Closed peaceful smile arc per BRIEF -->
      <path d="M91,62 Q95,66 99,62" stroke="${PALETTE.ink}" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M103,62 Q107,66 111,62" stroke="${PALETTE.ink}" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Small smile arc -->
      <path d="M96,72 Q100,77 105,72" stroke="${PALETTE.ink}" stroke-width="2" fill="none" stroke-linecap="round" />
    `);

    // Bindi
    if (accessory === "bindi" || accessory === "bangles" || accessory === "glasses") {
      parts.push(`<circle cx="100.5" cy="56" r="2.2" fill="${PALETTE.vermilion}" />`);
    }

    // Glasses
    if (accessory === "glasses") {
      parts.push(`
        <circle cx="94" cy="62" r="7.5" stroke="${PALETTE.ink}" stroke-width="1.8" fill="none" />
        <circle cx="107" cy="62" r="7.5" stroke="${PALETTE.ink}" stroke-width="1.8" fill="none" />
        <line x1="101.5" y1="62" x2="99.5" y2="62" stroke="${PALETTE.ink}" stroke-width="1.8" />
        <line x1="86.5" y1="62" x2="80" y2="60" stroke="${PALETTE.ink}" stroke-width="1.5" />
        <line x1="114.5" y1="62" x2="120" y2="60" stroke="${PALETTE.ink}" stroke-width="1.5" />
      `);
    }

    // Hearing aid
    if (accessory === "hearing-aid") {
      parts.push(`
        <path d="M118,60 C122,60 124,66 120,70" stroke="${PALETTE.marigold}" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <circle cx="118" cy="64" r="2" fill="${PALETTE.vermilion}" />
      `);
    }

    // -- Hair Styles --
    if (hairStyle === "braid") {
      parts.push(`
        <!-- Center parted hair + long side braid -->
        <path d="M79,62 C79,42 90,41 100,41 C110,41 121,42 121,62 C116,48 108,46 100,46 C92,46 84,48 79,62 Z" fill="${hair}" />
        <!-- Braid falling over left shoulder -->
        <ellipse cx="80" cy="76" rx="6" ry="8" fill="${hair}" />
        <ellipse cx="78" cy="90" rx="5.5" ry="7" fill="${hair}" />
        <ellipse cx="76" cy="104" rx="5" ry="6.5" fill="${hair}" />
        <ellipse cx="74" cy="116" rx="4.5" ry="6" fill="${hair}" />
        <ellipse cx="73" cy="126" rx="3" ry="4" fill="${PALETTE.vermilion}" />
      `);
    } else if (hairStyle === "short") {
      parts.push(`
        <!-- Modern chin-length bob -->
        <path d="M78,66 C77,44 86,40 100,40 C114,40 123,44 122,66 C124,78 116,80 114,72 C110,50 90,50 86,72 C84,80 76,78 78,66 Z" fill="${hair}" />
      `);
    } else if (hairStyle === "curls") {
      parts.push(`
        <!-- Bouncy voluminous curls -->
        <circle cx="82" cy="50" r="11" fill="${hair}" />
        <circle cx="94" cy="42" r="11" fill="${hair}" />
        <circle cx="106" cy="42" r="11" fill="${hair}" />
        <circle cx="118" cy="50" r="11" fill="${hair}" />
        <circle cx="78" cy="62" r="10" fill="${hair}" />
        <circle cx="122" cy="62" r="10" fill="${hair}" />
        <path d="M84,54 C88,48 112,48 116,54 C110,50 90,50 84,54 Z" fill="${hair}" />
      `);
    } else if (hairStyle === "grey-bun") {
      parts.push(`
        <!-- Classic silver grey high bun -->
        <circle cx="100" cy="36" r="13" fill="${PALETTE.hairTones.grey}" />
        <path d="M79,62 C79,44 88,43 100,43 C112,43 121,44 121,62 C116,49 108,47 100,47 C92,47 84,49 79,62 Z" fill="${PALETTE.hairTones.grey}" />
        <!-- Hairpin / flower in bun -->
        <circle cx="108" cy="34" r="4" fill="${PALETTE.marigold}" />
      `);
    } else if (hairStyle === "long") {
      parts.push(`
        <!-- Long flowing hair over both shoulders -->
        <path d="M76,64 C75,44 86,41 100,41 C114,41 125,44 124,64 L128,125 C124,128 118,125 118,105 C116,52 84,52 82,105 C82,125 76,128 72,125 Z" fill="${hair}" />
      `);
    } else {
      // Classic neat bun (default)
      parts.push(`
        <!-- Top/back classic bun -->
        <circle cx="100" cy="38" r="12" fill="${hair}" />
        <!-- Hairline framing face -->
        <path d="M79,62 C79,44 88,43 100,43 C112,43 121,44 121,62 C116,49 108,47 100,47 C92,47 84,49 79,62 Z" fill="${hair}" />
        <!-- Tiny marigold flower in hair -->
        <circle cx="108" cy="38" r="3.5" fill="${PALETTE.marigold}" />
      `);
    }

    // -- Props --
    if (prop === "needle") {
      parts.push(`
        <!-- Tailoring Needle & Thread Spool -->
        <rect x="124" y="142" width="12" height="18" rx="2" fill="${PALETTE.marigold}" />
        <line x1="124" y1="147" x2="136" y2="147" stroke="${PALETTE.vermilion}" stroke-width="2" />
        <line x1="124" y1="152" x2="136" y2="152" stroke="${PALETTE.vermilion}" stroke-width="2" />
        <!-- Thread looping to needle -->
        <path d="M130,142 C125,120 110,130 95,145" stroke="${PALETTE.vermilion}" stroke-width="1.8" stroke-dasharray="2 2" fill="none" />
        <!-- Needle -->
        <line x1="90" y1="148" x2="102" y2="140" stroke="#B9B4AE" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="101" cy="141" r="1" fill="${PALETTE.ink}" />
      `);
    } else if (prop === "sewing-machine") {
      parts.push(`
        <!-- Sewing Machine silhouette -->
        <g transform="translate(110, 160) scale(0.65)">
          <rect x="0" y="44" width="70" height="10" rx="3" fill="${PALETTE.ink}" />
          <path d="M10,44 L10,10 L50,10 L50,22 L35,22 L35,44 Z" fill="${PALETTE.ink}" />
          <circle cx="10" cy="20" r="9" stroke="${PALETTE.marigold}" stroke-width="3" fill="${PALETTE.ink}" />
          <line x1="50" y1="22" x2="50" y2="38" stroke="#ccc" stroke-width="2" />
          <rect x="42" y="38" width="16" height="4" fill="${PALETTE.marigold}" />
        </g>
      `);
    } else if (prop === "books") {
      parts.push(`
        <!-- Stack of 2 scholarly books -->
        <rect x="85" y="146" width="36" height="10" rx="2" fill="${PALETTE.cobalt}" />
        <rect x="87" y="144" width="32" height="4" fill="${PALETTE.cream}" />
        <rect x="82" y="154" width="40" height="11" rx="2" fill="${PALETTE.vermilion}" />
        <rect x="84" y="152" width="36" height="4" fill="${PALETTE.cream}" />
        <!-- Bookmark ribbon -->
        <path d="M96,165 L96,172 L100,169 L104,172 L104,165 Z" fill="${PALETTE.marigold}" />
      `);
    } else if (prop === "graduation-cap") {
      parts.push(`
        <!-- Graduation mortarboard cap held proudly -->
        <polygon points="100,126 126,134 100,142 74,134" fill="${PALETTE.ink}" />
        <rect x="88" y="137" width="24" height="8" rx="2" fill="${PALETTE.ink}" />
        <circle cx="100" cy="134" r="2" fill="${PALETTE.marigold}" />
        <path d="M100,134 L114,142 L116,150" stroke="${PALETTE.marigold}" stroke-width="2" fill="none" />
      `);
    } else if (prop === "laptop") {
      parts.push(`
        <!-- Open slim modern laptop -->
        <polygon points="82,148 118,148 126,168 74,168" fill="#4A4540" />
        <rect x="84" y="126" width="32" height="22" rx="2" fill="${PALETTE.cobalt}" />
        <rect x="86" y="128" width="28" height="18" fill="${PALETTE.cream}" />
      `);
    } else if (prop === "notebook") {
      parts.push(`
        <!-- Open notebook with pen -->
        <polygon points="80,148 98,144 116,148 98,154" fill="${PALETTE.cream}" stroke="${PALETTE.ink}" stroke-width="1.5" />
        <line x1="98" y1="144" x2="98" y2="154" stroke="${PALETTE.vermilion}" stroke-width="1.5" />
        <line x1="110" y1="140" x2="118" y2="152" stroke="${PALETTE.forest}" stroke-width="2.5" stroke-linecap="round" />
      `);
    } else if (prop === "chai") {
      parts.push(`
        <!-- Steaming clay chai kulhar cup -->
        <polygon points="124,146 136,146 133,162 127,162" fill="#C08052" />
        <ellipse cx="130" cy="146" rx="6" ry="2" fill="${PALETTE.cream}" />
        <!-- Steam swirls -->
        <path d="M128,142 Q130,136 128,132" stroke="${PALETTE.oat}" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <path d="M132,142 Q134,136 132,132" stroke="${PALETTE.oat}" stroke-width="1.8" fill="none" stroke-linecap="round" />
      `);
    } else if (prop === "certificate") {
      parts.push(`
        <!-- Rolled certificate with rani ribbon -->
        <rect x="84" y="142" width="36" height="14" rx="3" fill="${PALETTE.cream}" stroke="${PALETTE.ink}" stroke-width="1.5" />
        <rect x="98" y="140" width="8" height="18" rx="2" fill="${PALETTE.rani}" />
        <line x1="88" y1="146" x2="94" y2="146" stroke="${PALETTE.ink}" stroke-width="1.2" />
        <line x1="88" y1="150" x2="94" y2="150" stroke="${PALETTE.ink}" stroke-width="1.2" />
        <line x1="110" y1="146" x2="116" y2="146" stroke="${PALETTE.ink}" stroke-width="1.2" />
      `);
    } else if (prop === "scissors") {
      parts.push(`
        <!-- Golden Tailor Scissors -->
        <circle cx="126" cy="158" r="4.5" stroke="${PALETTE.marigold}" stroke-width="2" fill="none" />
        <circle cx="134" cy="158" r="4.5" stroke="${PALETTE.marigold}" stroke-width="2" fill="none" />
        <line x1="127" y1="154" x2="135" y2="138" stroke="#B9B4AE" stroke-width="2.5" stroke-linecap="round" />
        <line x1="133" y1="154" x2="125" y2="138" stroke="#B9B4AE" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="130" cy="146" r="1.5" fill="${PALETTE.ink}" />
      `);
    } else if (prop === "flask") {
      parts.push(`
        <!-- Science lab conical flask -->
        <polygon points="124,142 136,142 144,166 116,166" fill="rgba(255,255,255,0.7)" stroke="${PALETTE.ink}" stroke-width="1.8" />
        <polygon points="118,164 142,164 138,154 122,154" fill="${PALETTE.cobalt}" />
        <line x1="126" y1="142" x2="134" y2="142" stroke="${PALETTE.ink}" stroke-width="2" />
      `);
    }

    const content = `<g class="woman-figure"${mirrorAttr}>${parts.join("")}</g>`;

    if (asGroup) {
      return content;
    }

    return `<svg viewBox="0 0 200 280" width="100%" height="100%" fill="none" style="overflow:visible;" aria-hidden="true">${content}</svg>`;
  }

  // --- 5. Narrative Scenes (ART.scene) ---
  // Each is a 320x320 viewBox: one woman, a prop, a blob and 3 decor shapes, overflow visible.
  function scene(name) {
    let womanOpts = {};
    let blobColor = PALETTE.oat;
    let blobSeed = 0;
    let decorItems = [];
    let altText = "Illustration of a woman advancing her journey";

    switch (name) {
      case "tailor":
        // Sunita: master tailor with sewing machine and scissors
        altText = "Illustration of Sunita, a master tailor with fabric, scissors, and sewing craft";
        womanOpts = {
          skin: PALETTE.skinTones[1], // #E0A877
          hair: PALETTE.hairTones.black,
          hairStyle: "braid",
          top: PALETTE.forest,
          bottom: "saree",
          accessory: "bangles",
          prop: "needle",
          pose: "stand"
        };
        blobColor = PALETTE.blush;
        blobSeed = 0;
        decorItems = [
          { name: "marigold", x: 230, y: 30, size: 48 },
          { name: "bangles", x: 20, y: 190, size: 54 },
          { name: "scissors", x: 235, y: 180, size: 42 }
        ];
        break;

      case "scholar":
        // Priya: postgraduate researcher with mathematics / books
        altText = "Illustration of Priya, a mathematics scholar with research books and graduation cap";
        womanOpts = {
          skin: PALETTE.skinTones[2], // #C08052
          hair: PALETTE.hairTones.darkBrown,
          hairStyle: "bun",
          top: PALETTE.cobalt,
          bottom: "salwar",
          dupatta: PALETTE.blush,
          accessory: "glasses",
          prop: "books",
          pose: "hold-up"
        };
        blobColor = PALETTE.oat;
        blobSeed = 2;
        decorItems = [
          { name: "lotus", x: 230, y: 40, size: 48 },
          { name: "sun", x: 30, y: 40, size: 46 },
          { name: "dots", x: 230, y: 200, size: 44 }
        ];
        break;

      case "learner":
        // Anjali: young woman restarting schooling with notebook & jeans
        altText = "Illustration of Anjali, resuming higher education with notebook and cheerful optimism";
        womanOpts = {
          skin: PALETTE.skinTones[0], // #F3D0B0
          hair: PALETTE.hairTones.warmBrown,
          hairStyle: "curls",
          top: PALETTE.vermilion,
          bottom: "jeans",
          dupatta: null,
          accessory: "none",
          prop: "notebook",
          pose: "wave"
        };
        blobColor = PALETTE.cream;
        blobSeed = 1;
        decorItems = [
          { name: "bird", x: 230, y: 40, size: 52 },
          { name: "squiggle", x: 20, y: 190, size: 64 },
          { name: "marigold", x: 240, y: 180, size: 44 }
        ];
        break;

      case "teacher":
        // Vocational instructor guiding others
        altText = "Illustration of an experienced vocational teacher proudly sharing skills";
        womanOpts = {
          skin: PALETTE.skinTones[3], // #94603A
          hair: PALETTE.hairTones.grey,
          hairStyle: "grey-bun",
          top: PALETTE.rani,
          bottom: "saree",
          dupatta: null,
          accessory: "glasses",
          prop: "certificate",
          pose: "stand"
        };
        blobColor = PALETTE.blush;
        blobSeed = 3;
        decorItems = [
          { name: "paisley", x: 220, y: 30, size: 52 },
          { name: "marigold", x: 25, y: 180, size: 48 },
          { name: "rangoli", x: 225, y: 190, size: 50 }
        ];
        break;

      case "entrepreneur":
        // Small business owner with laptop & capital
        altText = "Illustration of an independent woman entrepreneur running her business";
        womanOpts = {
          skin: PALETTE.skinTones[4], // #6B4228
          hair: PALETTE.hairTones.black,
          hairStyle: "short",
          top: PALETTE.forest,
          bottom: "salwar",
          dupatta: PALETTE.marigold,
          accessory: "bangles",
          prop: "laptop",
          pose: "stand"
        };
        blobColor = PALETTE.oat;
        blobSeed = 4;
        decorItems = [
          { name: "sun", x: 225, y: 35, size: 48 },
          { name: "bangles", x: 25, y: 190, size: 48 },
          { name: "leaf", x: 235, y: 185, size: 44 }
        ];
        break;

      case "homeEarner":
        // Flexible home-based earner enjoying chai
        altText = "Illustration of a woman earning flexibly from home with tea and handicrafts";
        womanOpts = {
          skin: PALETTE.skinTones[2], // #C08052
          hair: PALETTE.hairTones.darkBrown,
          hairStyle: "long",
          top: PALETTE.marigold,
          bottom: "saree",
          dupatta: null,
          accessory: "bindi",
          prop: "chai",
          pose: "sit"
        };
        blobColor = PALETTE.cream;
        blobSeed = 5;
        decorItems = [
          { name: "marigold", x: 220, y: 40, size: 48 },
          { name: "paisley", x: 25, y: 40, size: 48 },
          { name: "dots", x: 230, y: 190, size: 48 }
        ];
        break;

      case "doorway":
      default:
        // Stepping across courtyard archway into opportunities
        altText = "Illustration of a woman stepping through an arched courtyard doorway into new possibilities";
        womanOpts = {
          skin: PALETTE.skinTones[5], // #46291A
          hair: PALETTE.hairTones.black,
          hairStyle: "braid",
          top: PALETTE.vermilion,
          bottom: "saree",
          accessory: "bindi",
          prop: "certificate",
          pose: "wave"
        };
        blobColor = PALETTE.oat;
        blobSeed = 1;
        decorItems = [
          { name: "sun", x: 30, y: 35, size: 50 },
          { name: "marigold", x: 230, y: 35, size: 48 },
          { name: "bird", x: 225, y: 195, size: 48 }
        ];
        break;
    }

    // Build SVG
    const svgParts = [];
    svgParts.push(`<!-- Background Blob -->`);
    svgParts.push(`<g transform="translate(30, 20) scale(1.05)">${blob(blobColor, blobSeed)}</g>`);

    // Add decor items
    decorItems.forEach(d => {
      svgParts.push(`<g transform="translate(${d.x}, ${d.y})">${decor(d.name, { size: d.size })}</g>`);
    });

    // Add central woman figure
    svgParts.push(`<!-- Main Woman Figure -->`);
    svgParts.push(`<g transform="translate(60, 25)">${woman({ ...womanOpts, asGroup: true })}</g>`);

    return `<svg viewBox="0 0 320 320" width="100%" height="100%" style="overflow:visible;" role="img" aria-label="${esc(altText)}">
      ${svgParts.join("")}
    </svg>`;
  }

  // --- 6. Hero Crowd Composition (ART.crowd) ---
  // 1440x520 viewBox: nine overlapping women in two layers, center open for headline,
  // 3 front-row heroines: Sunita, Priya, Anjali with data-profile, tabindex="0", role="link".
  function crowd() {
    return `<svg viewBox="0 0 1440 520" width="100%" height="100%" style="overflow:visible; display:block;" role="img" aria-label="Hero composition of nine diverse women restarting their journey across India">
      <!-- Background Organic Color Blocks -->
      <g opacity="0.35">
        <path d="M-40,160 C120,80 260,100 380,180 C500,260 460,420 320,480 C180,540 -20,500 -60,340 Z" fill="${PALETTE.marigold}" />
        <path d="M1060,140 C1180,60 1340,90 1440,170 C1540,250 1520,410 1390,470 C1260,530 1100,480 1050,320 Z" fill="${PALETTE.vermilion}" />
      </g>

      <!-- Decorative Indian Motifs in Background -->
      <g transform="translate(80, 40)" opacity="0.85">${decor("marigold", { size: 54 })}</g>
      <g transform="translate(1300, 50)" opacity="0.85">${decor("marigold", { size: 54 })}</g>
      <g transform="translate(240, 70)" opacity="0.7">${decor("bird", { size: 48 })}</g>
      <g transform="translate(1160, 65)" opacity="0.7">${decor("sun", { size: 50 })}</g>
      <g transform="translate(480, 50)" opacity="0.6">${decor("paisley", { size: 42 })}</g>
      <g transform="translate(920, 45)" opacity="0.6">${decor("lotus", { size: 44 })}</g>
      <g transform="translate(680, 25)" opacity="0.8">${decor("marigold", { size: 42 })}</g>

      <!-- ================= LAYER 1: BACK ROW FIGURES (6 Figures) ================= -->

      <!-- Figure 1 (Far Left, Tall Dignified Elder with Cane & Grey Bun) -->
      <g transform="translate(30, 90) scale(1.2)" class="sway-slow" style="animation-delay: -1s;">
        ${woman({
          skin: PALETTE.skinTones[3], // #94603A
          hair: PALETTE.hairTones.grey,
          hairStyle: "grey-bun",
          top: PALETTE.forest,
          bottom: "saree",
          accessory: "cane",
          prop: null,
          pose: "stand",
          asGroup: true
        })}
      </g>

      <!-- Figure 2 (Left-Mid, Young Tech Enthusiast with Laptop) -->
      <g transform="translate(210, 115) scale(1.08)" class="sway-slow" style="animation-delay: -3s;">
        ${woman({
          skin: PALETTE.skinTones[5], // #46291A
          hair: PALETTE.hairTones.black,
          hairStyle: "short",
          top: PALETTE.rani,
          bottom: "salwar",
          accessory: "glasses",
          prop: "laptop",
          pose: "stand",
          asGroup: true
        })}
      </g>

      <!-- Figure 3 (Mid-Left, Woman in Rose Blush with Braid) -->
      <g transform="translate(380, 130) scale(1.02)">
        ${woman({
          skin: PALETTE.skinTones[0], // #F3D0B0
          hair: PALETTE.hairTones.warmBrown,
          hairStyle: "braid",
          top: PALETTE.cobalt,
          bottom: "saree",
          dupatta: PALETTE.blush,
          accessory: "bangles",
          prop: "chai",
          pose: "stand",
          asGroup: true
        })}
      </g>

      <!-- Figure 4 (Mid-Right, Research Assistant with Flask & Hearing Aid) -->
      <g transform="translate(860, 130) scale(1.02)" class="sway-slow" style="animation-delay: -4s;">
        ${woman({
          skin: PALETTE.skinTones[4], // #6B4228
          hair: PALETTE.hairTones.darkBrown,
          hairStyle: "bun",
          top: PALETTE.vermilion,
          bottom: "salwar",
          accessory: "hearing-aid",
          prop: "flask",
          pose: "stand",
          asGroup: true
        })}
      </g>

      <!-- Figure 5 (Right-Mid, Community Leader Waving) -->
      <g transform="translate(1030, 115) scale(1.08)" class="sway-slow" style="animation-delay: -2s;">
        ${woman({
          skin: PALETTE.skinTones[2], // #C08052
          hair: PALETTE.hairTones.black,
          hairStyle: "long",
          top: PALETTE.marigold,
          bottom: "saree",
          accessory: "bindi",
          prop: null,
          pose: "wave",
          asGroup: true
        })}
      </g>

      <!-- Figure 6 (Far Right, Tall Artisan Instructor with Certificate) -->
      <g transform="translate(1210, 90) scale(1.2)" class="sway-slow" style="animation-delay: -5s;">
        ${woman({
          skin: PALETTE.skinTones[1], // #E0A877
          hair: PALETTE.hairTones.black,
          hairStyle: "braid",
          top: PALETTE.deepForest,
          bottom: "saree",
          accessory: "bangles",
          prop: "certificate",
          pose: "stand",
          asGroup: true
        })}
      </g>

      <!-- Decorative foreground blooms between rows -->
      <g transform="translate(180, 360)">${decor("bangles", { size: 48 })}</g>
      <g transform="translate(480, 380)">${decor("marigold", { size: 42 })}</g>
      <g transform="translate(930, 375)">${decor("marigold", { size: 42 })}</g>
      <g transform="translate(1240, 360)">${decor("paisley", { size: 46 })}</g>

      <!-- ================= LAYER 2: THREE FRONT-ROW HEROINES ================= -->

      <!-- Heroine 1: SUNITA (Meerut - Tailor: Needle & Spool, Saree) -->
      <g data-profile="sunita" tabindex="0" role="link" aria-label="Meet Sunita, master tailor from Meerut"
         style="cursor: pointer; outline: none;" class="heroine-group" transform="translate(290, 145) scale(1.18)">
        <title>Meet Sunita (Class 10, Tailoring & Embroidery, Meerut)</title>
        <!-- Subtle glow backdrop -->
        <circle cx="100" cy="140" r="110" fill="${PALETTE.marigold}" opacity="0.22" />
        ${woman({
          skin: PALETTE.skinTones[1], // #E0A877
          hair: PALETTE.hairTones.black,
          hairStyle: "braid",
          top: PALETTE.forest,
          bottom: "saree",
          accessory: "bangles",
          prop: "needle",
          pose: "stand",
          asGroup: true
        })}
        <!-- Name Badge Pill -->
        <g transform="translate(56, 260)">
          <rect x="0" y="0" width="88" height="26" rx="13" fill="${PALETTE.cream}" stroke="${PALETTE.ink}" stroke-width="2" />
          <text x="44" y="18" font-family="'Fraunces', serif" font-size="14" font-weight="800" fill="${PALETTE.forest}" text-anchor="middle">Sunita &rarr;</text>
        </g>
      </g>

      <!-- Heroine 2: PRIYA (Lucknow - Scholar: Books & Graduation Cap, MSc) -->
      <g data-profile="priya" tabindex="0" role="link" aria-label="Meet Priya, MSc Mathematics scholar from Lucknow"
         style="cursor: pointer; outline: none;" class="heroine-group" transform="translate(590, 140) scale(1.22)">
        <title>Meet Priya (MSc Mathematics, Research Aspirant, Lucknow)</title>
        <circle cx="100" cy="140" r="115" fill="${PALETTE.blush}" opacity="0.25" />
        ${woman({
          skin: PALETTE.skinTones[2], // #C08052
          hair: PALETTE.hairTones.darkBrown,
          hairStyle: "bun",
          top: PALETTE.cobalt,
          bottom: "salwar",
          dupatta: PALETTE.blush,
          accessory: "glasses",
          prop: "books",
          pose: "hold-up",
          asGroup: true
        })}
        <!-- Name Badge Pill -->
        <g transform="translate(58, 260)">
          <rect x="0" y="0" width="84" height="26" rx="13" fill="${PALETTE.cream}" stroke="${PALETTE.ink}" stroke-width="2" />
          <text x="42" y="18" font-family="'Fraunces', serif" font-size="14" font-weight="800" fill="${PALETTE.cobalt}" text-anchor="middle">Priya &rarr;</text>
        </g>
      </g>

      <!-- Heroine 3: ANJALI (Kanpur - Learner: Notebook, Kurta with Jeans) -->
      <g data-profile="anjali" tabindex="0" role="link" aria-label="Meet Anjali, student resuming education from Kanpur"
         style="cursor: pointer; outline: none;" class="heroine-group" transform="translate(890, 145) scale(1.18)">
        <title>Meet Anjali (Class 12, Resuming Degree, Kanpur)</title>
        <circle cx="100" cy="140" r="110" fill="${PALETTE.cream}" opacity="0.3" />
        ${woman({
          skin: PALETTE.skinTones[0], // #F3D0B0
          hair: PALETTE.hairTones.warmBrown,
          hairStyle: "curls",
          top: PALETTE.vermilion,
          bottom: "jeans",
          accessory: "none",
          prop: "notebook",
          pose: "wave",
          asGroup: true
        })}
        <!-- Name Badge Pill -->
        <g transform="translate(56, 260)">
          <rect x="0" y="0" width="88" height="26" rx="13" fill="${PALETTE.cream}" stroke="${PALETTE.ink}" stroke-width="2" />
          <text x="44" y="18" font-family="'Fraunces', serif" font-size="14" font-weight="800" fill="${PALETTE.vermilion}" text-anchor="middle">Anjali &rarr;</text>
        </g>
      </g>
    </svg>`;
  }

  // --- 7. Textile-like Framed Panel (ART.panel) ---
  // About 1100x420: forest base, marigold flowers, paisley, bangles, squiggles, dots, overflow visible
  function panel() {
    return `<svg viewBox="0 0 1100 420" width="100%" height="100%" style="overflow:visible; display:block;" role="img" aria-label="Framed Indian textile panel in forest green with festive marigolds and paisleys">
      <!-- Outer Frame & Forest Base -->
      <rect x="15" y="15" width="1070" height="390" rx="36" fill="${PALETTE.forest}" stroke="${PALETTE.marigold}" stroke-width="4" />
      <rect x="25" y="25" width="1050" height="370" rx="28" fill="none" stroke="${PALETTE.cream}" stroke-width="2" stroke-dasharray="6 6" />

      <!-- Corner Marigolds (Breaking slightly beyond inner boundary) -->
      <g transform="translate(0, 0)">${decor("marigold", { size: 68 })}</g>
      <g transform="translate(1030, 0)">${decor("marigold", { size: 68 })}</g>
      <g transform="translate(0, 350)">${decor("marigold", { size: 68 })}</g>
      <g transform="translate(1030, 350)">${decor("marigold", { size: 68 })}</g>

      <!-- Center-Top and Center-Bottom Motifs -->
      <g transform="translate(515, -15)">${decor("marigold", { size: 72 })}</g>
      <g transform="translate(515, 365)">${decor("marigold", { size: 72 })}</g>

      <!-- Paisleys (Left & Right Borders) -->
      <g transform="translate(60, 160)">${decor("paisley", { size: 62, color: PALETTE.marigold, color2: PALETTE.vermilion })}</g>
      <g transform="translate(980, 160) scale(-1, 1)">${decor("paisley", { size: 62, color: PALETTE.marigold, color2: PALETTE.vermilion })}</g>

      <!-- Bangles and Rangoli Accents inside panel -->
      <g transform="translate(160, 60)" opacity="0.85">${decor("bangles", { size: 56 })}</g>
      <g transform="translate(880, 60)" opacity="0.85">${decor("bangles", { size: 56 })}</g>
      <g transform="translate(170, 290)" opacity="0.85">${decor("rangoli", { size: 58 })}</g>
      <g transform="translate(870, 290)" opacity="0.85">${decor("rangoli", { size: 58 })}</g>

      <!-- Squiggles & Dot clusters -->
      <g transform="translate(320, 45)">${decor("squiggle", { size: 100, color: PALETTE.marigold })}</g>
      <g transform="translate(680, 45)">${decor("squiggle", { size: 100, color: PALETTE.marigold })}</g>
      <g transform="translate(320, 355)">${decor("squiggle", { size: 100, color: PALETTE.marigold })}</g>
      <g transform="translate(680, 355)">${decor("squiggle", { size: 100, color: PALETTE.marigold })}</g>

      <!-- Flying dove / small birds of hope -->
      <g transform="translate(380, 180)" opacity="0.9">${decor("bird", { size: 54, color: PALETTE.cream, color2: PALETTE.marigold })}</g>
      <g transform="translate(660, 180)" opacity="0.9">${decor("bird", { size: 54, color: PALETTE.cream, color2: PALETTE.marigold })}</g>

      <!-- Decorative rangoli dots in center floor -->
      <g transform="translate(525, 180)">${decor("dots", { size: 50, color: PALETTE.marigold, color2: PALETTE.blush })}</g>
    </svg>`;
  }

  // --- 8. Sakhi Avatar (ART.sakhi) ---
  // Warm woman in marigold dupatta with friendly smile
  function sakhi() {
    return `<svg viewBox="0 0 120 120" width="100%" height="100%" style="overflow:visible; display:block;" role="img" aria-label="Sakhi avatar, a friendly guide in a marigold dupatta">
      <!-- Arch / Circular Frame -->
      <circle cx="60" cy="60" r="54" fill="${PALETTE.cream}" stroke="${PALETTE.marigold}" stroke-width="4" />
      <circle cx="60" cy="60" r="48" fill="${PALETTE.blush}" />

      <!-- Woman Portrait -->
      <g transform="translate(-40, -10) scale(0.95)">
        <!-- Neck -->
        <rect x="94" y="68" width="12" height="18" rx="4" fill="${PALETTE.skinTones[1]}" />
        <!-- Shoulders & Dupatta -->
        <path d="M70,86 C80,82 100,82 110,84 C120,86 130,95 134,115 L66,115 Z" fill="${PALETTE.vermilion}" />
        <path d="M68,88 C82,106 118,106 132,88 C138,105 135,120 134,130 L66,130 C65,120 62,105 68,88 Z" fill="${PALETTE.marigold}" />
        <!-- Head -->
        <circle cx="100" cy="52" r="18" fill="${PALETTE.skinTones[1]}" />
        <!-- Hair Bun -->
        <circle cx="100" cy="32" r="10" fill="${PALETTE.hairTones.black}" />
        <path d="M82,52 C82,36 90,35 100,35 C110,35 118,36 118,52 C114,41 107,39 100,39 C93,39 86,41 82,52 Z" fill="${PALETTE.hairTones.black}" />
        <!-- Little flower in hair -->
        <circle cx="108" cy="33" r="3" fill="${PALETTE.marigold}" />
        <!-- Eyes (closed warm smile) -->
        <path d="M92,52 Q95,55 98,52" stroke="${PALETTE.ink}" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <path d="M102,52 Q105,55 108,52" stroke="${PALETTE.ink}" stroke-width="1.8" fill="none" stroke-linecap="round" />
        <!-- Bindi -->
        <circle cx="100" cy="46" r="1.8" fill="${PALETTE.vermilion}" />
        <!-- Smile -->
        <path d="M96,60 Q100,64 104,60" stroke="${PALETTE.ink}" stroke-width="1.8" fill="none" stroke-linecap="round" />
      </g>

      <!-- Tiny Marigold Badge on Frame -->
      <g transform="translate(86, 76)">${decor("marigold", { size: 30 })}</g>
    </svg>`;
  }

  // --- 9. ART.slot(name, alt, className) ---
  // Renders the coded SVG first, then tries to load assets/illustrations/{name}.svg;
  // If it loads, swaps it in. Enables dropping real artwork later with zero code change.
  function slot(name, alt = "", className = "") {
    const slotId = "art-slot-" + Math.random().toString(36).substring(2, 9);
    let codedSvg = "";

    switch (name) {
      case "hero-crowd":
        codedSvg = crowd();
        break;
      case "scene-tailor":
        codedSvg = scene("tailor");
        break;
      case "scene-scholar":
        codedSvg = scene("scholar");
        break;
      case "scene-learner":
        codedSvg = scene("learner");
        break;
      case "scene-teacher":
        codedSvg = scene("teacher");
        break;
      case "scene-entrepreneur":
        codedSvg = scene("entrepreneur");
        break;
      case "scene-homeEarner":
        codedSvg = scene("homeEarner");
        break;
      case "scene-doorway":
        codedSvg = scene("doorway");
        break;
      case "cta-panel":
        codedSvg = panel();
        break;
      case "sakhi":
        codedSvg = sakhi();
        break;
      default:
        codedSvg = decor("marigold", { size: 64 });
    }

    // Schedule background check for external asset override
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById(slotId);
        if (!el) return;
        const testImg = new Image();
        testImg.onload = function () {
          el.innerHTML = `<img src="assets/illustrations/${esc(name)}.svg" alt="${esc(alt || name)}" class="${esc(className)}" style="width:100%; height:auto; display:block;">`;
        };
        testImg.onerror = function () {
          // Keep coded inline SVG - exactly as designed
        };
        testImg.src = `assets/illustrations/${name}.svg`;
      }, 50);
    }

    return `<div id="${slotId}" class="art-slot ${esc(className)}" data-slot="${esc(name)}">${codedSvg}</div>`;
  }

  // Delegate heroine clicks from SVG crowd
  if (typeof document !== "undefined") {
    document.addEventListener("click", function (e) {
      const heroine = e.target.closest && e.target.closest("[data-profile]");
      if (heroine) {
        const profileId = heroine.getAttribute("data-profile");
        if (profileId && typeof window.loadDemoProfile === "function") {
          window.loadDemoProfile(profileId);
        }
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const heroine = e.target.closest && e.target.closest("[data-profile]");
        if (heroine) {
          e.preventDefault();
          const profileId = heroine.getAttribute("data-profile");
          if (profileId && typeof window.loadDemoProfile === "function") {
            window.loadDemoProfile(profileId);
          }
        }
      }
    });
  }

  // Public ART Interface
  return {
    PALETTE: PALETTE,
    woman: woman,
    decor: decor,
    blob: blob,
    hand: hand,
    scene: scene,
    crowd: crowd,
    panel: panel,
    sakhi: sakhi,
    slot: slot
  };
})();
