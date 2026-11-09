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
  let onboardingDraft = null;
  let onboardingStep = 0;
  let onboardingDirection = "next";

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

    const isHome = currentHash === "#/home" || currentHash === "" || currentHash === "#" || currentHash === "#/";
    navEl.className = isHome ? "navbar navbar--hero" : "navbar";

    const authPill = profile
      ? `<a href="#/me" class="navbar-profile btn btn-sm ${isHome ? 'btn-outline-dark' : 'btn-outline'}" aria-label="My journey: ${escapeHtml(profile.name)}" title="${escapeHtml(profile.name)}" style="border-radius: var(--radius-pill); font-size:15px;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--color-marigold); margin-right:4px;"></span>
          ${escapeHtml(profile.name)}
        </a>`
      : `<a href="#/signin" class="btn btn-sm ${isHome ? 'btn-on-dark' : 'btn-primary'}">${t("nav.signin")}</a>`;

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

          ${authPill}

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
              <h2 style="color: var(--color-cream); font-size: 38px; margin: 0;">${t("brand.name")}</h2>
            </div>
            <p style="color: var(--color-cream); font-size: 18px; margin-bottom: 8px; opacity: 0.95;">${t("tagline.strap")}</p>
            <p class="footer-tagline">“${t("tagline.footer")}”</p>
          </div>

          <ul class="footer-links">
            <li><strong>Quick Links</strong></li>
            <li><a href="#/home">${t("nav.home")}</a></li>
            <li><a href="#/explore">${t("nav.explore")}</a></li>
            <li><a href="#/start">${t("btn.start_onboarding")}</a></li>
            <li><a href="#/me">${t("nav.journey")}</a></li>
            <li><a href="#/kit">${t("nav.kit")}</a></li>
          </ul>
        </div>

        <!-- Plain text official portal names per BRIEF.md -->
        <div style="padding: 20px 0; border-top: 1px solid rgba(255, 246, 229, 0.15); border-bottom: 1px solid rgba(255, 246, 229, 0.15); margin-bottom: 24px;">
          <p style="font-size: 15px; color: var(--color-marigold); margin-bottom: 6px; font-weight: 700;">
            Official Government Sources & Portals:
          </p>
          <p style="font-size: 15px; color: rgba(255, 246, 229, 0.85); line-height: 1.6;">
            Skill India Digital &bull; National Career Service (NCS) &bull; National Scholarship Portal (NSP) &bull; Common Fellowship Portal &bull; UGC Distance Education Bureau (DEB) &bull; Stand-Up India &bull; Aajeevika (DAY-NRLM)
          </p>
        </div>

        <div class="footer-bottom">
          <p><strong>${t("notice.privacy")}</strong></p>
          <p>${t("notice.prototype")} &bull; ${t("notice.source")}</p>
          <p>&copy; 2026 ReturnHer &bull; ${t("tagline.sakhi")}</p>
        </div>
      </div>
    `;
  }

  // --- Route Views ---

  // 1. Home View (#/home)
  function renderHome() {
    const app = document.getElementById("app-view");
    const currentLang = window.I18N.getLanguage();

    app.innerHTML = `
      <!-- ================= SECTION 1: HERO (Forest) ================= -->
      <section class="section section-forest" style="padding-bottom: 0;">
        <div class="container text-center" style="max-width: 960px; margin: 0 auto; padding-top: 28px; padding-bottom: 20px;">
          <div class="hero-label-wrap fade-up" style="display:inline-flex; align-items:center; gap:8px; margin-bottom: 20px;">
            <span style="width:24px; height:24px; display:inline-block;">${ICONS.marigold}</span>
            <span class="tag tag--opportunity" style="font-size: 15px;">${t("hero.label")}</span>
          </div>

          <h1 class="fade-up" style="margin-bottom: 24px; color: var(--color-cream); font-size: clamp(44px, 7vw, 84px); line-height: 1.05;">
            ${currentLang === "hi"
              ? `सफ़र रुका था, <span class="hero-highlight">मौके नहीं।${window.ART ? window.ART.hand.underline("#FFC21A") : ""}</span>`
              : `Your journey paused. Your opportunities <span class="hero-highlight">didn't.${window.ART ? window.ART.hand.underline("#FFC21A") : ""}</span>`
            }
          </h1>

          <p class="fade-up" style="font-size: 20px; color: rgba(255, 246, 229, 0.95); margin-bottom: 32px; max-width: 760px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            ${t("hero.desc")}
          </p>

          <div class="fade-up" style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-bottom: 28px;">
            <a href="#/start" class="btn btn-on-dark" style="font-size: 18px; font-weight: 700;">${t("hero.btn_path")} &rarr;</a>
            <a href="#three-women" class="btn btn-outline-dark" style="font-size: 18px; font-weight: 700;">${t("hero.btn_women")}</a>
          </div>
        </div>

        <!-- Full-width Hero Crowd Bleeding Out of the Bottom -->
        <div class="hero-crowd-wrapper fade-up" style="width: 100%; max-width: 1440px; margin: 0 auto; line-height: 0; position: relative; z-index: 2; margin-bottom: -32px; overflow: visible;">
          ${window.ART ? window.ART.crowd() : ""}
        </div>

        <!-- Interaction Hint under Crowd -->
        <div class="fade-up" style="display:flex; align-items:center; justify-content:center; gap:8px; padding-bottom: 24px; color: var(--color-cream); font-size: 16px; font-weight: 700; position: relative; z-index: 3;">
          <span>${window.ART ? window.ART.hand.arrowDotted("#FFC21A") : "&rarr;"}</span>
          <span>${t("hero.tap_hint")}</span>
        </div>

        <!-- Wave Divider transitioning Forest into Cream -->
        <div class="divider" style="color: var(--color-cream); margin-top: -16px; position: relative; z-index: 1;" aria-hidden="true">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 C150,42 350,48 500,24 C650,0 850,44 1050,22 C1150,11 1200,32 1200,48 L1200,48 L0,48 Z"></path>
          </svg>
        </div>
      </section>

      <!-- ================= SECTION 2: THREE WOMEN (Cream) ================= -->
      <section class="section section-cream" id="three-women" style="padding-top: 56px; padding-bottom: 80px;">
        <div class="container">
          <div class="text-center" style="margin-bottom: 48px;">
            <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.short")}</span>
            <h2 style="color: var(--color-forest);">${t("tagline.women")}</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; align-items: start; padding-top: 24px;">
            <!-- Sunita (Tailor, Meerut) -->
            <div class="card note card--tilt-sunita block-behind block-behind--cobalt fade-up" style="background: #FFFDF4; border: 2px solid var(--color-ink); border-radius: 20px; padding: 32px 24px 28px;">
              <div style="margin: -64px -10px 10px -10px; height: 190px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("tailor") : ""}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                <h3 style="font-size: 26px; color: var(--color-forest);">Sunita</h3>
                <span class="tag">Meerut, UP</span>
              </div>
              <p style="font-size: 15px; font-weight: 700; color: var(--color-cobalt); margin-bottom: 14px;">Class 10 &bull; 5 yrs tailoring experience</p>
              <blockquote style="font-size: 18px; font-weight: 600; line-height: 1.5; margin-bottom: 18px; color: var(--color-ink); font-style: italic;">
                “${t("quote.sunita")}”
              </blockquote>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 24px;">
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">tailoring</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">embroidery</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">teach others</span>
              </div>
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('sunita')" style="width: 100%;">
                ${currentLang === "hi" ? "सुनीता का रास्ता देखें" : "See Sunita's path"} &rarr;
              </button>
            </div>

            <!-- Priya (Scholar, Lucknow) -->
            <div class="card note card--tilt-priya block-behind block-behind--vermilion fade-up" style="background: #FFFDF4; border: 2px solid var(--color-ink); border-radius: 20px; padding: 32px 24px 28px;">
              <div style="margin: -64px -10px 10px -10px; height: 190px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("scholar") : ""}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                <h3 style="font-size: 26px; color: var(--color-forest);">Priya</h3>
                <span class="tag">Lucknow, UP</span>
              </div>
              <p style="font-size: 15px; font-weight: 700; color: var(--color-vermilion); margin-bottom: 14px;">MSc Mathematics &bull; Postgraduate</p>
              <blockquote style="font-size: 18px; font-weight: 600; line-height: 1.5; margin-bottom: 18px; color: var(--color-ink); font-style: italic;">
                “${t("quote.priya")}”
              </blockquote>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 24px;">
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">mathematics</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">academic research</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">fellowship</span>
              </div>
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('priya')" style="width: 100%;">
                ${currentLang === "hi" ? "प्रिया का रास्ता देखें" : "See Priya's path"} &rarr;
              </button>
            </div>

            <!-- Anjali (Learner, Kanpur) -->
            <div class="card note card--tilt-anjali block-behind block-behind--marigold fade-up" style="background: #FFFDF4; border: 2px solid var(--color-ink); border-radius: 20px; padding: 32px 24px 28px;">
              <div style="margin: -64px -10px 10px -10px; height: 190px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("learner") : ""}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                <h3 style="font-size: 26px; color: var(--color-forest);">Anjali</h3>
                <span class="tag">Kanpur, UP</span>
              </div>
              <p style="font-size: 15px; font-weight: 700; color: var(--color-forest); margin-bottom: 14px;">Class 12 &bull; Paused Education</p>
              <blockquote style="font-size: 18px; font-weight: 600; line-height: 1.5; margin-bottom: 18px; color: var(--color-ink); font-style: italic;">
                “${t("quote.anjali")}”
              </blockquote>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom: 24px;">
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">writing</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">computers</span>
                <span class="chip" style="font-size: 13px; padding: 4px 10px;">degree</span>
              </div>
              <button class="btn btn-sm btn-primary" onclick="window.loadDemoProfile('anjali')" style="width: 100%;">
                ${currentLang === "hi" ? "अंजलि का रास्ता देखें" : "See Anjali's path"} &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 3: HOW IT WORKS (Oat) ================= -->
      <section class="section section-oat" style="padding-top: 0; padding-bottom: 80px; overflow: visible;">
        <!-- Scalloped Divider above -->
        <div class="divider" style="color: var(--color-oat); margin-top: -36px; margin-bottom: 40px;" aria-hidden="true">
          <svg viewBox="0 0 1200 36" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 Q30,36 60,0 Q90,36 120,0 Q150,36 180,0 Q210,36 240,0 Q270,36 300,0 Q330,36 360,0 Q390,36 420,0 Q450,36 480,0 Q510,36 540,0 Q570,36 600,0 Q630,36 660,0 Q690,36 720,0 Q750,36 780,0 Q810,36 840,0 Q870,36 900,0 Q930,36 960,0 Q990,36 1020,0 Q1050,36 1080,0 Q1110,36 1140,0 Q1170,36 1200,0 L1200,36 L0,36 Z"></path>
          </svg>
        </div>

        <div class="container text-center" style="margin-bottom: 48px;">
          <span class="tag tag--opportunity" style="margin-bottom: 12px;">${t("tagline.strap")}</span>
          <h2 style="color: var(--color-forest);">${t("tagline.how")}</h2>
        </div>

        <div class="how-container container">
          <!-- Winding Dotted SVG Path that draws itself on scroll -->
          <svg class="how-svg-container" viewBox="0 0 1000 680" fill="none" aria-hidden="true">
            <path class="journey-path" d="M 120,70 C 450,70 780,180 820,290 C 860,400 450,540 140,610" stroke="#0E4B33" stroke-width="4.5" fill="none" stroke-linecap="round" />
          </svg>

          <!-- 3 Stops in S-Curve -->
          <div class="how-stops-list">
            <!-- Stop 1 (Left) -->
            <div class="how-stop fade-up">
              <div class="how-num-badge how-num-badge--cobalt">1</div>
              <div class="how-card">
                <h3 style="font-size: 24px; color: var(--color-cobalt); margin-bottom: 8px;">
                  ${t("how.step1.title")}
                </h3>
                <p style="font-size: 16px; margin: 0; line-height: 1.5;">
                  ${t("how.step1.desc")}
                </p>
              </div>
              <div class="how-scene-thumb">
                ${window.ART ? window.ART.scene("doorway") : ""}
              </div>
            </div>

            <!-- Stop 2 (Right) -->
            <div class="how-stop how-stop--right fade-up">
              <div class="how-num-badge how-num-badge--vermilion">2</div>
              <div class="how-card">
                <h3 style="font-size: 24px; color: var(--color-vermilion); margin-bottom: 8px;">
                  ${t("how.step2.title")}
                </h3>
                <p style="font-size: 16px; margin: 0; line-height: 1.5;">
                  ${t("how.step2.desc")}
                </p>
              </div>
              <div class="how-scene-thumb">
                ${window.ART ? window.ART.scene("scholar") : ""}
              </div>
            </div>

            <!-- Stop 3 (Left) -->
            <div class="how-stop fade-up">
              <div class="how-num-badge how-num-badge--forest">3</div>
              <div class="how-card">
                <h3 style="font-size: 24px; color: var(--color-forest); margin-bottom: 8px;">
                  ${t("how.step3.title")}
                </h3>
                <p style="font-size: 16px; margin: 0; line-height: 1.5;">
                  ${t("how.step3.desc")}
                </p>
              </div>
              <div class="how-scene-thumb">
                ${window.ART ? window.ART.scene("tailor") : ""}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 4: FOUR WAYS IN (Blush) ================= -->
      <section class="section section-blush" style="padding-top: 64px; padding-bottom: 80px;">
        <div class="container">
          <div class="text-center" style="margin-bottom: 56px;">
            <span class="tag tag--support" style="margin-bottom: 12px;">${t("tagline.strap")}</span>
            <h2 style="color: var(--color-forest);">${t("tagline.ways")}</h2>
          </div>

          <div class="ways-grid">
            <!-- 1. Education (Arch-top) -->
            <div class="card shape-arch card--tilt-left block-behind block-behind--cobalt fade-up" style="padding: 28px 24px 28px;">
              <div style="margin: -50px -10px 10px -10px; height: 180px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("scholar") : ""}
              </div>
              <span class="tag tag--education" style="margin-bottom: 14px;">${t("pillar.education")}</span>
              <h3 style="color: var(--color-cobalt); font-size: 24px; margin-bottom: 10px;">
                ${t("tagline.edu")}
              </h3>
              <p style="font-size: 16px; margin-bottom: 22px;">${t("pillar.education.desc")}</p>
              <a href="#/explore?pillar=education" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- 2. Certification (Leaf shape) -->
            <div class="card shape-leaf card--tilt-right block-behind block-behind--vermilion fade-up" style="padding: 28px 24px 28px;">
              <div style="margin: -50px -10px 10px -10px; height: 180px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("tailor") : ""}
              </div>
              <span class="tag tag--certification" style="margin-bottom: 14px;">${t("pillar.certification")}</span>
              <h3 style="color: var(--color-vermilion); font-size: 24px; margin-bottom: 10px;">
                ${t("tagline.cert")}
              </h3>
              <p style="font-size: 16px; margin-bottom: 22px;">${t("pillar.certification.desc")}</p>
              <a href="#/explore?pillar=certification" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- 3. Opportunity (28px rounded) -->
            <div class="card block-behind block-behind--marigold fade-up" style="border-radius: 28px; padding: 28px 24px 28px;">
              <div style="margin: -50px -10px 10px -10px; height: 180px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("entrepreneur") : ""}
              </div>
              <span class="tag tag--opportunity" style="margin-bottom: 14px;">${t("pillar.opportunity")}</span>
              <h3 style="color: var(--color-forest); font-size: 24px; margin-bottom: 10px;">
                ${t("tagline.opp")}
              </h3>
              <p style="font-size: 16px; margin-bottom: 22px;">${t("pillar.opportunity.desc")}</p>
              <a href="#/explore?pillar=opportunity" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>

            <!-- 4. Support (Circle-cornered) -->
            <div class="card block-behind block-behind--forest fade-up" style="border-radius: 64px 28px 28px 64px; padding: 28px 24px 28px;">
              <div style="margin: -50px -10px 10px -10px; height: 180px; overflow: visible; display: flex; justify-content: center;">
                ${window.ART ? window.ART.scene("teacher") : ""}
              </div>
              <span class="tag tag--support" style="margin-bottom: 14px;">${t("pillar.support")}</span>
              <h3 style="color: var(--color-forest); font-size: 24px; margin-bottom: 10px;">
                ${t("tagline.support")}
              </h3>
              <p style="font-size: 16px; margin-bottom: 22px;">${t("pillar.support.desc")}</p>
              <a href="#/explore?pillar=support" class="btn btn-sm btn-outline">${t("btn.explore")} &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 5: PROMISE (Forest) ================= -->
      <section class="section section-forest" style="padding-top: 0; padding-bottom: 80px;">
        <!-- Wave Divider transitioning Blush into Forest -->
        <div class="divider" style="color: var(--color-forest); margin-top: -36px; margin-bottom: 40px;" aria-hidden="true">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 C150,42 350,48 500,24 C650,0 850,44 1050,22 C1150,11 1200,32 1200,48 L1200,48 L0,48 Z"></path>
          </svg>
        </div>

        <div class="container text-center" style="margin-bottom: 56px;">
          <span class="tag tag--opportunity" style="margin-bottom: 12px;">${t("tagline.sakhi")}</span>
          <h2 style="color: var(--color-cream);">${t("tagline.promise")}</h2>
        </div>

        <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          <!-- Promise 1 -->
          <div class="fade-up" style="border: 2px solid rgba(255, 246, 229, 0.4); border-radius: 24px; padding: 32px 28px; background: rgba(10, 47, 33, 0.5);">
            <div style="margin-bottom: 18px; width: 56px; height: 56px;">
              <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden="true">
                <circle cx="28" cy="28" r="22" stroke="#FFC21A" stroke-width="4.5" />
                <circle cx="32" cy="32" r="22" stroke="#FFE28A" stroke-width="4.5" stroke-dasharray="6 4" />
                <circle cx="36" cy="36" r="22" stroke="#FFC21A" stroke-width="4.5" />
              </svg>
            </div>
            <h3 style="color: var(--color-marigold); font-size: 22px; margin-bottom: 12px; line-height: 1.3;">
              ${t("promise.1.title")}
            </h3>
            <p style="color: var(--color-cream); font-size: 16px; opacity: 0.95; line-height: 1.55;">
              ${t("promise.1.desc")}
            </p>
          </div>

          <!-- Promise 2 -->
          <div class="fade-up" style="border: 2px solid rgba(255, 246, 229, 0.4); border-radius: 24px; padding: 32px 28px; background: rgba(10, 47, 33, 0.5);">
            <div style="margin-bottom: 18px; width: 56px; height: 56px;">
              <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden="true">
                <circle cx="28" cy="28" r="22" stroke="#FFC21A" stroke-width="4.5" />
                <circle cx="32" cy="32" r="22" stroke="#FFE28A" stroke-width="4.5" stroke-dasharray="6 4" />
                <circle cx="36" cy="36" r="22" stroke="#FFC21A" stroke-width="4.5" />
              </svg>
            </div>
            <h3 style="color: var(--color-marigold); font-size: 22px; margin-bottom: 12px; line-height: 1.3;">
              ${t("promise.2.title")}
            </h3>
            <p style="color: var(--color-cream); font-size: 16px; opacity: 0.95; line-height: 1.55;">
              ${t("promise.2.desc")}
            </p>
          </div>

          <!-- Promise 3 -->
          <div class="fade-up" style="border: 2px solid rgba(255, 246, 229, 0.4); border-radius: 24px; padding: 32px 28px; background: rgba(10, 47, 33, 0.5);">
            <div style="margin-bottom: 18px; width: 56px; height: 56px;">
              <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden="true">
                <circle cx="28" cy="28" r="22" stroke="#FFC21A" stroke-width="4.5" />
                <circle cx="32" cy="32" r="22" stroke="#FFE28A" stroke-width="4.5" stroke-dasharray="6 4" />
                <circle cx="36" cy="36" r="22" stroke="#FFC21A" stroke-width="4.5" />
              </svg>
            </div>
            <h3 style="color: var(--color-marigold); font-size: 22px; margin-bottom: 12px; line-height: 1.3;">
              ${t("promise.3.title")}
            </h3>
            <p style="color: var(--color-cream); font-size: 16px; opacity: 0.95; line-height: 1.55;">
              ${t("promise.3.desc")}
            </p>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 6: A NOTE FROM THE MAKER (Cream) ================= -->
      <section class="section section-cream" style="padding-top: 72px; padding-bottom: 80px;">
        <div class="container text-center">
          <!-- REMINDER: Replace this with 2 lines in your own words: why you built ReturnHer. -->
          <div class="note note--maker fade-up" style="max-width: 680px; margin: 0 auto; text-align: left; padding: 40px 32px 32px; background: #FFFDF4; border: 2px solid #D8CEB9; border-radius: 12px; position: relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
              <span class="tag tag--support">${t("tagline.sakhi")}</span>
              <span>${window.ART ? window.ART.decor("marigold", { size: 36 }) : ""}</span>
            </div>
            <h3 style="font-size: 26px; color: var(--color-forest); margin-bottom: 16px;">${t("maker.title")}</h3>
            <p style="font-size: 20px; font-style: italic; color: var(--color-ink); line-height: 1.6; margin-bottom: 24px;">
              "${t("maker.placeholder")}"
            </p>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <div>
                <strong style="font-family: var(--font-heading); font-size: 19px; color: var(--color-forest); display:block;">ReturnHer Team</strong>
                <span style="font-size: 15px; color: #555;">${t("maker.signoff")}</span>
              </div>
              <span>${window.ART ? window.ART.decor("paisley", { size: 38 }) : ""}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 7: FINAL CTA (Marigold) ================= -->
      <section class="section section-marigold" style="padding-top: 56px; padding-bottom: 80px; overflow: visible;">
        <div class="container" style="position: relative; overflow: visible;">
          <!-- Wide ART.panel() whose shapes bleed onto marigold -->
          <div class="cta-panel-wrap fade-up" style="max-width: 1100px; margin: 0 auto; overflow: visible; line-height: 0;">
            ${window.ART ? window.ART.panel() : ""}
          </div>

          <!-- Off-centre cream rounded card overlapping panel -->
          <div class="card shape-arch cta-overlay-card block-behind block-behind--forest fade-up" style="background-color: var(--color-cream); padding: 44px 36px; text-align: center; border: 2.5px solid var(--color-ink); max-width: 640px; margin-left: auto; margin-right: auto;">
            <div style="display:inline-block; margin-bottom: 12px;">
              ${window.ART ? window.ART.decor("marigold", { size: 40 }) : ""}
            </div>
            <h2 style="font-size: clamp(32px, 4.5vw, 46px); color: var(--color-forest); margin-bottom: 14px;">
              ${t("tagline.cta")}
            </h2>
            <p style="font-size: 20px; color: var(--color-ink); margin-bottom: 28px; line-height: 1.5;">
              ${t("tagline.cta-sub")}
            </p>
            <a href="#/start" class="btn btn-primary" style="font-size: 20px; padding: 16px 36px;">
              ${t("hero.btn_path")} &rarr;
            </a>
          </div>
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

  const wizardGoals = [
    { id: "finish-education", label: "wizard.goal.education", icon: "rangoli" },
    { id: "research-phd", label: "wizard.goal.research", icon: "paisley" },
    { id: "learn-skill", label: "wizard.goal.skill", icon: "rangoli" },
    { id: "certify-skill", label: "wizard.goal.certify", icon: "bangles" },
    { id: "teach-others", label: "wizard.goal.teach", icon: "lotus" },
    { id: "find-government-job", label: "wizard.goal.job", icon: "sun" },
    { id: "earn-from-home", label: "wizard.goal.earn", icon: "leaf" },
    { id: "start-business", label: "wizard.goal.business", icon: "sun" }
  ];
  const wizardSkills = [
    "tailoring", "embroidery", "cooking", "teaching", "beauty-wellness",
    "computer-basics", "handicrafts", "design", "other"
  ];
  const wizardStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];
  const wizardSteps = [
    { title: "wizard.goal.title", subtitle: "wizard.goal.subtitle", background: "marigold", scene: "entrepreneur" },
    { title: "wizard.education.title", subtitle: "wizard.education.subtitle", background: "blush", scene: "learner" },
    { title: "wizard.skills.title", subtitle: "wizard.skills.subtitle", background: "oat", scene: "tailor" },
    { title: "wizard.location.title", subtitle: "wizard.location.subtitle", background: "cream", scene: "doorway" },
    { title: "wizard.learning.title", subtitle: "wizard.learning.subtitle", background: "marigold", scene: "teacher" }
  ];
  const wizardEducation = ["class10", "class12", "graduate", "postgraduate"];
  const wizardDistricts = ["Lucknow", "Kanpur", "Meerut", "Varanasi", "Prayagraj", "Agra", "Gorakhpur"];

  function createOnboardingDraft(profile = {}) {
    const rawSkills = Array.isArray(profile.skills)
      ? profile.skills.map(skill => String(skill).trim()).filter(Boolean)
      : String(profile.skills || "").split(",").map(skill => skill.trim()).filter(Boolean);
    const skillAliases = {
      tailoring: ["tailor", "sew"],
      embroidery: ["embroider"],
      cooking: ["cook"],
      teaching: ["teach", "trainer"],
      "beauty-wellness": ["beauty", "wellness"],
      "computer-basics": ["computer", "digital"],
      handicrafts: ["handicraft", "craft"],
      design: ["design"]
    };
    const skills = wizardSkills.filter(skill =>
      skill === "other"
        ? rawSkills.some(value => !Object.values(skillAliases).some(aliases =>
          aliases.some(alias => value.toLowerCase().includes(alias))
        ))
        : rawSkills.some(value => skillAliases[skill].some(alias => value.toLowerCase().includes(alias)))
    );
    const goal = Array.isArray(profile.goals) ? profile.goals[0] : profile.goal;
    const experienceYears = Number(profile.experienceYears);
    const experienceRange = profile.experienceRange || (
      experienceYears >= 10 ? "10+" :
        experienceYears >= 5 ? "5-9" :
          experienceYears >= 2 ? "2-4" :
            experienceYears >= 0 && profile.experienceYears !== undefined ? "0-1" : ""
    );

    return {
      name: profile.name || "",
      goal: wizardGoals.some(option => option.id === goal) ? goal : "",
      education: wizardEducation.includes(profile.education) ? profile.education : "class10",
      skills,
      otherSkillText: rawSkills.filter(value =>
        !Object.values(skillAliases).some(aliases => aliases.some(alias => value.toLowerCase().includes(alias)))
      ).join(", "),
      experienceRange,
      state: profile.state || "Uttar Pradesh",
      district: profile.district || "",
      mode: profile.mode === "offline" ? "in-person" : profile.mode === "online" ? "online" : "either",
      financialSupportNeeded: Boolean(profile.financialSupportNeeded)
    };
  }

  function wizardOptionButton(group, value, label, icon, selected, multi = false) {
    const iconSvg = window.ART ? window.ART.decor(icon, { size: 32 }) : "";
    const bloom = selected && window.ART ? window.ART.decor("marigold", { size: 24 }) : "";
    const attribute = group === "skill" ? "data-skill" : `data-${group}`;
    return `
      <button type="button" class="wizard-option${selected ? " is-selected" : ""}" ${attribute}="${escapeHtml(value)}"
        aria-pressed="${selected}" ${multi ? 'aria-label="' + escapeHtml(label) + '"' : ""}>
        <span class="wizard-option-icon">${iconSvg}</span>
        <span class="wizard-option-label">${escapeHtml(label)}</span>
        ${bloom ? `<span class="wizard-option-bloom" aria-hidden="true">${bloom}</span>` : ""}
      </button>
    `;
  }

  function renderWizardProgress(step) {
    const stops = [
      { x: 10, y: 27 }, { x: 72, y: 16 }, { x: 151, y: 29 },
      { x: 225, y: 15 }, { x: 290, y: 25 }
    ];
    const marker = stops[Math.min(step, stops.length - 1)];
    return `
      <div class="wizard-progress" role="img" aria-label="${escapeHtml(t("wizard.progress", "{step} of 5").replace("{step}", String(Math.min(step + 1, 5))))}">
        <svg viewBox="0 0 300 48" aria-hidden="true">
          <path d="M10 27 C34 3 52 6 72 16 S122 47 151 29 S201 -2 225 15 S266 44 290 25" class="wizard-progress-path"/>
          ${stops.map((stop, index) => `<circle cx="${stop.x}" cy="${stop.y}" r="5" class="wizard-progress-dot${index <= step ? " is-travelled" : ""}"/>`).join("")}
        </svg>
        <span class="wizard-progress-marker" style="left:${marker.x / 3}%; top:${marker.y / 48 * 100}%;" aria-hidden="true">
          ${window.ART ? window.ART.decor("marigold", { size: 24 }) : ""}
        </span>
      </div>
    `;
  }

  function renderStart(direction = onboardingDirection) {
    const app = document.getElementById("app-view");
    onboardingDirection = direction;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!onboardingDraft) {
      onboardingDraft = createOnboardingDraft(Storage.getProfile() || {});
    }

    const isSummary = onboardingStep >= wizardSteps.length;
    const currentStep = Math.min(onboardingStep, wizardSteps.length - 1);
    const step = wizardSteps[currentStep];
    const title = isSummary ? "wizard.summary.title" : step.title;
    const subtitle = isSummary ? "wizard.summary.subtitle" : step.subtitle;
    const background = isSummary ? wizardSteps[wizardSteps.length - 1].background : step.background;
    const scene = isSummary ? "scholar" : step.scene;
    const goalLabel = wizardGoals.find(option => option.id === onboardingDraft.goal);
    const selectedSkills = onboardingDraft.skills.map(skill => t(`wizard.skill.${skill}`));
    if (onboardingDraft.otherSkillText && onboardingDraft.skills.includes("other")) {
      selectedSkills.push(onboardingDraft.otherSkillText);
    }
    const experienceLabels = { "0-1": "wizard.experience.0-1", "2-4": "wizard.experience.2-4", "5-9": "wizard.experience.5-9", "10+": "wizard.experience.10+" };
    const modeLabels = { online: "wizard.learning.online", "in-person": "wizard.learning.inPerson", either: "wizard.learning.either" };

    let questionContent = "";
    if (!isSummary && currentStep === 0) {
      questionContent = `<div class="wizard-options wizard-options--goals">${wizardGoals.map(option =>
        wizardOptionButton("goal", option.id, t(option.label), option.icon, onboardingDraft.goal === option.id)
      ).join("")}</div>`;
    } else if (!isSummary && currentStep === 1) {
      questionContent = `
        <div class="wizard-options wizard-options--compact">
          ${wizardEducation.map((value, index) => wizardOptionButton("education", value,
            t(`wizard.education.${value}`), ["books", "rangoli", "paisley", "lotus"][index],
            onboardingDraft.education === value
          )).join("")}
        </div>
        <p class="wizard-inline-note">${t("wizard.education.welcome")}</p>
      `;
    } else if (!isSummary && currentStep === 2) {
      questionContent = `
        <div class="wizard-options wizard-options--skills">
          ${wizardSkills.map((value, index) => wizardOptionButton("skill", value,
            t(`wizard.skill.${value}`), ["bangles", "rangoli", "sun", "lotus", "paisley", "dots", "leaf", "squiggle", "marigold"][index],
            onboardingDraft.skills.includes(value), true
          )).join("")}
        </div>
        ${onboardingDraft.skills.includes("other") ? `
          <label class="wizard-field-label" for="wizard-other-skill">${t("wizard.skills.otherPrompt")}</label>
          <input class="wizard-input" id="wizard-other-skill" type="text" value="${escapeHtml(onboardingDraft.otherSkillText)}" placeholder="${escapeHtml(t("wizard.skills.otherPlaceholder"))}">
        ` : ""}
        <label class="wizard-field-label" for="wizard-experience">${t("wizard.experience.label")}</label>
        <select class="wizard-input" id="wizard-experience">
          <option value="">${t("wizard.experience.skip")}</option>
          ${Object.entries(experienceLabels).map(([value, key]) =>
            `<option value="${value}" ${onboardingDraft.experienceRange === value ? "selected" : ""}>${t(key)}</option>`
          ).join("")}
        </select>
      `;
    } else if (!isSummary && currentStep === 3) {
      questionContent = `
        <div class="wizard-field">
          <label class="wizard-field-label" for="wizard-state">${t("wizard.location.state")}</label>
          <select class="wizard-input" id="wizard-state">
            ${wizardStates.map(state => `<option value="${escapeHtml(state)}" ${onboardingDraft.state === state ? "selected" : ""}>${escapeHtml(state)}</option>`).join("")}
          </select>
        </div>
        <div class="wizard-field">
          <label class="wizard-field-label" for="wizard-district">${t("wizard.location.district")}</label>
          <input class="wizard-input" id="wizard-district" type="text" list="wizard-district-options" value="${escapeHtml(onboardingDraft.district)}" placeholder="${escapeHtml(t("wizard.location.districtPlaceholder"))}">
          <datalist id="wizard-district-options">${wizardDistricts.map(district => `<option value="${district}"></option>`).join("")}</datalist>
        </div>
        <p class="wizard-inline-note">${t("wizard.location.note")}</p>
      `;
    } else if (!isSummary && currentStep === 4) {
      questionContent = `
        <fieldset class="wizard-choice-group">
          <legend class="wizard-field-label">${t("wizard.learning.question")}</legend>
          <div class="wizard-options wizard-options--compact">
            ${[
              ["online", "wizard.learning.online", "sun"],
              ["in-person", "wizard.learning.inPerson", "leaf"],
              ["either", "wizard.learning.either", "rangoli"]
            ].map(([value, label, icon]) => wizardOptionButton("mode", value, t(label), icon, onboardingDraft.mode === value)).join("")}
          </div>
        </fieldset>
        <fieldset class="wizard-choice-group">
          <legend class="wizard-field-label">${t("wizard.learning.supportQuestion")}</legend>
          <div class="wizard-options wizard-options--compact">
            ${[
              ["yes", "wizard.learning.yes", "marigold"],
              ["no", "wizard.learning.notNecessary", "bangles"]
            ].map(([value, label, icon]) => wizardOptionButton("support", value, t(label), icon, onboardingDraft.financialSupportNeeded === (value === "yes"))).join("")}
          </div>
        </fieldset>
      `;
    } else {
      questionContent = `
        <div class="journey-ticket">
          <div class="journey-ticket-heading">
            <span class="tag tag--support">${t("wizard.ticket.label")}</span>
            ${window.ART ? window.ART.decor("marigold", { size: 36 }) : ""}
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.from")}</strong> ${t(`wizard.education.${onboardingDraft.education}`)}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="1">${t("wizard.edit")}</button>
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.district")}</strong> ${escapeHtml(onboardingDraft.district || t("wizard.ticket.notSet"))}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="3">${t("wizard.edit")}</button>
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.goal")}</strong> ${goalLabel ? t(goalLabel.label) : t("wizard.ticket.notSet")}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="0">${t("wizard.edit")}</button>
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.skills")}</strong> ${selectedSkills.length ? selectedSkills.map(escapeHtml).join(", ") : t("wizard.ticket.none")}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="2">${t("wizard.edit")}</button>
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.learning")}</strong> ${t(modeLabels[onboardingDraft.mode])}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="4">${t("wizard.edit")}</button>
          </div>
          <div class="journey-ticket-line">
            <span><strong>${t("wizard.ticket.support")}</strong> ${t(onboardingDraft.financialSupportNeeded ? "wizard.learning.yes" : "wizard.learning.notNecessary")}</span>
            <button type="button" class="wizard-edit-link" data-edit-step="4">${t("wizard.edit")}</button>
          </div>
          <p class="wizard-ticket-note">${t("wizard.summary.note")}</p>
        </div>
      `;
    }

    app.innerHTML = `
      <section class="journey-wizard journey-wizard--${background}">
        <div class="wizard-figure" aria-hidden="true">${window.ART ? window.ART.scene(scene) : ""}</div>
        <div class="container wizard-container">
          <div class="wizard-heading">
            <span class="tag tag--support">${t("tagline.sakhi")}</span>
            <h2>${t(title)}</h2>
            <p>${t(subtitle)}</p>
            <p class="wizard-purpose">${t("route.home.subtitle")}</p>
          </div>
          ${renderWizardProgress(currentStep)}
          <div class="wizard-panel wizard-enter-${direction}">
            ${questionContent}
            <p class="wizard-error" id="wizard-error" role="status" aria-live="polite"></p>
            <div class="wizard-actions">
              <button type="button" class="btn btn-outline wizard-back">${t("btn.back")}</button>
              ${isSummary
                ? `<button type="button" class="btn btn-primary wizard-build">${t("wizard.build")} ${ICONS.arrowRight}</button>`
                : `<button type="button" class="btn btn-primary wizard-next">${t("wizard.next")} ${ICONS.arrowRight}</button>`}
            </div>
          </div>
          <p class="wizard-privacy">${t("notice.privacy")}</p>
        </div>
      </section>
    `;

    app.querySelectorAll("[data-goal]").forEach(button => button.addEventListener("click", () => {
      onboardingDraft.goal = button.dataset.goal;
      renderStart(direction);
    }));
    app.querySelectorAll("[data-education]").forEach(button => button.addEventListener("click", () => {
      onboardingDraft.education = button.dataset.education;
      renderStart(direction);
    }));
    app.querySelectorAll("[data-skill]").forEach(button => button.addEventListener("click", () => {
      const skill = button.dataset.skill;
      onboardingDraft.skills = onboardingDraft.skills.includes(skill)
        ? onboardingDraft.skills.filter(value => value !== skill)
        : [...onboardingDraft.skills, skill];
      renderStart("next");
    }));
    app.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
      onboardingDraft.mode = button.dataset.mode;
      renderStart(direction);
    }));
    app.querySelectorAll("[data-support]").forEach(button => button.addEventListener("click", () => {
      onboardingDraft.financialSupportNeeded = button.dataset.support === "yes";
      renderStart(direction);
    }));
    app.querySelectorAll("[data-edit-step]").forEach(button => button.addEventListener("click", () => {
      onboardingStep = Number(button.dataset.editStep);
      renderStart("back");
    }));

    const stateInput = app.querySelector("#wizard-state");
    const districtInput = app.querySelector("#wizard-district");
    const experienceInput = app.querySelector("#wizard-experience");
    const otherSkillInput = app.querySelector("#wizard-other-skill");
    if (stateInput) stateInput.addEventListener("change", () => { onboardingDraft.state = stateInput.value; });
    if (districtInput) districtInput.addEventListener("input", () => { onboardingDraft.district = districtInput.value; });
    if (experienceInput) experienceInput.addEventListener("change", () => { onboardingDraft.experienceRange = experienceInput.value; });
    if (otherSkillInput) otherSkillInput.addEventListener("input", () => { onboardingDraft.otherSkillText = otherSkillInput.value; });

    app.querySelector(".wizard-back").addEventListener("click", () => {
      if (onboardingStep === 0) {
        window.location.hash = "#/signin";
        return;
      }
      onboardingStep -= 1;
      renderStart("back");
    });

    const nextButton = app.querySelector(".wizard-next");
    if (nextButton) nextButton.addEventListener("click", () => {
      if (onboardingStep === 0 && !onboardingDraft.goal) {
        const error = app.querySelector("#wizard-error");
        error.textContent = t("wizard.goal.required");
        error.classList.add("is-visible");
        return;
      }
      onboardingStep += 1;
      renderStart("next");
    });

    const buildButton = app.querySelector(".wizard-build");
    if (buildButton) buildButton.addEventListener("click", () => {
      const skills = onboardingDraft.skills
        .filter(skill => skill !== "other")
        .concat(onboardingDraft.otherSkillText.split(",").map(skill => skill.trim()).filter(Boolean));
      const experienceYears = { "0-1": 0, "2-4": 3, "5-9": 5, "10+": 10 }[onboardingDraft.experienceRange];
      Storage.saveProfile({
        name: onboardingDraft.name.trim(),
        education: onboardingDraft.education,
        skills,
        goal: onboardingDraft.goal,
        district: onboardingDraft.district.trim(),
        state: onboardingDraft.state,
        location: onboardingDraft.district.trim(),
        experienceRange: onboardingDraft.experienceRange,
        ...(experienceYears === undefined ? {} : { experienceYears }),
        mode: onboardingDraft.mode === "in-person" ? "offline" : onboardingDraft.mode === "either" ? "both" : "online",
        financialSupportNeeded: onboardingDraft.financialSupportNeeded
      });
      showToast(t("wizard.saved"));
      window.location.hash = "#/path";
    });
  }

  // 5. Personal Pathway View (#/path)
  const educationRanks = { class10: 1, class12: 2, graduate: 3, postgraduate: 4 };

  function getPathMatches(profile, opportunities) {
    const profileEducation = educationRanks[profile.education] || educationRanks.class10;
    const goalTags = profile.goal === "find-government-job" ? ["govt-job"] : [profile.goal];
    const skillKeywords = {
      tailoring: ["tailoring", "sewing"],
      embroidery: ["embroidery"],
      cooking: ["cooking"],
      teaching: ["teaching", "trainer"],
      "beauty-wellness": ["beauty", "wellness"],
      "computer-basics": ["computer", "digital"],
      computers: ["computer", "digital"],
      handicrafts: ["handicraft", "craft"],
      design: ["design"],
      mathematics: ["mathematics", "math"],
      "data analysis": ["data analysis"],
      "academic research": ["research"],
      writing: ["writing", "academic writing"],
      communication: ["communication"]
    };
    const profileSkills = (Array.isArray(profile.skills) ? profile.skills : [])
      .map(skill => String(skill).trim().toLowerCase())
      .filter(Boolean);
    const skillMatchesFor = opportunity => {
      const tags = (opportunity.skillTags || []).map(tag => tag.toLowerCase());
      return profileSkills.filter(skill => {
        const keywords = skillKeywords[skill] || [skill];
        return keywords.some(keyword => tags.some(tag => tag.includes(keyword)));
      });
    };
    const modeFits = opportunity => {
      const preferred = profile.mode || "both";
      return preferred === "both" || opportunity.mode === "both" || preferred === opportunity.mode;
    };

    // Keep only goal/skill matches; score goal +3, skills +2, eligible education +2,
    // matching state/All India +1, compatible mode +1, and needed financial support +1.
    // Higher education requirements and distance/fully online PhD options are excluded.
    return opportunities.map(opportunity => {
      const qualificationMeets = profileEducation >= (educationRanks[opportunity.minEducation] || 1);
      const matchesGoal = (opportunity.goalTags || []).some(tag => goalTags.includes(tag));
      const matchingSkills = skillMatchesFor(opportunity);
      const stateMatch = opportunity.states === "All India"
        || String(opportunity.states || "").split(",").map(state => state.trim()).includes(profile.state);
      const modeMatch = modeFits(opportunity);
      const isPhd = (opportunity.goalTags || []).includes("research-phd")
        || /ph\.?d|doctoral/i.test(`${opportunity.title} ${opportunity.type}`);
      const phdText = `${opportunity.title} ${opportunity.type} ${opportunity.whatYouGet}`;
      const excludesPhdMode = isPhd && (
        opportunity.mode === "online"
        || /distance|fully online/i.test(`${opportunity.title} ${opportunity.type}`)
        || (
          /distance|fully online/i.test(opportunity.whatYouGet)
          && !/not permitted|not allowed|prohibited/i.test(opportunity.whatYouGet)
        )
      );
      if (!qualificationMeets || excludesPhdMode || (!matchesGoal && matchingSkills.length === 0)) return null;

      const financialSupportMatch = Boolean(profile.financialSupportNeeded)
        && /scholarship|fellowship|loan|stipend/i.test(
          `${opportunity.title} ${opportunity.type} ${opportunity.whatYouGet}`
        );
      const score = (matchesGoal ? 3 : 0)
        + (matchingSkills.length > 0 ? 2 : 0)
        + (qualificationMeets ? 2 : 0)
        + (stateMatch ? 1 : 0)
        + (modeMatch ? 1 : 0)
        + (financialSupportMatch ? 1 : 0);
      const reasons = [];
      if (matchesGoal) {
        const goal = wizardGoals.find(item => item.id === profile.goal);
        reasons.push(`${t("path.reason.goal")}: ${goal ? t(goal.label) : profile.goal}`);
      }
      if (matchingSkills.length > 0) {
        const years = Number(profile.experienceYears) || 0;
        const skill = matchingSkills[0];
        reasons.push(years > 0
          ? t("path.reason.experience").replace("{years}", years).replace("{skill}", skill)
          : t("path.reason.skill").replace("{skill}", skill));
      }
      if (qualificationMeets) {
        reasons.push(t("path.reason.education").replace(
          "{education}",
          t(`tag.edu.${opportunity.minEducation}`)
        ));
      }
      if (stateMatch) {
        reasons.push(opportunity.states === "All India"
          ? t("path.reason.allIndia")
          : t("path.reason.state").replace("{state}", profile.state));
      }
      if (modeMatch) reasons.push(t("path.reason.mode"));
      if (financialSupportMatch) reasons.push(t("path.reason.support"));
      return { opportunity, score, reasons };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  }

  function getPathStages(profile, matches) {
    const matchById = new Map(matches.map(match => [match.opportunity.id, match]));
    const profileId = (window.PROFILES || []).find(item => item.name === profile.name)?.id;
    const sampleStages = {
      sunita: [
        ["path.sunita.stage1", ["cert-rpl-tailoring"]],
        ["path.sunita.stage2", ["cert-jss-tailoring"]],
        ["path.sunita.stage3", ["opp-pm-vishwakarma"]],
        ["path.sunita.stage4", ["supp-mudra-loan"]]
      ],
      priya: [
        ["path.priya.stage1", ["edu-doctoral-fellowship"]],
        ["path.priya.stage2", ["edu-ugc-phd"]],
        ["path.priya.stage3", ["edu-ncs-research-assistant"]]
      ],
      anjali: [
        ["path.anjali.stage1", ["edu-ignou-ug", "edu-nios-class12"]],
        ["path.anjali.stage2", ["edu-nsp-scholarship"]],
        ["path.anjali.stage3", ["cert-digital-skills"]]
      ]
    };
    const stageColors = ["cobalt", "vermilion", "marigold", "forest"];
    if (sampleStages[profileId]) {
      const used = new Set();
      const stages = sampleStages[profileId].map(([title, ids], index) => {
        const items = ids.map(id => matchById.get(id)).filter(Boolean);
        items.forEach(item => used.add(item.opportunity.id));
        return { title: t(title), color: stageColors[index % stageColors.length], items };
      }).filter(stage => stage.items.length > 0);
      const remaining = matches.filter(match => !used.has(match.opportunity.id));
      if (remaining.length) {
        stages.push({
          title: t("path.stage.more"),
          color: stageColors[stages.length % stageColors.length],
          items: remaining.slice(0, 2)
        });
      }
      return stages;
    }

    const selectedGoal = wizardGoals.find(option => option.id === profile.goal);
    const titles = [
      selectedGoal ? t(selectedGoal.label) : t("path.stage.first"),
      t("path.stage.second"), t("path.stage.third"), t("path.stage.more")
    ];
    const ranked = matches.slice(0, 8);
    const count = Math.min(4, Math.ceil(ranked.length / 2));
    return Array.from({ length: count }, (_, index) => ({
      title: titles[index],
      color: stageColors[index % stageColors.length],
      items: ranked.slice(index * 2, index * 2 + 2)
    }));
  }

  function renderPath(isProfileSwitch = false) {
    const app = document.getElementById("app-view");
    const profile = Storage.getProfile();
    const opps = window.OPPORTUNITIES || [];

    if (!profile) {
      window.location.hash = "#/start";
      return;
    }

    Storage.setTrackerProgress("profile-created", true);
    Storage.setTrackerProgress("goal-chosen", Boolean(profile.goal));
    Storage.setTrackerProgress("path-reviewed", true);
    const matches = getPathMatches(profile, opps);
    const stages = getPathStages(profile, matches);
    const selectedGoal = wizardGoals.find(option => option.id === profile.goal);
    const educationLabel = t(`tag.edu.${profile.education}`);
    const skills = (Array.isArray(profile.skills) ? profile.skills : [])
      .filter(Boolean).map(skill => {
        const key = `wizard.skill.${String(skill).toLowerCase()}`;
        return t(key) === key ? String(skill) : t(key);
      });
    const demoProfiles = window.PROFILES || [];
    const profileId = demoProfiles.find(item => item.name === profile.name)?.id;
    const avatarScenes = { sunita: "tailor", priya: "scholar", anjali: "learner" };
    const tracker = Storage.getTrackerProgress();
    const savedIds = Storage.getSavedOpportunities();
    const applicationStarted = Boolean(tracker["application-started"]);
    const journeySteps = [
      ["profile-created", t("path.progress.profile")],
      ["goal-chosen", t("path.progress.goal")],
      ["path-reviewed", t("path.progress.reviewed")],
      ["first-saved", t("path.progress.saved")],
      ["application-started", t("path.progress.application")]
    ];

    app.innerHTML = `
      <section class="path-page ${isProfileSwitch ? "path-page--switch" : ""}">
        <header class="path-hero">
          <div class="container path-hero-inner">
            <div class="path-heading">
              <span class="tag tag--opportunity">${t("tagline.sakhi")}</span>
              <h1>${t("path.hello").replace("{name}", escapeHtml(profile.name || t("nav.journey")))}</h1>
              <div class="path-profile-chips">
                <span class="path-profile-chip">${escapeHtml(educationLabel)}</span>
                ${skills.slice(0, 3).map(skill => `<span class="path-profile-chip">${escapeHtml(skill)}</span>`).join("")}
                <span class="path-profile-chip">${escapeHtml(profile.district || profile.location || "India")}</span>
                <span class="path-profile-chip">${selectedGoal ? t(selectedGoal.label) : escapeHtml(profile.goal || "")}</span>
                <a class="path-edit-link" href="#/start">${t("path.edit")}</a>
              </div>
            </div>
            <div class="path-sample-switch">
              <p>${t("path.tryAnother")}</p>
              <div class="path-sample-list">
                ${demoProfiles.map(sample => `
                  <button class="path-sample-chip ${profileId === sample.id ? "is-current" : ""}"
                    type="button" onclick="window.switchPathProfile('${sample.id}')"
                    aria-pressed="${profileId === sample.id}">
                    <span class="path-sample-avatar">${window.ART ? window.ART.scene(avatarScenes[sample.id]) : ""}</span>
                    <span>${escapeHtml(sample.name)}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          </div>
          <svg class="path-wave" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 C150 42 350 48 500 24 C650 0 850 44 1050 22 C1150 11 1200 32 1200 48 L1200 48 L0 48Z" fill="var(--color-cream)"></path>
          </svg>
        </header>
        <div class="container path-layout">
          <main class="path-main">
            <div class="path-section-heading">
              <h2>${t("path.yourPath")}</h2>
              <p>${t("route.path.desc")}</p>
            </div>
            <div class="path-stages">
              <svg class="path-road" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
                <path class="path-road-base journey-path" d="M50 0 C50 70 15 90 18 170 C20 250 80 255 80 340 C80 425 20 440 20 520 C20 600 80 615 80 700 C80 790 45 815 50 1000"></path>
                <path class="path-road-center journey-path" d="M50 0 C50 70 15 90 18 170 C20 250 80 255 80 340 C80 425 20 440 20 520 C20 600 80 615 80 700 C80 790 45 815 50 1000"></path>
                <circle cx="18" cy="170" r="8" fill="var(--color-marigold)"></circle>
                <circle cx="80" cy="340" r="8" fill="var(--color-marigold)"></circle>
                <circle cx="20" cy="520" r="8" fill="var(--color-marigold)"></circle>
                <circle cx="80" cy="700" r="8" fill="var(--color-marigold)"></circle>
              </svg>
              ${stages.map((stage, index) => `
                <section class="path-station path-station--${index % 2 ? "right" : "left"} fade-up" style="--station-color:var(--color-${stage.color})">
                  <div class="path-station-number">${index + 1}</div>
                  <div class="path-station-figure" aria-hidden="true">${window.ART ? window.ART.scene(["tailor", "scholar", "learner", "teacher"][index % 4]) : ""}</div>
                  <div class="path-station-card">
                    <span class="path-station-kicker">${t("path.step").replace("{number}", index + 1)}</span>
                    <h3>${escapeHtml(stage.title)}</h3>
                    <div class="path-opportunities">
                      ${stage.items.map(({ opportunity, reasons }) => {
                        const saved = Storage.isSaved(opportunity.id);
                        return `
                          <article class="path-opportunity">
                            <div class="path-opportunity-meta">
                              <span class="tag tag--${escapeHtml(opportunity.pillar)}">${t(`pillar.${opportunity.pillar}`)}</span>
                              <span class="path-requirement">${t(`tag.edu.${opportunity.minEducation}`)}</span>
                            </div>
                            <h4><a href="#/opportunity/${encodeURIComponent(opportunity.id)}">${escapeHtml(opportunity.title)}</a></h4>
                            <p class="path-department">${escapeHtml(opportunity.department)}</p>
                            <h5>${t("path.whyFits")}</h5>
                            <ul class="path-reasons">
                              ${reasons.map(reason => `<li>${ICONS.check}<span>${escapeHtml(reason)}</span></li>`).join("")}
                            </ul>
                            <div class="path-opportunity-actions">
                              <button type="button" class="path-save ${saved ? "is-saved" : ""}"
                                onclick="window.toggleSaveOpportunity('${escapeHtml(opportunity.id)}')"
                                aria-label="${t(saved ? "btn.remove_save" : "btn.save")}">
                                ${ICONS.marigold}<span>${t(saved ? "path.saved" : "btn.save")}</span>
                              </button>
                              <a href="#/opportunity/${encodeURIComponent(opportunity.id)}" class="path-detail-link">${t("btn.view_details")}</a>
                            </div>
                            <details class="path-eligibility">
                              <summary>${t("path.eligible")}</summary>
                              <ul>${opportunity.eligibilityQuestions.map(question => `<li>${escapeHtml(question)}</li>`).join("")}</ul>
                              <p>${t("path.eligibilityNote")}</p>
                              <a href="#/apply/${encodeURIComponent(opportunity.id)}" data-application-start="true" class="path-guide-link">${t("path.applicationGuide")}</a>
                            </details>
                          </article>
                        `;
                      }).join("")}
                    </div>
                  </div>
                </section>
              `).join("")}
              <div class="path-finish">
                <div class="path-finish-arch">${window.ART ? window.ART.decor("marigold", { size: 68 }) : ""}</div>
                <h3>${t("path.finish")}</h3>
              </div>
            </div>
            <p class="path-demo-note">${t("notice.prototype")}</p>
          </main>
          <aside class="path-progress-panel">
            <h2>${t("path.progress.title")}</h2>
            <ol class="path-progress-list">
              ${journeySteps.map(([key, label]) => {
                const done = key === "first-saved" ? savedIds.length > 0
                  : key === "application-started" ? applicationStarted
                    : Boolean(tracker[key]);
                return `<li class="${done ? "is-complete" : ""}"><span class="path-progress-bead">${done ? ICONS.check : ""}</span><span>${label}</span></li>`;
              }).join("")}
            </ol>
            <button type="button" class="btn btn-outline path-sakhi-button" disabled>${t("path.askSakhi")}</button>
          </aside>
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
    const sampleScenes = { sunita: "tailor", priya: "scholar", anjali: "learner" };
    const profileName = (Storage.getProfile() || {}).name || "";

    app.innerHTML = `
      <section class="signin-layout">
        <div class="signin-welcome">
          <div class="signin-welcome-copy">
            <span class="tag tag--opportunity">${t("tagline.short")}</span>
            <h2>${t("signin.title")}</h2>
            <p>${t("signin.intro")}</p>
          </div>
          <div class="signin-arch-window" aria-hidden="true">
            ${window.ART ? window.ART.scene("doorway") : ""}
          </div>
        </div>
        <div class="signin-content">
          <div class="signin-form-card">
            <form id="signin-form" novalidate>
              <div class="wizard-field">
                <label class="wizard-field-label" for="signin-name">${t("signin.name")} <span aria-hidden="true">*</span></label>
                <input class="wizard-input" id="signin-name" name="name" type="text" autocomplete="given-name" value="${escapeHtml(profileName)}" required>
              </div>
              <div class="wizard-field">
                <label class="wizard-field-label" for="signin-email">${t("signin.nicknameEmail")}</label>
                <input class="wizard-input" id="signin-email" name="nickname-or-email" type="text" autocomplete="email">
              </div>
              <p class="signin-validation" id="signin-validation" role="status" aria-live="polite"></p>
              <button type="submit" class="btn btn-primary signin-continue">${t("signin.continue")} ${ICONS.arrowRight}</button>
              <p class="signin-privacy">${t("notice.privacy")}</p>
            </form>
          </div>
          <div class="signin-samples">
            <h2>${t("signin.samples")}</h2>
            <div class="signin-sample-list">
              ${profiles.map(profile => `
                <button type="button" class="signin-sample-chip" data-demo-profile="${escapeHtml(profile.id)}">
                  <span class="signin-sample-avatar" aria-hidden="true">
                    ${window.ART ? window.ART.scene(sampleScenes[profile.id] || "learner") : ""}
                  </span>
                  <span>${escapeHtml(profile.name)}</span>
                </button>
              `).join("")}
            </div>
            <p class="signin-sample-note">${t("signin.sampleNote")}</p>
          </div>
        </div>
      </section>
    `;

    const form = app.querySelector("#signin-form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const nameInput = app.querySelector("#signin-name");
      const name = nameInput.value.trim();
      const validation = app.querySelector("#signin-validation");
      if (!name) {
        validation.textContent = t("signin.nameRequired");
        validation.classList.add("is-visible");
        nameInput.focus();
        return;
      }

      Storage.saveProfile({ name });
      onboardingDraft = null;
      onboardingStep = 0;
      window.location.hash = "#/start";
    });

    app.querySelectorAll("[data-demo-profile]").forEach(button => button.addEventListener("click", () => {
      window.loadDemoProfile(button.dataset.demoProfile);
    }));
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
    const pathEls = document.querySelectorAll(".journey-path:not(.animated)");

    if (!("IntersectionObserver" in window)) {
      fadeEls.forEach(el => el.classList.add("visible"));
      pathEls.forEach(el => el.classList.add("animated"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("journey-path")) {
              entry.target.classList.add("animated");
            }
            const nestedPath = entry.target.querySelector && entry.target.querySelector(".journey-path");
            if (nestedPath) {
              nestedPath.classList.add("animated");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach(el => observer.observe(el));
    pathEls.forEach(el => observer.observe(el));
  }

  // --- Global Handlers ---
  window.toggleSaveOpportunity = function (id) {
    const isNowSaved = Storage.toggleSave(id);
    showToast(isNowSaved ? t("toast.saved") : t("toast.unsaved"));
    router(); // Re-render current view to reflect new state
  };

  function getDemoProfileData(found) {
    return {
      name: found.name,
      education: found.education,
      skills: found.skills,
      goal: found.goals[0] || "learn-skill",
      district: found.district,
      state: found.state,
      location: found.location,
      experienceYears: found.experienceYears,
      mode: found.mode,
      financialSupportNeeded: Boolean(found.financialSupportNeeded)
    };
  }

  window.switchPathProfile = function (profileId) {
    const found = (window.PROFILES || []).find(profile => profile.id === profileId);
    if (!found) return;
    Storage.saveProfile(getDemoProfileData(found));
    onboardingDraft = null;
    onboardingStep = 0;
    renderNavbar();
    renderPath(true);
  };

  window.loadDemoProfile = function (profileId) {
    const profiles = window.PROFILES || [];
    const found = profiles.find(p => p.id === profileId);
    if (found) {
      Storage.saveProfile(getDemoProfileData(found));
      onboardingDraft = null;
      onboardingStep = 0;
      showToast(`${found.name}'s profile loaded!`);
      renderNavbar();
      window.location.hash = "#/path";
    }
  };

  document.getElementById("app-view").addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target : null;
    const applicationLink = target && target.closest("[data-application-start]");
    if (applicationLink) {
      Storage.setTrackerProgress("application-started", true);
    }

    const homeLink = target && target.closest('a[href="#three-women"]');
    if (homeLink) {
      event.preventDefault();
      const section = document.getElementById("three-women");
      if (section) {
        section.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
      }
    }
  });

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
