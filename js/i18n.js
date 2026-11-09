/**
 * ReturnHer Internationalization (i18n)
 * Dual language support: English (en) and Hindi (hi).
 * Includes the full tagline bank and design copy from BRIEF.md.
 */

window.I18N = (function () {
  const STORAGE_KEY = "returnher_lang";

  const strings = {
    en: {
      // --- Brand & Tagline Bank (from BRIEF.md) ---
      "brand.name": "ReturnHer",
      "tagline.hero": "Your journey paused. Your opportunities didn't.",
      "tagline.short": "Begin again.",
      "tagline.strap": "Discover. Learn. Get Certified. Earn.",
      "tagline.women": "Three women. Three beginnings. One place to start.",
      "tagline.how": "Tell us. We'll map it. You'll walk it.",
      "tagline.ways": "Four ways in. All of them yours.",
      "tagline.edu": "Your seat in the classroom is still there.",
      "tagline.cert": "Let the certificate say what your hands already know.",
      "tagline.opp": 'From "I can" to "I earn".',
      "tagline.support": "Help exists. We'll help you find it.",
      "tagline.promise": "Bold about your dreams. Quiet about your data.",
      "tagline.cta": "Later can start today.",
      "tagline.cta-sub": "No rush. No judgment. Just your next step.",
      "tagline.sakhi": "Sakhi hai na!",
      "tagline.footer": 'For every woman who ever said "maybe later".',

      // --- Notices & Disclaimers ---
      "notice.prototype": "Prototype for demonstration. Opportunity entries are samples. Please confirm details on the official portals.",
      "notice.privacy": "No Aadhaar. No phone number. Your answers stay on this device.",
      "notice.source": "Built on official government sources.",
      "notice.official_only": "Official homepages only. Check details on the verified government portal.",

      // --- Navigation ---
      "nav.home": "Home",
      "nav.explore": "Explore",
      "nav.journey": "My Journey",
      "nav.signin": "Sign In",
      "nav.start": "Begin Journey",
      "nav.kit": "Sakhi Toolkit",
      "nav.toggle_language": "हिन्दी में बदलें",

      // --- Pillars ---
      "pillar.education": "Education",
      "pillar.education.desc": "Open schooling, distance college degrees, and research fellowships.",
      "pillar.certification": "Certification",
      "pillar.certification.desc": "Recognize your existing trade skills or learn modern vocational crafts.",
      "pillar.opportunity": "Opportunity",
      "pillar.opportunity.desc": "Stipend apprenticeships, trainer jobs, and artisan toolkits.",
      "pillar.support": "Support",
      "pillar.support.desc": "Collateral-free micro loans, women entrepreneurship, and SHG networks.",

      // --- Buttons & Common Actions ---
      "btn.begin": "Begin My Journey",
      "btn.explore": "Explore Opportunities",
      "btn.view_details": "View Details",
      "btn.save": "Save Opportunity",
      "btn.saved": "Saved in My Journey",
      "btn.remove_save": "Remove from Saved",
      "btn.apply_guide": "View Application Guide",
      "btn.visit_official": "Visit Official Portal",
      "btn.back": "Back",
      "btn.start_onboarding": "Find My Pathway",
      "btn.quick_profile": "Try Sample Profile",
      "btn.continue": "Continue",
      "btn.close": "Close",
      "btn.download_summary": "Save Offline Summary",

      // --- Routes & Page Placeholders ---
      "route.home.title": "ReturnHer",
      "route.home.subtitle": "Find government-supported ways to study, get certified and earn.",
      "route.home.select_profile": "Meet women who restarted their journey:",

      "route.start.title": "Tell Us Your Goal",
      "route.start.desc": "Answer a few gentle questions to map your pathway. No Aadhaar. No phone number. Your answers stay on this device.",
      "route.start.step1": "1. What is your current highest education?",
      "route.start.step2": "2. What skills or craft do you already know?",
      "route.start.step3": "3. What is your primary hope or goal?",
      "route.start.step4": "4. Which district and state are you from?",

      "route.path.title": "Your Personal Pathway",
      "route.path.desc": "A custom sequence crafted for your education, craft, and dream.",

      "route.explore.title": "Explore Verified Pathways",
      "route.explore.desc": "Browse all 4 pillars across education, certification, earning, and finance.",
      "route.explore.filter_all": "All Pillars",

      "route.opportunity.details": "Opportunity Details",
      "route.opportunity.what_you_get": "What You Get",
      "route.opportunity.eligibility": "Quick Eligibility Check (Indicative)",
      "route.opportunity.documents": "Documents You Will Need",
      "route.opportunity.steps": "Step-by-Step Path to Apply",
      "route.opportunity.official_link": "Official Government Portal",

      "route.apply.title": "Application Checklist & Guide",
      "route.apply.desc": "Step-by-step guidance before visiting the official portal.",

      "route.me.title": "My Journey",
      "route.me.desc": "Your saved opportunities, local profile, and progress tracker.",
      "route.me.no_saved": "You haven't saved any opportunities yet. Explore and tap the heart on any pathway!",
      "route.me.saved_count": "Saved Opportunities",
      "route.me.profile_title": "Active Profile",

      "route.signin.title": "Welcome to ReturnHer",
      "route.signin.desc": "Pick a sample profile to preview ReturnHer, or start fresh with your own story.",

      "route.kit.title": "Sakhi Offline Toolkit",
      "route.kit.desc": "Downloadable checklists, helpline contacts, and step-by-step paper guidance for your community.",

      // --- Tags & Meta ---
      "tag.mode.online": "Online / Distance",
      "tag.mode.offline": "In-Person Center",
      "tag.mode.both": "Flexible / Hybrid",
      "tag.edu.class10": "Class 10+",
      "tag.edu.class12": "Class 12+",
      "tag.edu.graduate": "Graduate+",
      "tag.edu.postgraduate": "Postgraduate+",

      "toast.saved": "Saved to My Journey!",
      "toast.unsaved": "Removed from My Journey",
      "toast.profile_loaded": "Profile loaded successfully!"
    },

    hi: {
      // --- Brand & Tagline Bank (from BRIEF.md) ---
      "brand.name": "ReturnHer",
      "tagline.hero": "सफ़र रुका था, मौके नहीं।",
      "tagline.short": "फिर से शुरू।",
      "tagline.strap": "खोजिए। सीखिए। प्रमाणपत्र पाइए। कमाइए।",
      "tagline.women": "तीन महिलाएँ, तीन नई शुरुआतें, शुरू करने की एक जगह।",
      "tagline.how": "आप बताइए, रास्ता हम बनाएँगे, चलेंगी आप।",
      "tagline.ways": "चार रास्ते, चारों आपके।",
      "tagline.edu": "कक्षा में आपकी सीट आज भी आपका इंतज़ार कर रही है।",
      "tagline.cert": "जो आपके हाथ जानते हैं, अब प्रमाणपत्र भी कहे।",
      "tagline.opp": '"मैं कर सकती हूँ" से "मैं कमाती हूँ" तक।',
      "tagline.support": "मदद मौजूद है, उसे ढूँढने में हम साथ हैं।",
      "tagline.promise": "सपनों की बात खुलकर, आपकी जानकारी की बात चुपचाप।",
      "tagline.cta": '"बाद में" आज से शुरू हो सकता है।',
      "tagline.cta-sub": "कोई जल्दी नहीं, कोई जजमेंट नहीं, बस अगला क़दम।",
      "tagline.sakhi": "सखी है ना!",
      "tagline.footer": 'हर उस महिला के लिए जिसने कभी कहा, "बाद में देखेंगे।"',

      // --- Notices & Disclaimers ---
      "notice.prototype": "प्रदर्शन के लिए प्रोटोटाइप। अवसरों के विवरण नमूने हैं। कृपया आधिकारिक पोर्टल पर विवरण की पुष्टि करें।",
      "notice.privacy": "न आधार, न फ़ोन नंबर। आपके जवाब इसी फ़ोन पर सुरक्षित हैं।",
      "notice.source": "आधिकारिक सरकारी स्रोतों पर आधारित।",
      "notice.official_only": "केवल आधिकारिक मुख्य पृष्ठ। विवरण की पुष्टि सत्यापित सरकारी पोर्टल पर करें।",

      // --- Navigation ---
      "nav.home": "होम",
      "nav.explore": "अवसर खोजें",
      "nav.journey": "मेरी यात्रा",
      "nav.signin": "शुरू करें",
      "nav.start": "सफ़र शुरू करें",
      "nav.kit": "सखी टूलकिट",
      "nav.toggle_language": "Switch to English",

      // --- Pillars ---
      "pillar.education": "शिक्षा",
      "pillar.education.desc": "ओपन स्कूलिंग, दूरस्थ विश्वविद्यालय डिग्री और शोध फ़ेलोशिप।",
      "pillar.certification": "प्रमाणपत्र",
      "pillar.certification.desc": "अपने हुनर को आधिकारिक मान्यता दिलाएँ या नया व्यावसायिक कौशल सीखें।",
      "pillar.opportunity": "अवसर",
      "pillar.opportunity.desc": "स्टाइपेंड अप्रेंटिसशिप, ट्रेनर नौकरियाँ और कारीगर टूलकिट।",
      "pillar.support": "सहयोग",
      "pillar.support.desc": "बिना गारंटी के मुद्रा ऋण, महिला उद्यमिता और स्वयं सहायता समूह।",

      // --- Buttons & Common Actions ---
      "btn.begin": "अपना सफ़र शुरू करें",
      "btn.explore": "सारे रास्ते देखें",
      "btn.view_details": "पूरा विवरण देखें",
      "btn.save": "अवसर सुरक्षित करें",
      "btn.saved": "मेरी यात्रा में सुरक्षित",
      "btn.remove_save": "सुरक्षित सूची से हटाएँ",
      "btn.apply_guide": "आवेदन मार्गदर्शिका",
      "btn.visit_official": "आधिकारिक पोर्टल पर जाएँ",
      "btn.back": "वापस जाएँ",
      "btn.start_onboarding": "मेरा रास्ता ढूँढें",
      "btn.quick_profile": "नमूना प्रोफ़ाइल देखें",
      "btn.continue": "आगे बढ़ें",
      "btn.close": "बंद करें",
      "btn.download_summary": "ऑफ़लाइन सारांश सहेजें",

      // --- Routes & Page Placeholders ---
      "route.home.title": "ReturnHer",
      "route.home.subtitle": "पढ़ाई, हुनर का प्रमाण और कमाई के सरकारी रास्ते खोजिए।",
      "route.home.select_profile": "उन महिलाओं से मिलिए जिन्होंने दोबारा शुरुआत की:",

      "route.start.title": "अपनी बात बताइए",
      "route.start.desc": "कुछ सरल सवालों के जवाब दीजिए। न आधार, न फ़ोन नंबर। आपके जवाब इसी डिवाइस में सुरक्षित रहेंगे।",
      "route.start.step1": "1. आपकी अब तक की शिक्षा क्या है?",
      "route.start.step2": "2. आप कौन सा हुनर या काम जानती हैं?",
      "route.start.step3": "3. आपका मुख्य सपना या लक्ष्य क्या है?",
      "route.start.step4": "4. आप किस ज़िले और राज्य से हैं?",

      "route.path.title": "आपका व्यक्तिगत रास्ता",
      "route.path.desc": "आपकी शिक्षा, हुनर और लक्ष्य के अनुसार तैयार की गई रूपरेखा।",

      "route.explore.title": "सत्यापित अवसर खोजें",
      "route.explore.desc": "शिक्षा, प्रमाणीकरण, कमाई और ऋण के चारों स्तंभों को देखें।",
      "route.explore.filter_all": "सभी स्तंभ",

      "route.opportunity.details": "अवसर विवरण",
      "route.opportunity.what_you_get": "आपको क्या मिलेगा",
      "route.opportunity.eligibility": "पात्रता जाँच (संकेतात्मक)",
      "route.opportunity.documents": "ज़रूरी दस्तावेज़",
      "route.opportunity.steps": "आवेदन करने के चरण",
      "route.opportunity.official_link": "आधिकारिक सरकारी पोर्टल",

      "route.apply.title": "आवेदन चेकलिस्ट और गाइड",
      "route.apply.desc": "आधिकारिक पोर्टल पर जाने से पहले की चरणबद्ध तैयारी।",

      "route.me.title": "मेरी यात्रा",
      "route.me.desc": "आपके सहेजे गए अवसर, प्रोफ़ाइल और प्रगति।",
      "route.me.no_saved": "आपने अभी तक कोई अवसर सुरक्षित नहीं किया है। किसी भी अवसर पर दिल के निशान को दबाएँ!",
      "route.me.saved_count": "सहेजे गए अवसर",
      "route.me.profile_title": "सक्रिय प्रोफ़ाइल",

      "route.signin.title": "ReturnHer में आपका स्वागत है",
      "route.signin.desc": "एक उदाहरण प्रोफ़ाइल चुनें या अपनी जानकारी के साथ शुरुआत करें।",

      "route.kit.title": "सखी ऑफ़लाइन टूलकिट",
      "route.kit.desc": "समुदाय के लिए डाउनलोड करने योग्य चेकलिस्ट, हेल्पलाइन नंबर और मार्गदर्शिका।",

      // --- Tags & Meta ---
      "tag.mode.online": "ऑनलाइन / दूरस्थ",
      "tag.mode.offline": "केंद्र पर उपस्थित होकर",
      "tag.mode.both": "सुविधाजनक / दोनों",
      "tag.edu.class10": "कक्षा 10+",
      "tag.edu.class12": "कक्षा 12+",
      "tag.edu.graduate": "स्नातक+",
      "tag.edu.postgraduate": "परास्नातक+",

      "toast.saved": "मेरी यात्रा में सुरक्षित किया गया!",
      "toast.unsaved": "सहेजी गई सूची से हटाया गया",
      "toast.profile_loaded": "प्रोफ़ाइल सफलतापूर्वक लोड की गई!"
    }
  };

  let currentLang = "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") {
      currentLang = saved;
    }
  } catch (e) {
    console.warn("localStorage unavailable for i18n", e);
  }

  function getLanguage() {
    return currentLang;
  }

  function setLanguage(lang) {
    if (lang === "en" || lang === "hi") {
      currentLang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        // ignore
      }
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
      window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
    }
  }

  function t(key, fallback = "") {
    const dict = strings[currentLang] || strings.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    if (strings.en && strings.en[key] !== undefined) {
      return strings.en[key];
    }
    return fallback || key;
  }

  // Set initial html lang attribute
  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute("data-lang", currentLang);

  return {
    t: t,
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    strings: strings
  };
})();

// Global shortcut for easy usage in templates
window.t = window.I18N.t;

