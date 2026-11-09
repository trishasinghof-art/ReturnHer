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

      // --- Hero Specific Copy ---
      "hero.label": "For women across India · Discover. Learn. Get Certified. Earn.",
      "hero.desc": "ReturnHer finds government-supported ways to study, get certified and earn, matched to your education, skills and district.",
      "hero.btn_path": "Show me my path",
      "hero.btn_women": "Meet three women",
      "hero.tap_hint": "Tap a woman to see her path.",

      // --- Three Women Quotes & Actions ---
      "quote.sunita": "I have sewn for five years, but I have no certificate and no steady work.",
      "quote.priya": "I finished my MSc, but I could not afford to continue to a PhD.",
      "quote.anjali": "I paused after Class 12 and I want to complete my graduation.",
      "btn.see_path": "See {name}'s path",

      // --- How It Works Steps ---
      "how.step1.title": "Tell us what you want to achieve",
      "how.step1.desc": "Share your current education, skills you hold, and your district. No Aadhaar. No phone number.",
      "how.step2.title": "We map your path and show why it fits you",
      "how.step2.desc": "Explore matched degrees, certificates, and stipends in your district.",
      "how.step3.title": "Check, prepare and apply on the official site",
      "how.step3.desc": "Clear checklist of required documents and direct links to official schemes.",

      // --- Promises ---
      "promise.1.title": "We only point to official sources.",
      "promise.1.desc": "Every opportunity links directly to verified government ministries, UGC, or NSDC portals. No intermediaries.",
      "promise.2.title": "We never ask for Aadhaar or your phone number.",
      "promise.2.desc": "Your qualification, district, and goals remain on this device in your browser. We do not store or sell your identity.",
      "promise.3.title": "Final eligibility is always decided by the official authority.",
      "promise.3.desc": "ReturnHer guides and prepares your papers. The respective department or university confirms your admission and grant.",

      // --- Maker Note ---
      "maker.title": "A note from the maker",
      "maker.placeholder": "[Replace this with 2 lines in your own words: why you built ReturnHer.]",
      "maker.signoff": "Handcrafted for Indian women restarting their journey",

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
      "signin.title": "Welcome. Take your time.",
      "signin.intro": "ReturnHer helps you find government-supported ways to study, get certified and earn. A new chapter can begin with one small step.",
      "signin.name": "First name",
      "signin.nicknameEmail": "Nickname or email (optional)",
      "signin.continue": "Continue",
      "signin.samples": "Or meet a sample woman",
      "signin.sampleNote": "Their stories are here to help you picture your own path.",
      "signin.nameRequired": "Please share your first name so we know what to call you.",

      "wizard.progress": "Step {step} of 5",
      "wizard.next": "Next",
      "wizard.edit": "Edit",
      "wizard.build": "Build my path",
      "wizard.saved": "Your path is ready to begin.",
      "wizard.goal.title": "What would you like to achieve?",
      "wizard.goal.subtitle": "Choose one. You can change it any time.",
      "wizard.goal.required": "Choose the goal that feels right for you. You can change it any time.",
      "wizard.goal.education": "Complete my education",
      "wizard.goal.research": "Pursue research or a PhD",
      "wizard.goal.skill": "Learn a new skill",
      "wizard.goal.certify": "Get my existing skill certified",
      "wizard.goal.teach": "Teach other women",
      "wizard.goal.job": "Find a government job",
      "wizard.goal.earn": "Start earning from home",
      "wizard.goal.business": "Start my own business",
      "wizard.education.title": "Where are you in your studies?",
      "wizard.education.subtitle": "There is no wrong place to begin.",
      "wizard.education.welcome": "Every starting point is welcome.",
      "wizard.education.class10": "Class 10",
      "wizard.education.class12": "Class 12",
      "wizard.education.graduate": "Graduate",
      "wizard.education.postgraduate": "Postgraduate",
      "wizard.skills.title": "Do you have a skill or experience?",
      "wizard.skills.subtitle": "Every skill has a story. Pick all that feel like yours.",
      "wizard.skills.otherPrompt": "Tell us a little more about your skill",
      "wizard.skills.otherPlaceholder": "For example: mathematics, data analysis",
      "wizard.skill.tailoring": "Tailoring",
      "wizard.skill.embroidery": "Embroidery",
      "wizard.skill.cooking": "Cooking",
      "wizard.skill.teaching": "Teaching",
      "wizard.skill.beauty-wellness": "Beauty and wellness",
      "wizard.skill.computer-basics": "Computer basics",
      "wizard.skill.handicrafts": "Handicrafts",
      "wizard.skill.design": "Design",
      "wizard.skill.other": "Other",
      "wizard.experience.label": "Years of experience (optional)",
      "wizard.experience.skip": "Prefer not to say",
      "wizard.experience.0-1": "0–1 years",
      "wizard.experience.2-4": "2–4 years",
      "wizard.experience.5-9": "5–9 years",
      "wizard.experience.10+": "10+ years",
      "wizard.location.title": "Where are you?",
      "wizard.location.subtitle": "Your district helps us find nearby opportunities.",
      "wizard.location.state": "State",
      "wizard.location.district": "District",
      "wizard.location.districtPlaceholder": "Start typing or choose a district",
      "wizard.location.note": "We only use your district, never your address.",
      "wizard.learning.title": "How would you like to learn?",
      "wizard.learning.subtitle": "We will look for a way that fits your life.",
      "wizard.learning.question": "How would you like to learn?",
      "wizard.learning.online": "Online",
      "wizard.learning.inPerson": "In person",
      "wizard.learning.either": "Either",
      "wizard.learning.supportQuestion": "Would financial support matter for you?",
      "wizard.learning.yes": "Yes",
      "wizard.learning.notNecessary": "Not necessarily",
      "wizard.summary.title": "Your journey ticket",
      "wizard.summary.subtitle": "Here is the beginning of your path. Change anything you like.",
      "wizard.summary.note": "Your answers stay on this device. Your journey is yours to shape.",
      "wizard.ticket.label": "Your next chapter",
      "wizard.ticket.from": "From",
      "wizard.ticket.district": "In",
      "wizard.ticket.goal": "Going to",
      "wizard.ticket.skills": "Skills",
      "wizard.ticket.learning": "Learning",
      "wizard.ticket.support": "Financial support",
      "wizard.ticket.none": "We can discover them together.",
      "wizard.ticket.notSet": "Not set yet",

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

      // --- Hero Specific Copy ---
      "hero.label": "पूरे भारत की महिलाओं के लिए · खोजिए। सीखिए। प्रमाणपत्र पाइए। कमाइए।",
      "hero.desc": "ReturnHer आपकी शिक्षा, हुनर और ज़िले के अनुसार पढ़ाई, प्रमाणपत्र और कमाई के सरकारी रास्ते खोजता है।",
      "hero.btn_path": "मेरा रास्ता दिखाएँ",
      "hero.btn_women": "तीन महिलाओं से मिलिए",
      "hero.tap_hint": "किसी महिला पर टैप करके उनका सफ़र देखें।",

      // --- Three Women Quotes & Actions ---
      "quote.sunita": "मैंने पाँच साल तक सिलाई की है, पर मेरे पास कोई प्रमाणपत्र नहीं है और न ही कोई पक्का काम।",
      "quote.priya": "मैंने एमएससी पूरी कर ली, पर आर्थिक तंगी के कारण पीएचडी जारी नहीं रख सकी।",
      "quote.anjali": "12वीं के बाद मेरी पढ़ाई रुक गई थी, अब मैं अपना ग्रेजुएशन पूरा करना चाहती हूँ।",
      "btn.see_path": "{name} का रास्ता देखें",

      // --- How It Works Steps ---
      "how.step1.title": "आप बताइए आप क्या हासिल करना चाहती हैं",
      "how.step1.desc": "अपनी शिक्षा, अपने हुनर और ज़िले की जानकारी साझा करें। न आधार, न फ़ोन नंबर।",
      "how.step2.title": "हम आपके लिए रास्ता तैयार करते हैं और बताते हैं यह आपके अनुकूल क्यों है",
      "how.step2.desc": "अपने ज़िले में उपलब्ध डिग्री, प्रमाणपत्र और वजीफ़े के अवसर देखें।",
      "how.step3.title": "जाँचिए, तैयारी कीजिए और आधिकारिक सरकारी पोर्टल पर आवेदन कीजिए",
      "how.step3.desc": "ज़रूरी काग़ज़ात की स्पष्ट सूची और आधिकारिक सरकारी योजनाओं के सीधे लिंक।",

      // --- Promises ---
      "promise.1.title": "हम केवल आधिकारिक सरकारी स्रोतों के लिंक देते हैं।",
      "promise.1.desc": "हर अवसर सीधे सत्यापित सरकारी मंत्रालयों, यूजीसी या कौशल विकास पोर्टलों से जुड़ा है।",
      "promise.2.title": "हम कभी आधार या फ़ोन नंबर नहीं माँगते।",
      "promise.2.desc": "आपकी शिक्षा, ज़िला और लक्ष्य इसी डिवाइस पर सुरक्षित रहते हैं। हम आपकी पहचान कभी एकत्र या साझा नहीं करते।",
      "promise.3.title": "अंतिम पात्रता का निर्णय हमेशा संबंधित सरकारी विभाग करता है।",
      "promise.3.desc": "ReturnHer आपको तैयार करता है। दाखिले और अनुदान की पुष्टि संबंधित विभाग या विश्वविद्यालय करता है।",

      // --- Maker Note ---
      "maker.title": "निर्माता की ओर से",
      "maker.placeholder": "[इसे अपने शब्दों में 2 पंक्तियों से बदलें: आपने ReturnHer क्यों बनाया।]",
      "maker.signoff": "सफ़र दोबारा शुरू करने वाली भारतीय महिलाओं के लिए सप्रेम निर्मित",

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
      "signin.title": "स्वागत है। आराम से, अपने समय पर।",
      "signin.intro": "ReturnHer पढ़ाई, प्रमाणपत्र और कमाई के सरकारी रास्ते ढूँढने में आपकी मदद करता है। नए सफ़र की शुरुआत एक छोटे क़दम से हो सकती है।",
      "signin.name": "पहला नाम",
      "signin.nicknameEmail": "पुकारने का नाम या ईमेल (वैकल्पिक)",
      "signin.continue": "आगे बढ़ें",
      "signin.samples": "या किसी उदाहरण महिला से मिलिए",
      "signin.sampleNote": "उनकी कहानियाँ आपको अपना रास्ता सोचने में मदद करेंगी।",
      "signin.nameRequired": "कृपया अपना पहला नाम बताएँ, ताकि हम आपको सही नाम से बुला सकें।",

      "wizard.progress": "5 में से चरण {step}",
      "wizard.next": "आगे",
      "wizard.edit": "बदलें",
      "wizard.build": "मेरा रास्ता बनाएँ",
      "wizard.saved": "आपका रास्ता शुरू करने के लिए तैयार है।",
      "wizard.goal.title": "आप क्या हासिल करना चाहेंगी?",
      "wizard.goal.subtitle": "एक चुनें। आप इसे कभी भी बदल सकती हैं।",
      "wizard.goal.required": "जो लक्ष्य आपके लिए सही लगे, उसे चुनें। आप इसे कभी भी बदल सकती हैं।",
      "wizard.goal.education": "अपनी पढ़ाई पूरी करना",
      "wizard.goal.research": "शोध या पीएचडी करना",
      "wizard.goal.skill": "नया हुनर सीखना",
      "wizard.goal.certify": "अपने हुनर का प्रमाणपत्र पाना",
      "wizard.goal.teach": "दूसरी महिलाओं को सिखाना",
      "wizard.goal.job": "सरकारी नौकरी ढूँढना",
      "wizard.goal.earn": "घर से कमाई शुरू करना",
      "wizard.goal.business": "अपना कारोबार शुरू करना",
      "wizard.education.title": "आपकी पढ़ाई कहाँ तक हुई है?",
      "wizard.education.subtitle": "शुरुआत के लिए कोई जगह गलत नहीं होती।",
      "wizard.education.welcome": "हर शुरुआत का स्वागत है।",
      "wizard.education.class10": "कक्षा 10",
      "wizard.education.class12": "कक्षा 12",
      "wizard.education.graduate": "स्नातक",
      "wizard.education.postgraduate": "परास्नातक",
      "wizard.skills.title": "क्या आपके पास कोई हुनर या अनुभव है?",
      "wizard.skills.subtitle": "हर हुनर की अपनी कहानी है। जो आपके अपने लगें, वे चुनें।",
      "wizard.skills.otherPrompt": "अपने हुनर के बारे में थोड़ा और बताएँ",
      "wizard.skills.otherPlaceholder": "जैसे: गणित, डेटा विश्लेषण",
      "wizard.skill.tailoring": "सिलाई",
      "wizard.skill.embroidery": "कढ़ाई",
      "wizard.skill.cooking": "खाना बनाना",
      "wizard.skill.teaching": "पढ़ाना",
      "wizard.skill.beauty-wellness": "सौंदर्य और स्वास्थ्य",
      "wizard.skill.computer-basics": "कंप्यूटर की बुनियादी जानकारी",
      "wizard.skill.handicrafts": "हस्तशिल्प",
      "wizard.skill.design": "डिज़ाइन",
      "wizard.skill.other": "अन्य",
      "wizard.experience.label": "अनुभव के वर्ष (वैकल्पिक)",
      "wizard.experience.skip": "बताना नहीं चाहती",
      "wizard.experience.0-1": "0–1 वर्ष",
      "wizard.experience.2-4": "2–4 वर्ष",
      "wizard.experience.5-9": "5–9 वर्ष",
      "wizard.experience.10+": "10+ वर्ष",
      "wizard.location.title": "आप कहाँ रहती हैं?",
      "wizard.location.subtitle": "ज़िले से हमें आपके आस-पास के अवसर ढूँढने में मदद मिलेगी।",
      "wizard.location.state": "राज्य",
      "wizard.location.district": "ज़िला",
      "wizard.location.districtPlaceholder": "लिखना शुरू करें या ज़िला चुनें",
      "wizard.location.note": "हम केवल आपका ज़िला लेते हैं, घर का पता नहीं।",
      "wizard.learning.title": "आप कैसे सीखना चाहेंगी?",
      "wizard.learning.subtitle": "हम आपकी ज़िंदगी के अनुकूल रास्ता ढूँढेंगे।",
      "wizard.learning.question": "आप कैसे सीखना चाहेंगी?",
      "wizard.learning.online": "ऑनलाइन",
      "wizard.learning.inPerson": "केंद्र पर जाकर",
      "wizard.learning.either": "दोनों में से कोई भी",
      "wizard.learning.supportQuestion": "क्या आर्थिक सहायता आपके लिए ज़रूरी होगी?",
      "wizard.learning.yes": "हाँ",
      "wizard.learning.notNecessary": "ज़रूरी नहीं",
      "wizard.summary.title": "आपकी सफ़र-पर्ची",
      "wizard.summary.subtitle": "यह आपके रास्ते की शुरुआत है। आप जो चाहें बदल सकती हैं।",
      "wizard.summary.note": "आपके जवाब इसी डिवाइस पर रहते हैं। आपका सफ़र, आपकी पसंद।",
      "wizard.ticket.label": "आपका अगला अध्याय",
      "wizard.ticket.from": "शिक्षा",
      "wizard.ticket.district": "ज़िला",
      "wizard.ticket.goal": "मंज़िल",
      "wizard.ticket.skills": "हुनर",
      "wizard.ticket.learning": "सीखने का तरीक़ा",
      "wizard.ticket.support": "आर्थिक सहायता",
      "wizard.ticket.none": "हम साथ मिलकर हुनर खोज लेंगे।",
      "wizard.ticket.notSet": "अभी तय नहीं",

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
