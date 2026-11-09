/**
 * ReturnHer - Core Application & Routing
 * Vanilla JavaScript SPA with Hash-based routing, localStorage persistence,
 * and component state management.
 * Strictly adheres to BRIEF.md v2.
 */

(function () {
  "use strict";

  // --- Storage Keys ---
  const STORAGE_KEYS = {
    PROFILE: "returnher_profile",
    SAVED_OPPORTUNITIES: "returnher_saved_opps",
    TRACKER_PROGRESS: "returnher_tracker",
    APPLICATION_STAGES: "returnher_app_stages"
  };

  // --- SVG Icons & Decorative Motifs (No 4-point sparkle star, no AI robot icons) ---
  const ICONS = {
    marigold: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="5" fill="#D2401F"/>
      <ellipse cx="16" cy="6" rx="3.5" ry="5.5" fill="#FFC21A"/>
      <ellipse cx="16" cy="26" rx="3.5" ry="5.5" fill="#FFC21A"/>
      <ellipse cx="6" cy="16" rx="5.5" ry="3.5" fill="#FFC21A"/>
      <ellipse cx="26" cy="16" rx="5.5" ry="3.5" fill="#FFC21A"/>
      <ellipse cx="9" cy="9" rx="3.5" ry="5.5" transform="rotate(-45 9 9)" fill="#E8512E"/>
      <ellipse cx="23" cy="23" rx="3.5" ry="5.5" transform="rotate(-45 23 23)" fill="#E8512E"/>
      <ellipse cx="23" cy="9" rx="3.5" ry="5.5" transform="rotate(45 23 9)" fill="#E8512E"/>
      <ellipse cx="9" cy="23" rx="3.5" ry="5.5" transform="rotate(45 9 23)" fill="#E8512E"/>
      <circle cx="16" cy="16" r="3" fill="#FFE28A"/>
    </svg>`,

    underline: `<svg viewBox="0 0 160 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <path d="M3 10C35 4 80 4 157 9C115 13 65 12 12 11" stroke="#FFC21A" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`,

    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>`,

    heartFilled: `<svg viewBox="0 0 24 24" fill="#D6336C" stroke="#D6336C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>`,

    external: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`,

    check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`,

    arrowRight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>`,

    waveDivider: `<div class="divider" aria-hidden="true">
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,0 C150,42 350,48 500,24 C650,0 850,44 1050,22 C1150,11 1200,32 1200,48 L1200,48 L0,48 Z"></path>
      </svg>
    </div>`,

    scallopDivider: `<div class="divider" aria-hidden="true">
      <svg viewBox="0 0 1200 36" preserveAspectRatio="none" fill="currentColor">
        <path d="M0,0 Q30,36 60,0 Q90,36 120,0 Q150,36 180,0 Q210,36 240,0 Q270,36 300,0 Q330,36 360,0 Q390,36 420,0 Q450,36 480,0 Q510,36 540,0 Q570,36 600,0 Q630,36 660,0 Q690,36 720,0 Q750,36 780,0 Q810,36 840,0 Q870,36 900,0 Q930,36 960,0 Q990,36 1020,0 Q1050,36 1080,0 Q1110,36 1140,0 Q1170,36 1200,0 L1200,36 L0,36 Z"></path>
      </svg>
    </div>`
  };

  // --- Storage Helper Functions ---
  const Storage = {
    getProfile() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    },
    saveProfile(profile) {
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      } catch (e) {
        console.warn("Could not save profile to localStorage", e);
      }
    },
    getSavedOpportunities() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.SAVED_OPPORTUNITIES);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },
    isSaved(id) {
      const saved = this.getSavedOpportunities();
      return saved.includes(id);
    },
    toggleSave(id) {
      let saved = this.getSavedOpportunities();
      let nowSaved = false;
      if (saved.includes(id)) {
        saved = saved.filter(item => item !== id);
        nowSaved = false;
      } else {
        saved.push(id);
        nowSaved = true;
      }
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_OPPORTUNITIES, JSON.stringify(saved));
      } catch (e) {
        console.warn("Could not update saved opportunities", e);
      }
      return nowSaved;
    },
    getTrackerProgress() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.TRACKER_PROGRESS);
        return data ? JSON.parse(data) : {};
      } catch (e) {
        return {};
      }
    },
    setTrackerProgress(id, stage) {
      const tracker = this.getTrackerProgress();
      tracker[id] = stage;
      try {
        localStorage.setItem(STORAGE_KEYS.TRACKER_PROGRESS, JSON.stringify(tracker));
      } catch (e) {
        // ignore
      }
    }
  };

  // Export Storage API to window.ReturnHerStorage
  window.ReturnHerStorage = Storage;

  // --- UI Toast & Sheet Modal Helpers ---
  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span style="width:24px;height:24px;display:inline-block;">${ICONS.marigold}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }
  window.showToast = showToast;

  function openSheet(title, bodyHtml) {
    const backdrop = document.getElementById("sheet-container");
    if (!backdrop) return;
    backdrop.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true">
        <div class="sheet-handle"></div>
        <button class="sheet-close-btn" onclick="window.closeSheet()" aria-label="${t('btn.close')}">&times;</button>
        <h3 style="margin-bottom: 16px;">${escapeHtml(title)}</h3>
        <div class="sheet-body">${bodyHtml}</div>
      </div>
    `;
    backdrop.style.display = "flex";
    backdrop.onclick = function (e) {
      if (e.target === backdrop) window.closeSheet();
    };
  }
  window.openSheet = openSheet;

  function closeSheet() {
    const backdrop = document.getElementById("sheet-container");
    if (backdrop) {
      backdrop.style.display = "none";
      backdrop.innerHTML = "";
    }
  }
  window.closeSheet = closeSheet;

  // Utility HTML escaper
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- Shared Layout Renderers ---
  function renderPrototypeBanner() {
    const bannerEl = document.getElementById("prototype-banner");
    if (!bannerEl) return;
    bannerEl.className = "prototype-banner";
    bannerEl.innerHTML = `
      <p>
        <strong>${t("notice.prototype")}</strong> &bull; ${t("notice.privacy")}
      </p>
    `;
  }

  function renderNavbar() {
    const navEl = document.getElementById("navbar");
    if (!navEl) return;
    const currentHash = window.location.hash || "#/home";
    const profile = Storage.getProfile();
    const currentLang = window.I18N.getLanguage();

    navEl.className = "navbar";
    navEl.innerHTML = `
      <div class="navbar-container">
        <a href="#/home" class="navbar-brand">
          <span class="brand-flower">${ICONS.marigold}</span>
          <span>${t("brand.name")}</span>
        </a>

        <ul class="navbar-links" id="navbar-links-list">
          <li><a href="#/home" class="${currentHash.startsWith('#/home') || currentHash === '' ? 'active' : ''}">${t("nav.home")}</a></li>
          <li><a href="#/explore" class="${currentHash.startsWith('#/explore') ? 'active' : ''}">${t("nav.explore")}</a></li>
          <li><a href="#/me" class="${currentHash.startsWith('#/me') ? 'active' : ''}">${t("nav.journey")}</a></li>
          <li><a href="#/kit" class="${currentHash.startsWith('#/kit') ? 'active' : ''}">${t("nav.kit")}</a></li>
        </ul>

        <div class="navbar-actions">
          <button class="lang-toggle-btn" id="lang-toggle-btn" title="${t('nav.toggle_language')}">
            ${currentLang === "en" ? "हिन्दी" : "English"}
          </button>

          ${
            profile
              ? `<a href="#/me" class="btn btn-sm btn-outline" style="border-radius: var(--radius-pill); font-size:15px;">
                  <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--color-vermilion); margin-right:4px;"></span>
                  ${escapeHtml(profile.name)}
                </a>`
              : `<a href="#/signin" class="btn btn-sm btn-primary">${t("nav.signin")}</a>`
          }

          <button class="navbar-hamburger" id="navbar-hamburger-btn" aria-label="Toggle navigation">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const next = currentLang === "en" ? "hi" : "en";
        window.I18N.setLanguage(next);
      });
    }

    const hamburgerBtn = document.getElementById("navbar-hamburger-btn");
    const linksList = document.getElementById("navbar-links-list");
    if (hamburgerBtn && linksList) {
      hamburgerBtn.addEventListener("click", () => {
        linksList.classList.toggle("open");
      });
    }
  }

  function renderFooter() {
    const footerEl = document.getElementById("footer");
    if (!footerEl) return;
    footerEl.className = "footer";
    footerEl.innerHTML = `
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-brand">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom: 12px;">
              <span style="width:36px; height:36px; display:inline-block;">${ICONS.marigold}</span>
              <h2>${t("brand.name")}</h2>
            </div>
            <p class="footer-tagline">“${t("tagline.footer")}”</p>
          </div>

          <ul class="footer-links">
            <li><strong>${t("tagline.strap")}</strong></li>
            <li><a href="#/home">${t("nav.home")}</a></li>
            <li><a href="#/explore">${t("nav.explore")}</a></li>
            <li><a href="#/start">${t("btn.start_onboarding")}</a></li>
            <li><a href="#/me">${t("nav.journey")}</a></li>
            <li><a href="#/kit">${t("nav.kit")}</a></li>
          </ul>
        </div>

        <div class="footer-bottom">
          <p>${t("notice.source")} &bull; ${t("notice.prototype")}</p>
          <p>${t("tagline.sakhi")} &copy; 2026 ReturnHer</p>
        </div>
      </div>
    `;
  }

  // --- Route Views ---

  // 1. Home View (#/home)
  function renderHome() {
    const app = document.getElementById("app-view");
    const profiles = window.PROFILES || [];

    app.innerHTML = `
      <!-- Hero Section (Forest) -->
      <section class="section section-forest" style="padding-bottom: 0;">
        <div class="container text-center" style="max-width: 900px; margin: 0 auto; padding-top: 32px; padding-bottom: 32px;">
          <div style="display:inline-flex; align-items:center; gap:8px; margin-bottom: 24px;" class="fade-up">
            <span style="width:28px; height:28px;">${ICONS.marigold}</span>
            <span class="tag tag--opportunity">${t("tagline.short")}</span>
          </div>

          <h1 class="fade-up" style="margin-bottom: 24px; color: var(--color-cream);">
            ${t("tagline.hero")}
          </h1>

          <p class="fade-up" style="font-size: 22px; color: rgba(255, 246, 229, 0.95); margin-bottom: 32px; max-width: 760px; margin-left: auto; margin-right: auto;">
            ${t("route.home.subtitle")}
          </p>

          <div class="fade-up" style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-bottom: 36px;">
            <a href="#/start" class="btn btn-on-dark">${t("btn.begin")} ${ICONS.arrowRight}</a>
            <a href="#/explore" class="btn btn-outline-dark">${t("btn.explore")}</a>
          </div>
        </div>

        <!-- Hero Crowd Banner Illustration (Slot) -->
        <div class="hero-crowd-wrapper fade-up" style="width: 100%; max-width: 1300px; margin: 0 auto; line-height: 0;">
          ${window.ART ? window.ART.slot("hero-crowd", "Hero banner of nine diverse Indian women of all ages beginning their next chapter", "hero-crowd-art") : ""}
        </div>

        <div style="color: var(--color-cream); margin-top: -2px;">
          ${ICONS.waveDivider}
        </div>
      </section>

      <!-- Pillars Section (Cream) -->
      <section class="section section-cream">
        <div class="container">
          <div class="text-center" style="margin-bottom: 48px; max-width: 720px; margin-left: auto; margin-right: auto;">
            <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.strap")}</span>
            <h2>${t("tagline.ways")}</h2>
          </div>

          <div class="grid-staggered">
            <!-- Education -->
            <div class="card shape-arch card--tilt-left block-behind block-behind--cobalt fade-up">
              <span class="tag tag--education" style="margin-bottom: 16px;">${t("pillar.education")}</span>
              <h3 style="margin-bottom: 12px; color: var(--color-cobalt); font-size: 26px;">
                ${t("tagline.edu")}
              </h3>
              <p style="margin-bottom: 20px;">${t("pillar.education.desc")}</p>
              <a href="#/explore?pillar=education" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- Certification -->
            <div class="card shape-leaf card--tilt-right block-behind block-behind--vermilion fade-up">
              <span class="tag tag--certification" style="margin-bottom: 16px;">${t("pillar.certification")}</span>
              <h3 style="margin-bottom: 12px; color: var(--color-vermilion); font-size: 26px;">
                ${t("tagline.cert")}
              </h3>
              <p style="margin-bottom: 20px;">${t("pillar.certification.desc")}</p>
              <a href="#/explore?pillar=certification" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- Opportunity -->
            <div class="card shape-leaf card--tilt-left block-behind block-behind--forest fade-up">
              <span class="tag tag--opportunity" style="margin-bottom: 16px;">${t("pillar.opportunity")}</span>
              <h3 style="margin-bottom: 12px; color: var(--color-forest); font-size: 26px;">
                ${t("tagline.opp")}
              </h3>
              <p style="margin-bottom: 20px;">${t("pillar.opportunity.desc")}</p>
              <a href="#/explore?pillar=opportunity" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- Support -->
            <div class="card shape-arch card--tilt-right block-behind block-behind--blush fade-up">
              <span class="tag tag--support" style="margin-bottom: 16px;">${t("pillar.support")}</span>
              <h3 style="margin-bottom: 12px; color: var(--color-forest); font-size: 26px;">
                ${t("tagline.support")}
              </h3>
              <p style="margin-bottom: 20px;">${t("pillar.support.desc")}</p>
              <a href="#/explore?pillar=support" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Women Section (Oat) -->
      <section class="section section-oat">
        <div class="container">
          <div style="margin-bottom: 44px; text-align: center;">
            <span class="tag" style="margin-bottom: 12px;">${t("tagline.how")}</span>
            <h2>${t("tagline.women")}</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; padding-top: 24px;">
            ${profiles
              .map(
                (p, idx) => {
                  const sceneSlot = p.id === "sunita" ? "scene-tailor" : p.id === "priya" ? "scene-scholar" : "scene-learner";
                  return `
              <div class="note fade-up" style="transform: rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'}); padding-top: 20px;">
                <!-- Illustration breakout over card edge -->
                <div style="margin: -40px -10px 10px -10px; max-height: 220px; overflow: visible;">
                  ${window.ART ? window.ART.slot(sceneSlot, p.name, "woman-scene-slot") : ""}
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <h3 style="font-size:24px; color: var(--color-forest);">${escapeHtml(p.name)}</h3>
                  <span class="tag">${escapeHtml(p.location)}</span>
                </div>
                <p style="font-size:16px; margin-bottom: 16px;">
                  <strong>${escapeHtml(p.educationLabel)}</strong><br>
                  ${escapeHtml(p.story)}
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 20px;">
                  ${p.skills.map(s => `<span class="chip" style="font-size:14px; padding:4px 10px;">${escapeHtml(s)}</span>`).join("")}
                </div>
                <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('${p.id}')">
                  ${t("btn.quick_profile")}: ${escapeHtml(p.name)} &rarr;
                </button>
              </div>
            `;
                }
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- Promise Section (Blush) -->
      <section class="section section-blush">
        <div class="container">
          <div class="layout-7-5">
            <div class="fade-up">
              <span class="tag tag--support" style="margin-bottom: 16px;">${t("tagline.sakhi")}</span>
              <h2 style="margin-bottom: 20px; color: var(--color-deep-forest);">${t("tagline.promise")}</h2>
              <p style="font-size: 20px; margin-bottom: 24px; line-height: 1.6;">
                ${t("notice.privacy")}
              </p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <span class="chip active">&bull; No Aadhaar needed</span>
                <span class="chip active">&bull; No phone number</span>
                <span class="chip active">&bull; 100% On-device storage</span>
              </div>
            </div>
            <div class="card shape-leaf card--forest fade-up" style="padding: 24px; text-align: center;">
              <div style="max-width: 200px; margin: 0 auto 16px;">
                ${window.ART ? window.ART.slot("sakhi", "Sakhi, your friendly guide waving in a marigold dupatta", "sakhi-avatar-slot") : ""}
              </div>
              <h4 style="margin-bottom: 10px; color: var(--color-marigold);">${t("tagline.sakhi")}</h4>
              <p style="font-size: 15px; line-height: 1.5; color: var(--color-cream); margin-bottom: 16px;">
                ${t("notice.prototype")}
              </p>
              <a href="#/explore" class="btn btn-sm btn-on-dark">${t("btn.explore")}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section (Marigold) with Framed Textile Panel -->
      <section class="section section-marigold">
        <div class="container text-center" style="max-width: 900px; margin: 0 auto;">
          <div style="margin-bottom: 32px; max-width: 760px; margin-left: auto; margin-right: auto;">
            ${window.ART ? window.ART.slot("cta-panel", "Textile panel with festive marigolds and paisleys", "cta-panel-decor") : ""}
          </div>
          <h2 class="fade-up" style="margin-bottom: 16px; color: var(--color-forest);">
            ${t("tagline.cta")}
          </h2>
          <p class="fade-up" style="font-size: 22px; color: var(--color-ink); margin-bottom: 32px;">
            ${t("tagline.cta-sub")}
          </p>
          <a href="#/start" class="btn btn-primary fade-up" style="font-size: 20px; padding: 18px 40px;">
            ${t("btn.begin")} ${ICONS.arrowRight}
          </a>
        </div>
      </section>
    `;
  }

  // 2. Explore View (#/explore)
  function renderExplore() {
    const app = document.getElementById("app-view");
    const opps = window.OPPORTUNITIES || [];

    // Parse query params if any
    const hashParts = window.location.hash.split("?");
    const params = new URLSearchParams(hashParts[1] || "");
    const activePillar = params.get("pillar") || "all";

    const filtered = activePillar === "all"
      ? opps
      : opps.filter(o => o.pillar === activePillar);

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container">
          <div style="margin-bottom: 36px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
              <div>
                <h1 style="font-size: clamp(34px, 5vw, 48px); margin-bottom: 12px;">${t("route.explore.title")}</h1>
                <p style="font-size: 20px; color: var(--color-ink);">${t("route.explore.desc")}</p>
              </div>
              <a href="#/start" class="btn btn-sm btn-primary">${t("btn.start_onboarding")}</a>
            </div>

            <!-- Filter Chips -->
            <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top: 24px;">
              <a href="#/explore" class="chip ${activePillar === 'all' ? 'active' : ''}">${t("route.explore.filter_all")} (${opps.length})</a>
              <a href="#/explore?pillar=education" class="chip ${activePillar === 'education' ? 'active' : ''}">${t("pillar.education")}</a>
              <a href="#/explore?pillar=certification" class="chip ${activePillar === 'certification' ? 'active' : ''}">${t("pillar.certification")}</a>
              <a href="#/explore?pillar=opportunity" class="chip ${activePillar === 'opportunity' ? 'active' : ''}">${t("pillar.opportunity")}</a>
              <a href="#/explore?pillar=support" class="chip ${activePillar === 'support' ? 'active' : ''}">${t("pillar.support")}</a>
            </div>
          </div>

          <!-- Opportunities List Grid -->
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;">
            ${filtered
              .map(o => {
                const isSaved = Storage.isSaved(o.id);
                return `
                <div class="card shape-arch block-behind block-behind--${o.pillar === 'education' ? 'cobalt' : o.pillar === 'certification' ? 'vermilion' : o.pillar === 'opportunity' ? 'forest' : 'blush'} fade-up">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 14px;">
                    <span class="tag tag--${o.pillar}">${t(`pillar.${o.pillar}`)}</span>
                    <button class="heart-btn ${isSaved ? 'saved' : ''}" onclick="window.toggleSaveOpportunity('${o.id}')" aria-label="${isSaved ? t('btn.remove_save') : t('btn.save')}">
                      ${isSaved ? ICONS.heartFilled : ICONS.heart}
                    </button>
                  </div>

                  <h3 style="font-size: 22px; margin-bottom: 10px; min-height: 54px;">
                    <a href="#/opportunity/${o.id}">${escapeHtml(o.title)}</a>
                  </h3>

                  <p style="font-size: 15px; color: #555; margin-bottom: 12px;">
                    ${escapeHtml(o.department)}
                  </p>

                  <p style="font-size: 16px; margin-bottom: 16px; line-height: 1.5;">
                    ${escapeHtml(o.whatYouGet)}
                  </p>

                  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 20px;">
                    <span class="tag">${t(`tag.edu.${o.minEducation}`)}</span>
                    <span class="tag">${t(`tag.mode.${o.mode}`)}</span>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; border-top:1px solid #ddd; padding-top:16px;">
                    <a href="#/opportunity/${o.id}" class="btn btn-sm btn-primary">${t("btn.view_details")}</a>
                    <a href="${o.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size:14px; gap:4px;">
                      Official ${ICONS.external}
                    </a>
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  // 3. Opportunity Detail View (#/opportunity/:id)
  function renderOpportunity(id) {
    const app = document.getElementById("app-view");
    const opps = window.OPPORTUNITIES || [];
    const opp = opps.find(o => o.id === id);

    if (!opp) {
      app.innerHTML = `
        <section class="section section-cream">
          <div class="container text-center" style="padding: 60px 0;">
            <h2>Opportunity Not Found</h2>
            <p style="margin: 20px 0;">We could not find the opportunity you are looking for.</p>
            <a href="#/explore" class="btn btn-primary">${t("btn.explore")}</a>
          </div>
        </section>
      `;
      return;
    }

    const isSaved = Storage.isSaved(opp.id);

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container" style="max-width: 900px;">
          <div style="margin-bottom: 24px;">
            <a href="#/explore" class="btn btn-sm btn-outline">&larr; ${t("btn.back")}</a>
          </div>

          <div class="card shape-arch block-behind block-behind--${opp.pillar === 'education' ? 'cobalt' : opp.pillar === 'certification' ? 'vermilion' : opp.pillar === 'opportunity' ? 'forest' : 'blush'} fade-up" style="padding: 40px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 20px; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; gap:10px; align-items:center;">
                <span class="tag tag--${opp.pillar}">${t(`pillar.${opp.pillar}`)}</span>
                <span class="tag">${t(`tag.edu.${opp.minEducation}`)}</span>
                <span class="tag">${t(`tag.mode.${opp.mode}`)}</span>
              </div>
              <button class="btn btn-sm ${isSaved ? 'btn-marigold' : 'btn-outline'}" onclick="window.toggleSaveOpportunity('${opp.id}')">
                ${isSaved ? ICONS.heartFilled : ICONS.heart} ${isSaved ? t("btn.saved") : t("btn.save")}
              </button>
            </div>

            <h1 style="font-size: clamp(30px, 4.5vw, 44px); margin-bottom: 12px;">${escapeHtml(opp.title)}</h1>
            <p style="font-size: 18px; color: var(--color-forest); font-weight: 600; margin-bottom: 24px;">
              ${escapeHtml(opp.department)} &bull; ${escapeHtml(opp.type)}
            </p>

            <div style="background-color: var(--color-oat); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <h3 style="font-size: 20px; margin-bottom: 10px;">${t("route.opportunity.what_you_get")}</h3>
              <p style="font-size: 18px; line-height: 1.6;">${escapeHtml(opp.whatYouGet)}</p>
            </div>

            <!-- Indicative Eligibility -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 22px; margin-bottom: 16px;">${t("route.opportunity.eligibility")}</h3>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
                ${opp.eligibilityQuestions.map(q => `
                  <li style="display:flex; align-items:flex-start; gap:12px; background: #fff; padding: 14px 18px; border-radius: 12px; border: 1.5px solid #E2D9C8;">
                    <span style="color:var(--color-forest);">${ICONS.check}</span>
                    <span>${escapeHtml(q)}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Documents -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 22px; margin-bottom: 16px;">${t("route.opportunity.documents")}</h3>
              <ul style="padding-left: 24px; display:flex; flex-direction:column; gap:8px;">
                ${opp.documents.map(d => `<li>${escapeHtml(d)}</li>`).join("")}
              </ul>
            </div>

            <!-- Steps -->
            <div style="margin-bottom: 36px;">
              <h3 style="font-size: 22px; margin-bottom: 16px;">${t("route.opportunity.steps")}</h3>
              <ol style="padding-left: 24px; display:flex; flex-direction:column; gap:12px;">
                ${opp.steps.map(s => `<li style="line-height:1.6;">${escapeHtml(s)}</li>`).join("")}
              </ol>
            </div>

            <!-- Official Website Notice & Actions -->
            <div style="background-color: var(--color-cream); border: 2px dashed var(--color-ink); border-radius: 16px; padding: 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
              <div>
                <strong style="display:block; font-size:18px;">${t("route.opportunity.official_link")}</strong>
                <span style="font-size:15px; color:#555;">${escapeHtml(opp.officialUrl)}</span><br>
                <small style="color:var(--color-forest); font-weight:600;">${escapeHtml(opp.lastVerified)}</small>
              </div>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                <a href="#/apply/${opp.id}" class="btn btn-outline">${t("btn.apply_guide")}</a>
                <a href="${opp.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                  ${t("btn.visit_official")} ${ICONS.external}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 4. Start / Onboarding View (#/start)
  function renderStart() {
    const app = document.getElementById("app-view");
    const profile = Storage.getProfile() || {
      name: "",
      education: "class10",
      skills: "",
      goal: "learn-skill",
      district: "",
      state: "Uttar Pradesh"
    };

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container" style="max-width: 800px;">
          <div class="text-center" style="margin-bottom: 36px;">
            <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.sakhi")}</span>
            <h1>${t("route.start.title")}</h1>
            <p style="font-size: 20px; color: var(--color-ink); margin-top: 12px;">${t("route.start.desc")}</p>
          </div>

          <div class="card shape-arch block-behind block-behind--forest fade-up" style="padding: 40px;">
            <form id="onboarding-form">
              <div style="margin-bottom: 24px;">
                <label for="form-name" style="display:block; font-weight:700; margin-bottom:8px;">First Name</label>
                <input id="form-name" type="text" value="${escapeHtml(profile.name)}" placeholder="e.g. Sunita" required style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit;">
              </div>

              <div style="margin-bottom: 24px;">
                <label for="form-education" style="display:block; font-weight:700; margin-bottom:8px;">${t("route.start.step1")}</label>
                <select id="form-education" style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit; background:#fff;">
                  <option value="class10" ${profile.education === 'class10' ? 'selected' : ''}>Class 10 (Secondary)</option>
                  <option value="class12" ${profile.education === 'class12' ? 'selected' : ''}>Class 12 (Senior Secondary)</option>
                  <option value="graduate" ${profile.education === 'graduate' ? 'selected' : ''}>Graduate / Bachelor's Degree</option>
                  <option value="postgraduate" ${profile.education === 'postgraduate' ? 'selected' : ''}>Postgraduate / Master's Degree</option>
                </select>
              </div>

              <div style="margin-bottom: 24px;">
                <label for="form-skills" style="display:block; font-weight:700; margin-bottom:8px;">${t("route.start.step2")}</label>
                <input id="form-skills" type="text" value="${escapeHtml(Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || '')}" placeholder="e.g. tailoring, embroidery, computers, teaching" style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit;">
              </div>

              <div style="margin-bottom: 24px;">
                <label for="form-goal" style="display:block; font-weight:700; margin-bottom:8px;">${t("route.start.step3")}</label>
                <select id="form-goal" style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit; background:#fff;">
                  <option value="learn-skill" ${profile.goal === 'learn-skill' ? 'selected' : ''}>Learn a new craft or trade</option>
                  <option value="certify-skill" ${profile.goal === 'certify-skill' ? 'selected' : ''}>Get certified for skills I already know</option>
                  <option value="finish-education" ${profile.goal === 'finish-education' ? 'selected' : ''}>Complete my degree or schooling</option>
                  <option value="research-phd" ${profile.goal === 'research-phd' ? 'selected' : ''}>Pursue PhD / Research with fellowship</option>
                  <option value="teach-others" ${profile.goal === 'teach-others' ? 'selected' : ''}>Teach others / Become a trainer</option>
                  <option value="start-business" ${profile.goal === 'start-business' ? 'selected' : ''}>Start a small business / workshop</option>
                  <option value="earn-from-home" ${profile.goal === 'earn-from-home' ? 'selected' : ''}>Earn flexibly from home</option>
                </select>
              </div>

              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom: 32px;">
                <div>
                  <label for="form-district" style="display:block; font-weight:700; margin-bottom:8px;">District</label>
                  <input id="form-district" type="text" value="${escapeHtml(profile.district || '')}" placeholder="e.g. Meerut, Lucknow" style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit;">
                </div>
                <div>
                  <label for="form-state" style="display:block; font-weight:700; margin-bottom:8px;">State</label>
                  <input id="form-state" type="text" value="${escapeHtml(profile.state || 'Uttar Pradesh')}" placeholder="e.g. Uttar Pradesh" style="width:100%; padding:14px; border:2px solid var(--color-ink); border-radius:12px; font-size:18px; font-family:inherit;">
                </div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                <button type="submit" class="btn btn-primary" style="padding:16px 36px; font-size:20px;">
                  Map My Pathway ${ICONS.arrowRight}
                </button>
                <div style="display:flex; gap:8px;">
                  <button type="button" class="btn btn-sm btn-outline" onclick="window.loadDemoProfile('sunita')">Try Sunita</button>
                  <button type="button" class="btn btn-sm btn-outline" onclick="window.loadDemoProfile('priya')">Try Priya</button>
                  <button type="button" class="btn btn-sm btn-outline" onclick="window.loadDemoProfile('anjali')">Try Anjali</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;

    const form = document.getElementById("onboarding-form");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const updatedProfile = {
          name: document.getElementById("form-name").value.trim(),
          education: document.getElementById("form-education").value,
          skills: document.getElementById("form-skills").value.split(",").map(s => s.trim()).filter(Boolean),
          goal: document.getElementById("form-goal").value,
          district: document.getElementById("form-district").value.trim(),
          state: document.getElementById("form-state").value.trim()
        };
        Storage.saveProfile(updatedProfile);
        showToast(t("toast.profile_loaded"));
        renderNavbar();
        window.location.hash = "#/path";
      });
    }
  }

  // 5. Personal Pathway View (#/path)
  function renderPath() {
    const app = document.getElementById("app-view");
    const profile = Storage.getProfile();
    const opps = window.OPPORTUNITIES || [];

    if (!profile) {
      app.innerHTML = `
        <section class="section section-cream">
          <div class="container text-center" style="padding: 60px 0;">
            <h2>${t("route.path.title")}</h2>
            <p style="margin: 20px 0;">Please answer a few gentle questions first so we can map your pathway.</p>
            <a href="#/start" class="btn btn-primary">${t("btn.start_onboarding")}</a>
          </div>
        </section>
      `;
      return;
    }

    // Match opportunities based on education or goal
    const matched = opps.filter(o => {
      const matchGoal = o.goalTags && o.goalTags.includes(profile.goal);
      const matchEdu = o.minEducation === profile.education;
      return matchGoal || matchEdu;
    });

    const displayOpps = matched.length > 0 ? matched : opps.slice(0, 4);

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container">
          <div style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
              <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.sakhi")}</span>
              <h1>${escapeHtml(profile.name)}'s ${t("route.path.title")}</h1>
              <p style="font-size: 20px; color: var(--color-ink); margin-top: 8px;">
                ${escapeHtml(profile.district || profile.location || 'India')}, ${escapeHtml(profile.state || '')} &bull; Goal: ${escapeHtml(profile.goal)}
              </p>
            </div>
            <a href="#/start" class="btn btn-sm btn-outline">Update Profile</a>
          </div>

          <div style="display:flex; flex-direction:column; gap: 32px;">
            ${displayOpps
              .map((o, idx) => `
              <div class="card shape-arch block-behind block-behind--${o.pillar === 'education' ? 'cobalt' : o.pillar === 'certification' ? 'vermilion' : o.pillar === 'opportunity' ? 'forest' : 'marigold'} fade-up">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; gap:10px; align-items:center;">
                    <span class="tag tag--${o.pillar}">Step ${idx + 1}: ${t(`pillar.${o.pillar}`)}</span>
                    <span class="tag">${t(`tag.edu.${o.minEducation}`)}</span>
                  </div>
                  <button class="heart-btn ${Storage.isSaved(o.id) ? 'saved' : ''}" onclick="window.toggleSaveOpportunity('${o.id}')">
                    ${Storage.isSaved(o.id) ? ICONS.heartFilled : ICONS.heart}
                  </button>
                </div>

                <h3 style="font-size: 24px; margin-bottom: 8px;">
                  <a href="#/opportunity/${o.id}">${escapeHtml(o.title)}</a>
                </h3>
                <p style="font-size: 17px; margin-bottom: 16px; line-height: 1.5;">${escapeHtml(o.whatYouGet)}</p>

                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                  <a href="#/opportunity/${o.id}" class="btn btn-sm btn-primary">${t("btn.view_details")}</a>
                  <a href="#/apply/${o.id}" class="btn btn-sm btn-outline">${t("btn.apply_guide")}</a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  // 6. Application Guide View (#/apply/:id)
  function renderApply(id) {
    const app = document.getElementById("app-view");
    const opps = window.OPPORTUNITIES || [];
    const opp = opps.find(o => o.id === id) || opps[0];

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container" style="max-width: 860px;">
          <div style="margin-bottom: 24px;">
            <a href="#/opportunity/${opp.id}" class="btn btn-sm btn-outline">&larr; ${t("btn.back")}</a>
          </div>

          <div class="card shape-arch block-behind block-behind--forest fade-up" style="padding: 40px;">
            <span class="tag tag--support" style="margin-bottom: 14px;">${t("tagline.sakhi")}</span>
            <h1 style="font-size: clamp(30px, 4vw, 42px); margin-bottom: 12px;">${t("route.apply.title")}</h1>
            <h3 style="color: var(--color-forest); font-size: 22px; margin-bottom: 24px;">${escapeHtml(opp.title)}</h3>

            <div style="background-color: var(--color-oat); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <h4 style="margin-bottom: 12px;">Before You Visit The Portal:</h4>
              <p style="font-size: 17px; margin-bottom: 16px;">Check off the items you have ready on your phone or in hand:</p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
                ${opp.documents.map((doc, idx) => `
                  <li style="display:flex; align-items:center; gap:12px;">
                    <input type="checkbox" id="check-doc-${idx}" style="width:20px; height:20px;">
                    <label for="check-doc-${idx}" style="font-size:17px; cursor:pointer;">${escapeHtml(doc)}</label>
                  </li>
                `).join("")}
              </ul>
            </div>

            <div style="margin-bottom: 32px;">
              <h4 style="margin-bottom: 16px;">Application Sequence:</h4>
              <ol style="padding-left: 24px; display:flex; flex-direction:column; gap:12px;">
                ${opp.steps.map(step => `<li style="line-height:1.6;">${escapeHtml(step)}</li>`).join("")}
              </ol>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
              <button class="btn btn-outline" onclick="window.showToast('Checklist saved to device!')">
                ${t("btn.download_summary")}
              </button>
              <a href="${opp.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                ${t("btn.visit_official")} ${ICONS.external}
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 7. My Journey Dashboard (#/me)
  function renderMe() {
    const app = document.getElementById("app-view");
    const profile = Storage.getProfile();
    const savedIds = Storage.getSavedOpportunities();
    const opps = window.OPPORTUNITIES || [];
    const savedOpps = opps.filter(o => savedIds.includes(o.id));

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container">
          <div style="margin-bottom: 36px; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
              <h1>${t("route.me.title")}</h1>
              <p style="font-size: 20px; color: var(--color-ink);">${t("route.me.desc")}</p>
            </div>
            <a href="#/start" class="btn btn-sm btn-outline">${profile ? 'Edit Profile' : 'Set Profile'}</a>
          </div>

          <!-- Active Profile Card -->
          <div class="note fade-up" style="margin-bottom: 40px; transform: rotate(-0.5deg);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; flex-wrap:wrap; gap:12px;">
              <h3 style="font-size: 24px; color: var(--color-forest);">
                ${profile ? escapeHtml(profile.name) : 'Guest Visitor'}
              </h3>
              <span class="tag tag--support">${t("notice.privacy")}</span>
            </div>
            <p style="font-size: 16px;">
              ${
                profile
                  ? `Location: <strong>${escapeHtml(profile.district || profile.location || 'Not set')}, ${escapeHtml(profile.state || '')}</strong> &bull; Education: <strong>${escapeHtml(profile.education || 'Class 10')}</strong>`
                  : 'No active profile found. You can try a sample profile below or map your own journey.'
              }
            </p>
            <div style="margin-top: 14px; display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('sunita')">Load Sunita (Tailoring)</button>
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('priya')">Load Priya (PhD)</button>
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('anjali')">Load Anjali (Class 12)</button>
            </div>
          </div>

          <!-- Saved Opportunities Section -->
          <div style="margin-bottom: 24px;">
            <h2>${t("route.me.saved_count")} (${savedOpps.length})</h2>
          </div>

          ${
            savedOpps.length === 0
              ? `
              <div class="card shape-arch fade-up text-center" style="padding: 48px 24px; background-color: var(--color-oat);">
                <p style="font-size: 20px; margin-bottom: 20px;">${t("route.me.no_saved")}</p>
                <a href="#/explore" class="btn btn-primary">${t("btn.explore")}</a>
              </div>
            `
              : `
              <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px;">
                ${savedOpps
                  .map(
                    o => `
                  <div class="card shape-arch block-behind block-behind--${o.pillar === 'education' ? 'cobalt' : o.pillar === 'certification' ? 'vermilion' : o.pillar === 'opportunity' ? 'forest' : 'marigold'} fade-up">
                    <div style="display:flex; justify-content:space-between; margin-bottom: 12px;">
                      <span class="tag tag--${o.pillar}">${t(`pillar.${o.pillar}`)}</span>
                      <button class="heart-btn saved" onclick="window.toggleSaveOpportunity('${o.id}')">
                        ${ICONS.heartFilled}
                      </button>
                    </div>
                    <h3 style="font-size: 20px; margin-bottom: 8px;">
                      <a href="#/opportunity/${o.id}">${escapeHtml(o.title)}</a>
                    </h3>
                    <p style="font-size: 15px; margin-bottom: 16px; line-height: 1.5;">${escapeHtml(o.whatYouGet)}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <a href="#/opportunity/${o.id}" class="btn btn-sm btn-primary">${t("btn.view_details")}</a>
                      <a href="#/apply/${o.id}" class="btn btn-sm btn-outline">${t("btn.apply_guide")}</a>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
          }
        </div>
      </section>
    `;
  }

  // 8. Sakhi Toolkit View (#/kit) - Illustration Kit & Cultural Design System Review
  function renderKit() {
    const app = document.getElementById("app-view");
    const ART = window.ART;

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container">
          <div class="text-center" style="margin-bottom: 48px;">
            <span class="tag tag--opportunity" style="margin-bottom: 12px;">${t("tagline.sakhi")}</span>
            <h1 style="margin-bottom: 12px;">Sakhi Illustration Kit & Review Board</h1>
            <p style="font-size: 20px; color: var(--color-ink); max-width: 780px; margin: 0 auto;">
              Complete vector art system generated entirely by code per <strong>BRIEF.md v2</strong>.
              Review every figure, prop, cultural motif, narrative scene, the hero crowd, and the framed textile panel on calm cream.
            </p>
          </div>

          <!-- SECTION 1: THE HERO CROWD -->
          <div class="card shape-arch block-behind block-behind--forest fade-up" style="padding: 36px 24px; margin-bottom: 56px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
              <div>
                <span class="tag tag--support">Wide Composition (1440x520)</span>
                <h2 style="font-size: 28px; margin-top: 6px;">1. The Crowd (hero-crowd)</h2>
              </div>
              <p style="font-size: 15px; color: #555; max-width: 480px;">
                Nine overlapping women of all ages in two layers. Includes Sunita (needle), Priya (books & cap), Anjali (laptop), elder with cane, woman in wheelchair, and laughing friends. Click Sunita, Priya, or Anjali to view profile.
              </p>
            </div>

            <div style="background-color: var(--color-cream); border: 2px solid var(--color-ink); border-radius: 20px; overflow: hidden; padding: 12px 0;">
              ${ART ? ART.slot("hero-crowd", "Nine diverse Indian women of all ages beginning their next chapter", "crowd-review-slot") : ""}
            </div>
          </div>

          <!-- SECTION 2: THE 7 NARRATIVE SCENES -->
          <div style="margin-bottom: 56px;">
            <div style="margin-bottom: 24px;">
              <span class="tag tag--certification">Narrative Scenes (320x320)</span>
              <h2 style="font-size: 32px; margin-top: 8px;">2. Character Scenes Gallery</h2>
              <p style="font-size: 18px; color: var(--color-ink);">Each scene pairs a woman, an active prop, an organic blob, and 3 cultural motifs with overflow visible.</p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px;">
              <!-- Scene 1: Tailor -->
              <div class="card shape-arch block-behind block-behind--vermilion fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-tailor", "Woman at sewing machine holding up certificate", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--certification">scene-tailor</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Master Tailor & Certificate</h3>
                  <p style="font-size: 15px; color: #555;">Sunita at her sewing machine holding up trade certificate.</p>
                </div>
              </div>

              <!-- Scene 2: Scholar -->
              <div class="card shape-leaf block-behind block-behind--cobalt fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-scholar", "Woman scholar in graduation gown with books and flask", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--education">scene-scholar</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Scholar & Research Fellow</h3>
                  <p style="font-size: 15px; color: #555;">Priya in academic gown with research books and lab flask.</p>
                </div>
              </div>

              <!-- Scene 3: Learner -->
              <div class="card shape-arch block-behind block-behind--forest fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-learner", "Woman studying on laptop, sitting on doorstep", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--opportunity">scene-learner</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Learner on Doorstep</h3>
                  <p style="font-size: 15px; color: #555;">Anjali on courtyard doorstep with open laptop and tea.</p>
                </div>
              </div>

              <!-- Scene 4: Teacher -->
              <div class="card shape-leaf block-behind block-behind--blush fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-teacher", "Woman teaching a small group of women", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--support">scene-teacher</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Vocational Educator</h3>
                  <p style="font-size: 15px; color: #555;">Master teacher instructing community women with slate.</p>
                </div>
              </div>

              <!-- Scene 5: Entrepreneur -->
              <div class="card shape-arch block-behind block-behind--marigold fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-entrepreneur", "Woman at her market stall, smiling", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--opportunity">scene-entrepreneur</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Micro-Enterprise Owner</h3>
                  <p style="font-size: 15px; color: #555;">Confident entrepreneur at her striped market shop stall.</p>
                </div>
              </div>

              <!-- Scene 6: Home Earner -->
              <div class="card shape-leaf block-behind block-behind--cobalt fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-homeEarner", "Woman working from home with laptop and chai", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--certification">scene-homeEarner</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Flexible Home Earner</h3>
                  <p style="font-size: 15px; color: #555;">Woman cross-legged with laptop, chowki desk, and chai.</p>
                </div>
              </div>

              <!-- Scene 7: Doorway -->
              <div class="card shape-arch block-behind block-behind--forest fade-up">
                <div style="height: 280px; overflow: visible; display:flex; align-items:center; justify-content:center;">
                  ${ART ? ART.slot("scene-doorway", "Woman stepping through courtyard gateway", "scene-thumb") : ""}
                </div>
                <div style="border-top: 1.5px solid #ddd; padding-top: 16px; margin-top: 12px;">
                  <span class="tag tag--support">scene-doorway</span>
                  <h3 style="font-size: 20px; margin-top: 8px;">Courtyard Doorway</h3>
                  <p style="font-size: 15px; color: #555;">Stepping across the threshold into new opportunities.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 3: WOMEN FIGURES & PROPS DIVERSITY -->
          <div style="margin-bottom: 56px;">
            <div style="margin-bottom: 24px;">
              <span class="tag tag--support">Figure Generator (ART.woman)</span>
              <h2 style="font-size: 32px; margin-top: 8px;">3. Women Diversity & Props System</h2>
              <p style="font-size: 18px; color: var(--color-ink);">All 6 skin tones, hairstyles, props, and garments from BRIEF.md (never childlike, adult & dignified).</p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px;">
              <!-- Figure 1 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(-1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#E0A877", hair: "#1B1210", hairStyle: "braid", top: "#0E4B33", bottom: "saree", prop: "needle", accessory: "bangles" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Sunita (Tailor)</h4>
                <small style="color:#555;">Tone 2 &bull; Saree &bull; Needle &bull; Braid</small>
              </div>

              <!-- Figure 2 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#C08052", hair: "#3A2418", hairStyle: "bun", top: "#2B59D9", bottom: "salwar", prop: "books", accessory: "glasses", pose: "hold-up" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Priya (Scholar)</h4>
                <small style="color:#555;">Tone 3 &bull; Salwar &bull; Books &bull; Glasses</small>
              </div>

              <!-- Figure 3 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(-1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#F3D0B0", hair: "#6B3F25", hairStyle: "curls", top: "#D2401F", bottom: "jeans", prop: "notebook", pose: "wave" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Anjali (Learner)</h4>
                <small style="color:#555;">Tone 1 &bull; Jeans &bull; Notebook &bull; Curls</small>
              </div>

              <!-- Figure 4 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#94603A", hair: "#B9B4AE", hairStyle: "grey-bun", top: "#0E4B33", bottom: "saree", accessory: "cane" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Elder Mentor</h4>
                <small style="color:#555;">Tone 4 &bull; Grey Bun &bull; Cane &bull; Saree</small>
              </div>

              <!-- Figure 5 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(-1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#6B4228", hair: "#1B1210", hairStyle: "short", top: "#FFC21A", bottom: "salwar", prop: "laptop", accessory: "hearing-aid" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Tech Specialist</h4>
                <small style="color:#555;">Tone 5 &bull; Short &bull; Laptop &bull; Hearing Aid</small>
              </div>

              <!-- Figure 6 -->
              <div class="note fade-up" style="text-align: center; transform: rotate(1deg);">
                <div style="height: 220px;">
                  ${ART ? ART.woman({ skin: "#46291A", hair: "#1B1210", hairStyle: "long", top: "#D6336C", bottom: "saree", prop: "certificate", pose: "hold-up" }) : ""}
                </div>
                <h4 style="font-size: 18px; margin-top: 12px;">Graduate Artisan</h4>
                <small style="color:#555;">Tone 6 &bull; Long &bull; Certificate &bull; Saree</small>
              </div>
            </div>
          </div>

          <!-- SECTION 4: INDIAN CULTURAL DECORATIVE MOTIFS -->
          <div class="card shape-arch block-behind block-behind--cobalt fade-up" style="padding: 36px; margin-bottom: 56px;">
            <div style="margin-bottom: 24px;">
              <span class="tag tag--education">Indian Motifs (ART.decor)</span>
              <h2 style="font-size: 32px; margin-top: 8px;">4. Decorative Cultural Motifs</h2>
              <p style="font-size: 18px; color: var(--color-ink);">Rooted in festival courtyards (marigolds, paisleys, bangles, rangoli). <strong>Strictly no 4-point stars, no AI robots.</strong></p>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 20px; text-align: center;">
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("marigold", { size: 52 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Marigold</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("paisley", { size: 48 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Paisley (Kairi)</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("lotus", { size: 48 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Lotus</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("bangles", { size: 50 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Bangles</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("rangoli", { size: 48 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Rangoli</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("sun", { size: 50 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Sun Rays</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("squiggle", { size: 60 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Squiggle</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("hatch", { size: 44 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Textile Hatch</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("leaf", { size: 44 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Peepal Leaf</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("bird", { size: 50 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Dove Bird</strong>
              </div>
              <div style="background:#FFFDF4; border:1.5px solid #D8CEB9; border-radius:16px; padding:16px 8px;">
                <div style="height:60px; display:flex; align-items:center; justify-content:center;">${ART ? ART.decor("bloom", { size: 52 }) : ""}</div>
                <strong style="font-size:15px; display:block; margin-top:8px;">Save Bloom</strong>
              </div>
            </div>
          </div>

          <!-- SECTION 5: TEXTILE CTA PANEL -->
          <div class="card shape-arch block-behind block-behind--vermilion fade-up" style="padding: 36px 24px; margin-bottom: 56px;">
            <div style="margin-bottom: 20px;">
              <span class="tag tag--certification">Textile Panel (1100x420)</span>
              <h2 style="font-size: 28px; margin-top: 6px;">5. Framed Indian Textile Panel (cta-panel)</h2>
              <p style="font-size: 16px; color: #555;">Forest base with marigolds and paisleys breaking outside the border.</p>
            </div>
            <div style="background: #FFF6E5; border: 2px solid var(--color-ink); border-radius: 20px; overflow: visible; padding: 16px;">
              ${ART ? ART.slot("cta-panel", "Framed textile panel with festive marigolds and paisleys", "cta-panel-review") : ""}
            </div>
          </div>

          <!-- SECTION 6: SAKHI AVATAR & HAND-DRAWN MARKS -->
          <div class="layout-7-5" style="margin-bottom: 56px;">
            <!-- Sakhi Avatar -->
            <div class="card shape-arch block-behind block-behind--marigold fade-up" style="padding: 32px; text-align: center;">
              <span class="tag tag--opportunity" style="margin-bottom: 12px;">Sakhi Avatar (sakhi)</span>
              <h3 style="margin-bottom: 16px;">6. Sakhi Guide Avatar</h3>
              <div style="max-width: 180px; margin: 0 auto 16px;">
                ${ART ? ART.slot("sakhi", "Sakhi, friendly woman in marigold dupatta waving hello", "sakhi-slot-review") : ""}
              </div>
              <p style="font-size: 16px; color: #555;">Warm companion with marigold dupatta, smiling and waving.</p>
            </div>

            <!-- Hand-drawn Marks -->
            <div class="card shape-leaf block-behind block-behind--blush fade-up" style="padding: 32px;">
              <span class="tag tag--support" style="margin-bottom: 12px;">Editorial Marks (ART.hand)</span>
              <h3 style="margin-bottom: 16px;">7. Hand-Drawn Marks</h3>
              <div style="display:flex; flex-direction:column; gap: 20px;">
                <div>
                  <span style="font-size: 15px; color:#555;">Underline mark:</span>
                  <div style="width: 200px; margin-top: 6px;">${ART ? ART.hand.underline("#FFC21A") : ""}</div>
                </div>
                <div>
                  <span style="font-size: 15px; color:#555;">Circle highlight mark:</span>
                  <div style="width: 140px; height: 50px; margin-top: 6px;">${ART ? ART.hand.circle("#D2401F") : ""}</div>
                </div>
                <div>
                  <span style="font-size: 15px; color:#555;">Dotted direction arrow:</span>
                  <div style="margin-top: 6px;">${ART ? ART.hand.arrowDotted("#0E4B33") : ""}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 7: SAKHI COMMUNITY OFFLINE TOOLKIT -->
          <div class="card shape-arch block-behind block-behind--forest fade-up" style="padding: 36px; margin-bottom: 40px;">
            <span class="tag tag--support" style="margin-bottom: 12px;">Community Kit</span>
            <h2 style="font-size: 28px; margin-bottom: 16px;">8. Official Helplines & Community Access</h2>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 24px;">
              <div style="background:#fff; border:1.5px solid #D8CEB9; border-radius:14px; padding:20px;">
                <h4 style="color:var(--color-forest); margin-bottom:8px;">Women Helpline</h4>
                <p style="font-size:24px; font-weight:800; color:var(--color-vermilion); margin-bottom:4px;">181</p>
                <small style="color:#555;">Toll-free 24x7 pan-India emergency and support</small>
              </div>
              <div style="background:#fff; border:1.5px solid #D8CEB9; border-radius:14px; padding:20px;">
                <h4 style="color:var(--color-forest); margin-bottom:8px;">National Career Service</h4>
                <p style="font-size:24px; font-weight:800; color:var(--color-cobalt); margin-bottom:4px;">1514</p>
                <small style="color:#555;">Ministry of Labour & Employment helpline</small>
              </div>
              <div style="background:#fff; border:1.5px solid #D8CEB9; border-radius:14px; padding:20px;">
                <h4 style="color:var(--color-forest); margin-bottom:8px;">Skill India Digital</h4>
                <p style="font-size:24px; font-weight:800; color:var(--color-forest); margin-bottom:4px;">088000-55555</p>
                <small style="color:#555;">MSDE Jan Shikshan Sansthan & RPL queries</small>
              </div>
            </div>
            <button class="btn btn-primary" onclick="window.showToast('Offline summary package saved to device!')">
              ${t("btn.download_summary")}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  // 9. Sign In / Demo Profile View (#/signin)
  function renderSignin() {
    const app = document.getElementById("app-view");
    const profiles = window.PROFILES || [];

    app.innerHTML = `
      <section class="section section-cream">
        <div class="container" style="max-width: 800px;">
          <div class="text-center" style="margin-bottom: 36px;">
            <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.sakhi")}</span>
            <h1>${t("route.signin.title")}</h1>
            <p style="font-size: 20px; color: var(--color-ink); margin-top: 12px;">${t("route.signin.desc")}</p>
          </div>

          <div class="card shape-arch block-behind block-behind--forest fade-up" style="padding: 36px; margin-bottom: 36px;">
            <h3 style="font-size: 22px; margin-bottom: 16px;">Quick Hackathon Demo Profiles:</h3>
            <p style="font-size: 16px; margin-bottom: 20px;">Select any of the 3 real-world profiles from the brief to demo personalized pathways:</p>

            <div style="display:flex; flex-direction:column; gap:16px;">
              ${profiles.map(p => `
                <div style="border: 2px solid var(--color-ink); border-radius: 16px; padding: 20px; background: #fff; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                  <div>
                    <h4 style="margin-bottom: 4px; font-size: 20px;">${escapeHtml(p.name)} (${escapeHtml(p.location)})</h4>
                    <span style="font-size:15px; color:#555;">${escapeHtml(p.educationLabel)} &bull; Goal: ${escapeHtml(p.goals.join(', '))}</span>
                  </div>
                  <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('${p.id}')">
                    Explore as ${escapeHtml(p.name)} &rarr;
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="text-center">
            <p style="margin-bottom: 16px;">Or prefer starting from scratch with your own story?</p>
            <a href="#/start" class="btn btn-outline">${t("btn.start_onboarding")}</a>
          </div>
        </div>
      </section>
    `;
  }

  // --- Router Dispatcher ---
  function router() {
    const rawHash = window.location.hash || "#/home";
    const path = rawHash.split("?")[0];

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "instant" });

    // Render shared components
    renderPrototypeBanner();
    renderNavbar();
    renderFooter();

    // Route matching
    if (path === "" || path === "#/" || path === "#/home") {
      renderHome();
    } else if (path === "#/signin") {
      renderSignin();
    } else if (path === "#/start") {
      renderStart();
    } else if (path === "#/path") {
      renderPath();
    } else if (path === "#/explore") {
      renderExplore();
    } else if (path.startsWith("#/opportunity/")) {
      const id = path.replace("#/opportunity/", "");
      renderOpportunity(id);
    } else if (path.startsWith("#/apply/")) {
      const id = path.replace("#/apply/", "");
      renderApply(id);
    } else if (path === "#/me") {
      renderMe();
    } else if (path === "#/kit") {
      renderKit();
    } else {
      // Fallback
      renderHome();
    }

    // Attach IntersectionObserver for .fade-up
    initFadeUpObserver();
  }

  // IntersectionObserver for gentle fade-up animations
  function initFadeUpObserver() {
    const fadeEls = document.querySelectorAll(".fade-up:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      fadeEls.forEach(el => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Global Handlers ---
  window.toggleSaveOpportunity = function (id) {
    const isNowSaved = Storage.toggleSave(id);
    showToast(isNowSaved ? t("toast.saved") : t("toast.unsaved"));
    router(); // Re-render current view to reflect new state
  };

  window.loadDemoProfile = function (profileId) {
    const profiles = window.PROFILES || [];
    const found = profiles.find(p => p.id === profileId);
    if (found) {
      Storage.saveProfile({
        name: found.name,
        education: found.education,
        skills: found.skills,
        goal: found.goals[0] || "learn-skill",
        district: found.district,
        state: found.state,
        location: found.location
      });
      showToast(`${found.name}'s profile loaded!`);
      renderNavbar();
      window.location.hash = "#/path";
    }
  };

  // Re-render when language changes
  window.addEventListener("languagechange", () => {
    router();
  });

  // Re-route on hashchange
  window.addEventListener("hashchange", router);

  // Initial load
  document.addEventListener("DOMContentLoaded", () => {
    router();
  });
})();

