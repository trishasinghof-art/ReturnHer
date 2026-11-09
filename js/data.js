/**
 * ReturnHer Data Source
 * Single source of truth for pillars, sample opportunities, and starter profiles.
 * Loaded synchronously via <script> tag - works offline and via file://.
 */

window.PILLARS = {
  education: {
    id: "education",
    labelKey: "pillar.education",
    color: "#2B59D9", // cobalt
    tint: "#E8EEFA",
    border: "#2B59D9",
    taglineKey: "tagline.edu",
    icon: "books"
  },
  certification: {
    id: "certification",
    labelKey: "pillar.certification",
    color: "#D2401F", // vermilion
    tint: "#FDEEEA",
    border: "#D2401F",
    taglineKey: "tagline.cert",
    icon: "certificate"
  },
  opportunity: {
    id: "opportunity",
    labelKey: "pillar.opportunity",
    color: "#FFC21A", // marigold
    tint: "#FFF8E6",
    border: "#FFC21A",
    taglineKey: "tagline.opp",
    icon: "sun"
  },
  support: {
    id: "support",
    labelKey: "pillar.support",
    color: "#0E4B33", // forest
    tint: "#E7EFEA",
    border: "#0E4B33",
    taglineKey: "tagline.support",
    icon: "hands"
  }
};

window.OPPORTUNITIES = [
  // --- EDUCATION ---
  {
    id: "edu-ignou-ug",
    title: "Undergraduate Degree Programs (IGNOU)",
    pillar: "education",
    type: "Open & Distance Higher Education",
    department: "Indira Gandhi National Open University (IGNOU)",
    states: "All India",
    minEducation: "class12",
    skillTags: ["academic study", "self-paced learning", "degree completion"],
    goalTags: ["finish-education"],
    mode: "both",
    whatYouGet: "Access to accredited Bachelor's degree curriculums with flexible multi-entry and multi-exit study options. Includes printed study materials, regional center counselling, and recognized university qualifications.",
    eligibilityQuestions: [
      "Have you passed Class 12 or an equivalent qualification recognized by an Indian education board?",
      "Are you seeking flexible study schedules that accommodate family responsibilities?",
      "Do you want to confirm your chosen degree program recognition via the UGC-DEB portal?"
    ],
    documents: [
      "Class 10 marksheet or certificate for age verification",
      "Class 12 passing certificate and marksheet",
      "Valid identity card (Voter ID, Ration card, or equivalent)",
      "Recent passport-sized photographs"
    ],
    steps: [
      "Review accredited undergraduate options and confirm recognition via the UGC-DEB portal.",
      "Register an applicant profile on the official open university admission system.",
      "Select your regional study centre and upload verified qualification documents.",
      "Submit program fees and receive your student enrollment credentials.",
      "Collect course modules and attend scheduled academic counselling at your study centre."
    ],
    officialUrl: "https://ignou.ac.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "edu-nios-class12",
    title: "Secondary & Senior Secondary Open Schooling (NIOS)",
    pillar: "education",
    type: "Open Schooling Certification",
    department: "National Institute of Open Schooling (NIOS)",
    states: "All India",
    minEducation: "class10",
    skillTags: ["foundational education", "board exam", "self-learning"],
    goalTags: ["finish-education"],
    mode: "both",
    whatYouGet: "Recognized Senior Secondary certification through self-paced learning with flexible exam schedules. Open to learners seeking to complete schooling without daily classroom attendance.",
    eligibilityQuestions: [
      "Have you passed Class 10 or secondary school examination from a recognized board?",
      "Are you seeking to resume your schooling after a pause in education?",
      "Do you prefer self-paced study with choices between multiple exam sessions each year?"
    ],
    documents: [
      "Class 10 passing certificate and marksheet",
      "Proof of date of birth (birth certificate or school leaving certificate)",
      "Identity verification document (Voter ID, Ration card, or equivalent)",
      "Recent passport-size colour photograph"
    ],
    steps: [
      "Select your preferred stream of study and chosen language subjects.",
      "Register on the student admission portal and choose your nearest Accredited Institution (AI).",
      "Upload scanned copies of previous school marksheets and identity proofs.",
      "Receive printed self-instructional course modules by post.",
      "Appear for continuous tutor-marked assignments and periodic public examinations."
    ],
    officialUrl: "https://nios.ac.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "edu-nsp-scholarship",
    title: "National Scholarship Portal Higher Education Schemes",
    pillar: "education",
    type: "Higher Education Financial Assistance",
    department: "Ministry of Education & Central Ministries",
    states: "All India",
    minEducation: "class12",
    skillTags: ["financial assistance", "higher education", "student support"],
    goalTags: ["finish-education"],
    mode: "online",
    whatYouGet: "Direct scholarship support for eligible students enrolled in recognized colleges and universities. Assists with course fees and educational maintenance expenses throughout degree completion.",
    eligibilityQuestions: [
      "Are you enrolled or taking admission in a recognized degree, diploma, or technical program?",
      "Does your family income fall within the financial eligibility criteria of government scholarship norms?",
      "Do you hold valid admission and academic credentials from your educational institution?"
    ],
    documents: [
      "Institutional enrollment / admission verification certificate",
      "Previous academic year marksheets and scorecards",
      "Family income certificate issued by a competent revenue authority",
      "Student bank passbook details in applicant's own name"
    ],
    steps: [
      "Check scheme guidelines and verify your institution's registration on the national portal.",
      "Register a single student account on the National Scholarship Portal.",
      "Complete the multi-section online application with academic and bank information.",
      "Submit uploaded documents for college level verification and nodal officer review.",
      "Track application validation and grant disbursement status through your portal dashboard."
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "edu-ugc-phd",
    title: "Regular & Part-Time Doctoral Admissions (UGC Recognized)",
    pillar: "education",
    type: "Doctoral Research Program",
    department: "University Grants Commission (UGC)",
    states: "All India",
    minEducation: "postgraduate",
    skillTags: ["academic research", "mathematics", "literature", "sciences"],
    goalTags: ["research-phd"],
    mode: "offline",
    whatYouGet: "Guided doctoral research opportunities at recognized universities with research supervision. Note: Distance or fully online PhD programs are not permitted under UGC regulations, ensuring full academic rigor through regular or part-time campus engagement.",
    eligibilityQuestions: [
      "Do you hold a Master's degree in your discipline with minimum qualifying marks from an accredited university?",
      "Have you qualified for national research eligibility tests (such as NET/JRF or university entrance tests)?",
      "Are you prepared to conduct in-person coursework and regular supervisor consultations on campus?"
    ],
    documents: [
      "Postgraduate and undergraduate marksheets and degree certificates",
      "National testing agency score card (NET / CSIR / GATE where applicable)",
      "Detailed preliminary research proposal or statement of research interest",
      "No Objection Certificate (NOC) from employer if applying for part-time research"
    ],
    steps: [
      "Verify university recognition and department accreditation through the UGC regulatory portal.",
      "Review university doctoral notifications and submit your research synopsis.",
      "Appear for research eligibility interview and departmental presentations.",
      "Complete mandatory institutional coursework and residency requirements.",
      "Pursue supervised doctoral research toward doctoral thesis submission."
    ],
    officialUrl: "https://deb.ugc.ac.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "edu-doctoral-fellowship",
    title: "Common Fellowship Portal for Doctoral Research",
    pillar: "education",
    type: "Doctoral & Post-Doctoral Fellowship",
    department: "Department of Science & Technology / Ministry of Education",
    states: "All India",
    minEducation: "postgraduate",
    skillTags: ["scientific research", "humanities", "data analysis", "fellowship"],
    goalTags: ["research-phd"],
    mode: "both",
    whatYouGet: "Unified application avenue for national research fellowships across sciences, humanities, and social sciences. Provides recurring research fellowship stipends and annual contingency allowances for full-time researchers.",
    eligibilityQuestions: [
      "Have you obtained a Master's degree and secured admission or an offer letter for regular doctoral research?",
      "Are you seeking competitive financial fellowship support to fund your full-time research work?",
      "Are you not currently receiving another central or state funded scholarship for the same degree?"
    ],
    documents: [
      "Proof of Master's degree completion and percentage verification",
      "Official admission or registration certificate from the doctoral institution",
      "Endorsement certificate signed by the research guide and head of institution",
      "Curriculum vitae and comprehensive research plan"
    ],
    steps: [
      "Browse active national fellowship schemes under the single unified portal window.",
      "Complete applicant profile registration with academic and institutional affiliation.",
      "Upload institutional recommendation and proposed research outline.",
      "Submit application for peer committee assessment and evaluation.",
      "Track sanction letters and monthly fellowship claims through the nodal research office."
    ],
    officialUrl: "https://fellowships.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "edu-ncs-research-assistant",
    title: "Research & Project Assistant Positions",
    pillar: "education",
    type: "Academic Project Engagement",
    department: "National Career Service / Research Institutions",
    states: "All India",
    minEducation: "graduate",
    skillTags: ["data collection", "lab assistance", "academic writing", "fieldwork"],
    goalTags: ["research-phd", "govt-job"],
    mode: "both",
    whatYouGet: "Institutional research roles under funded faculty and departmental projects. Offers hands-on research experience, project stipends, and valuable academic credentials for higher research pathways.",
    eligibilityQuestions: [
      "Do you possess a Bachelor's or Master's degree relevant to the research project discipline?",
      "Are you keen to build academic publication and research laboratory experience?",
      "Are you comfortable handling field documentation, data entry, or experimental protocols?"
    ],
    documents: [
      "Relevant graduation or post-graduation degree certificates",
      "Updated curriculum vitae detailing academic achievements and coursework",
      "Letters of reference or academic recommendation",
      "Valid government-issued photo identity card"
    ],
    steps: [
      "Search research and junior project openings on the National Career Service portal.",
      "Match candidate requirements with your specialized subject background.",
      "Submit your application and statement of interest directly to the project authority.",
      "Attend technical interview or screening assessment at the host institution.",
      "Join the research project team and contribute to experimental investigations."
    ],
    officialUrl: "https://ncs.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },

  // --- CERTIFICATION ---
  {
    id: "cert-jss-tailoring",
    title: "Tailoring & Garment Construction Training (JSS)",
    pillar: "certification",
    type: "Community Skill Training",
    department: "Jan Shikshan Sansthan / MSDE",
    states: "All India",
    minEducation: "class10",
    skillTags: ["tailoring", "embroidery", "garment-making", "cutting"],
    goalTags: ["learn-skill", "earn-from-home", "start-business"],
    mode: "offline",
    whatYouGet: "Hands-on, community-based vocational training in garment design, machine operation, and stitching techniques. Designed to empower women with practical trade skills in their local neighbourhoods.",
    eligibilityQuestions: [
      "Are you interested in learning or polishing machine stitching and garment assembly skills?",
      "Can you attend hands-on practical workshop batches in your district or block centre?",
      "Are you looking to earn an independent income through home tailoring or custom stitching?"
    ],
    documents: [
      "Proof of age or schooling marksheet (Class 10 or prior)",
      "Local address verification (Ration card, Voter ID, or utility bill)",
      "Passport size photographs for workshop identity badge"
    ],
    steps: [
      "Locate your district Jan Shikshan Sansthan center on Skill India Digital.",
      "Select the garment construction and cutting batch timings that match your schedule.",
      "Complete enrollment at the district centre and receive training fabric kits.",
      "Attend structured practical lessons under master tailors and craft instructors.",
      "Receive an official Skill India trade completion certificate upon practical evaluation."
    ],
    officialUrl: "https://skillindiadigital.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "cert-rpl-tailoring",
    title: "Recognition of Prior Learning (RPL) Skill Certification",
    pillar: "certification",
    type: "Skill Assessment & Credentialing",
    department: "Skill India Digital / Sector Skill Councils",
    states: "All India",
    minEducation: "class10",
    skillTags: ["tailoring", "embroidery", "handicrafts", "quality-check"],
    goalTags: ["certify-skill", "teach-others"],
    mode: "both",
    whatYouGet: "Formal national recognition and certification for skills you have already developed over years of self-practice. Validates your craft mastery to unlock trainer openings and institutional contracts.",
    eligibilityQuestions: [
      "Do you have existing practical work experience in your craft or trade?",
      "Can you demonstrate your skill techniques in an objective practical assessment?",
      "Do you want an official certificate that proves your professional capability?"
    ],
    documents: [
      "Identity proof (Voter ID, PAN card, or Ration card)",
      "Self-declaration or proof of existing trade practice and years of experience",
      "Recent passport-sized photographs"
    ],
    steps: [
      "Search for Recognition of Prior Learning (RPL) batches on Skill India Digital.",
      "Register your existing trade skills and upload basic verification documents.",
      "Attend a short orientation session covering industry standards and digital tools.",
      "Take the practical skill assessment and oral evaluation before an assessor.",
      "Receive your nationally recognized Skill India RPL certificate and digital credential."
    ],
    officialUrl: "https://skillindiadigital.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "cert-digital-skills",
    title: "Digital Literacy & Essential Computer Training",
    pillar: "certification",
    type: "Digital Enablement Course",
    department: "Skill India Digital",
    states: "All India",
    minEducation: "class10",
    skillTags: ["computers", "internet", "digital-payments", "office-tools"],
    goalTags: ["learn-skill", "earn-from-home"],
    mode: "both",
    whatYouGet: "Foundational training in computer fundamentals, online commerce, mobile payments, and internet safety. Equips you to comfortably use digital tools for daily trade, documentation, and remote opportunities.",
    eligibilityQuestions: [
      "Are you keen to build confidence using computers, smartphones, and the internet?",
      "Would you like to manage online payments and customer orders digitally?",
      "Are you able to dedicate study time to self-paced or center-based modules?"
    ],
    documents: [
      "Identity proof (Voter card or alternative photo ID)",
      "Educational record (Class 10 marksheet or self-attested proof)",
      "Passport size photograph"
    ],
    steps: [
      "Sign in to the Skill India Digital learning catalog.",
      "Choose beginner digital literacy courses in your preferred regional language.",
      "Learn interactive lessons on typing, digital payments, and online portals.",
      "Complete unit quizzes and practice mock online transactions.",
      "Download your course completion e-certificate directly to your device."
    ],
    officialUrl: "https://skillindiadigital.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },

  // --- OPPORTUNITY ---
  {
    id: "opp-apprenticeship",
    title: "National Apprenticeship Promotion Scheme (NAPS)",
    pillar: "opportunity",
    type: "On-the-Job Paid Apprenticeship",
    department: "Ministry of Skill Development and Entrepreneurship",
    states: "All India",
    minEducation: "class10",
    skillTags: ["practical trade", "shopfloor", "technical skills", "industry-exposure"],
    goalTags: ["learn-skill", "govt-job"],
    mode: "offline",
    whatYouGet: "Structured on-the-job industrial apprenticeship with a monthly training stipend. Gain real workplace experience inside registered manufacturing and service establishments.",
    eligibilityQuestions: [
      "Are you at least 14 years old and looking for on-the-job industrial exposure?",
      "Have you completed the minimum educational threshold required by the sponsoring trade?",
      "Can you commit to regular attendance at the designated industry establishment?"
    ],
    documents: [
      "Class 10 or relevant trade education certificates",
      "Valid photo identification card",
      "Bank account passbook for direct stipend transfers",
      "Recent passport photographs"
    ],
    steps: [
      "Create an apprentice candidate profile on the national apprenticeship portal.",
      "Search trade contracts in your home district or nearby industrial hubs.",
      "Apply directly to verified enterprise apprenticeship notifications.",
      "Sign an apprenticeship contract and verify your training schedule.",
      "Complete on-the-job training, collect monthly stipends, and earn trade certification."
    ],
    officialUrl: "https://apprenticeshipindia.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "opp-ncs-trainer",
    title: "Vocational Trainer & Employment Openings (NCS)",
    pillar: "opportunity",
    type: "Career Opportunities & Trainer Roles",
    department: "National Career Service / Ministry of Labour & Employment",
    states: "All India",
    minEducation: "class12",
    skillTags: ["teaching", "tailoring", "vocational-training", "communication"],
    goalTags: ["teach-others", "govt-job"],
    mode: "both",
    whatYouGet: "Access to nationwide vacancies for vocational trainers, community instructors, and institutional roles. Direct matching with registered employers, skill centers, and district employment exchanges.",
    eligibilityQuestions: [
      "Do you have practical skill expertise and an enthusiasm for teaching other women?",
      "Do you meet the experience or certification requirements specified by the training institute?",
      "Are you seeking part-time or full-time employment within your local region?"
    ],
    documents: [
      "Class 12 / Diploma / Trade certification credentials",
      "Skill qualification or RPL certificates",
      "Curriculum vitae highlighting teaching or trade background",
      "Valid identity proof"
    ],
    steps: [
      "Register as a jobseeker on the National Career Service platform.",
      "Fill out your skills, educational qualifications, and preferred work district.",
      "Filter active vacancies for trainer, instructor, and community mobilization posts.",
      "Apply to short-listed openings and receive direct interview communications.",
      "Participate in employer screening sessions and finalize job engagements."
    ],
    officialUrl: "https://ncs.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "opp-pm-vishwakarma",
    title: "PM Vishwakarma Scheme (Tailoring & Traditional Trades)",
    pillar: "opportunity",
    type: "Artisan Support & Modern Toolkit",
    department: "Ministry of MSME",
    states: "All India",
    minEducation: "class10",
    skillTags: ["tailoring", "crafts", "garment-repair", "toolkit-upgrade"],
    goalTags: ["certify-skill", "start-business", "earn-from-home"],
    mode: "offline",
    whatYouGet: "Holistic recognition for traditional artisans, including Darzi (tailor) trade recognition, skill upgradation, modern toolkit incentive support, and access to collateral-free enterprise credit.",
    eligibilityQuestions: [
      "Are you actively practicing one of the 18 traditional family-based trades (such as tailoring)?",
      "Are you seeking modern equipment or toolkits to enhance your daily production quality?",
      "Is there no other family member currently enrolled under this central artisan scheme?"
    ],
    documents: [
      "Proof of identity and residential status in the village or municipal ward",
      "Active mobile-linked bank account passbook",
      "Gram Panchayat / Urban Local Body verification recommendation",
      "Passport size photograph"
    ],
    steps: [
      "Visit your nearest Common Service Centre (CSC) to record your trade registration.",
      "Undergo verification by your Gram Panchayat Pradhan or Municipal Executive Officer.",
      "Complete five to seven days of basic skill training with a daily training stipend.",
      "Receive your Vishwakarma Certificate, ID Card, and modern toolkit incentive voucher.",
      "Access first-tranche enterprise credit to expand your stitching workshop."
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  },

  // --- SUPPORT ---
  {
    id: "supp-mudra-loan",
    title: "Pradhan Mantri MUDRA Yojana (Micro-Enterprise Credit)",
    pillar: "support",
    type: "Collateral-Free Micro Credit",
    department: "Department of Financial Services / MUDRA",
    states: "All India",
    minEducation: "class10",
    skillTags: ["business-planning", "micro-enterprise", "tailoring-shop", "retail"],
    goalTags: ["start-business", "earn-from-home"],
    mode: "both",
    whatYouGet: "Institutional credit for micro and small enterprise activities (Shishu, Kishore, and Tarun categories) without demanding property collateral. Supports the purchase of machinery, stock, and workshop premises.",
    eligibilityQuestions: [
      "Do you have a clear plan or existing setup for a small manufacturing, trading, or service business?",
      "Are you an Indian citizen with no past bank loan default history?",
      "Do you require capital to purchase machines, raw fabrics, or workroom fixtures?"
    ],
    documents: [
      "Identity proof (Voter ID, PAN card, or approved alternative)",
      "Proof of business address or home workshop rental / ownership deed",
      "Quotation for machinery or equipment to be acquired",
      "Six months bank account statement"
    ],
    steps: [
      "Prepare a simple list of equipment and working funds needed for your venture.",
      "Submit your loan request online through Udyamimitra or visit an authorized bank branch.",
      "Provide your business quotation and identify the appropriate MUDRA category.",
      "Bank officer completes credit appraisal and sanction process.",
      "Receive funds directly or via a MUDRA card to procure your business assets."
    ],
    officialUrl: "https://mudra.org.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "supp-standup-india",
    title: "Stand-Up India Scheme for Women Entrepreneurs",
    pillar: "support",
    type: "Greenfield Enterprise Financing",
    department: "SIDBI / Ministry of Finance",
    states: "All India",
    minEducation: "class10",
    skillTags: ["entrepreneurship", "enterprise", "manufacturing", "services"],
    goalTags: ["start-business"],
    mode: "both",
    whatYouGet: "Bank financing specifically designed to facilitate greenfield enterprises initiated by women entrepreneurs. Covers manufacturing, services, agri-allied, or trading sectors with pre-loan handholding guidance.",
    eligibilityQuestions: [
      "Are you a woman entrepreneur setting up a new (greenfield) enterprise for the first time?",
      "Will you hold at least 51% stake and controlling interest in the proposed enterprise?",
      "Is your enterprise not in default with any financial lending institution?"
    ],
    documents: [
      "Proof of identity and residence (Voter ID, Passport, or Ration card)",
      "Detailed project report (DPR) detailing business plan and project cost",
      "Pollution control board and municipal clearances if applicable",
      "Bank statements for the previous six months"
    ],
    steps: [
      "Register on the Stand-Up Mitra portal and select handholding or loan application.",
      "Upload your project report and determine your credit requirement.",
      "Connect with designated Lead District Managers and specialized branch advisors.",
      "Complete enterprise document checks and credit sanction interviews.",
      "Receive loan sanction and disbursement to establish your independent enterprise."
    ],
    officialUrl: "https://standupmitra.in",
    lastVerified: "Sample entry - confirm on official portal"
  },
  {
    id: "supp-day-nrlm-shg",
    title: "Self-Help Group Livelihood Support (DAY-NRLM)",
    pillar: "support",
    type: "Community Livelihoods & Micro-Finance",
    department: "Ministry of Rural Development / Aajeevika",
    states: "All India",
    minEducation: "class10",
    skillTags: ["community-organizing", "group-savings", "crafts", "food-processing"],
    goalTags: ["start-business", "earn-from-home", "learn-skill"],
    mode: "offline",
    whatYouGet: "Community-driven empowerment through Self-Help Groups (SHGs) with Revolving Funds, Community Investment Funds, and bank credit linkage. Provides training in collective enterprise and marketing linkages.",
    eligibilityQuestions: [
      "Are you a woman living in a rural or semi-urban community keen to build savings and livelihoods?",
      "Are you willing to join a local group of 10 to 20 neighbourhood women for mutual growth?",
      "Are you interested in group-based credit and collective enterprise activities?"
    ],
    documents: [
      "Basic identity proof (Voter ID or local administrative certification)",
      "Individual and joint group bank account details",
      "SHG member passbook and resolution book entries"
    ],
    steps: [
      "Contact your village Gram Sangathan or Cluster Level Federation animator.",
      "Join an active local Self-Help Group or organize a new group of neighbourhood peers.",
      "Participate in weekly group savings and internal small-loan rotation.",
      "Access Revolving Funds and group training for chosen livelihood activities.",
      "Participate in Aajeevika fairs, exhibitions, and collective value-chain sales."
    ],
    officialUrl: "https://aajeevika.gov.in",
    lastVerified: "Sample entry - confirm on official portal"
  }
];

window.PROFILES = [
  {
    id: "sunita",
    name: "Sunita",
    location: "Meerut, Uttar Pradesh",
    district: "Meerut",
    state: "Uttar Pradesh",
    education: "class10",
    educationLabel: "Class 10",
    skills: ["tailoring", "embroidery"],
    experienceYears: 5,
    goals: ["certify-skill", "teach-others"],
    mode: "both",
    story: "Has 5 years of practical tailoring and embroidery experience at home. Ready to get officially certified and teach young women in her neighborhood."
  },
  {
    id: "priya",
    name: "Priya",
    location: "Lucknow, Uttar Pradesh",
    district: "Lucknow",
    state: "Uttar Pradesh",
    education: "postgraduate",
    educationLabel: "MSc Mathematics (Postgraduate)",
    skills: ["mathematics", "data analysis", "academic research"],
    experienceYears: 0,
    goals: ["research-phd"],
    financialSupportNeeded: true,
    mode: "both",
    story: "Completed MSc in Mathematics. Keen to pursue a regular PhD with fellowship support to continue her research journey without financial strain."
  },
  {
    id: "anjali",
    name: "Anjali",
    location: "Kanpur, Uttar Pradesh",
    district: "Kanpur",
    state: "Uttar Pradesh",
    education: "class12",
    educationLabel: "Class 12",
    skills: ["writing", "computers", "communication"],
    experienceYears: 0,
    goals: ["finish-education"],
    financialSupportNeeded: true,
    mode: "online",
    story: "Completed Class 12 and paused her studies. Looking for flexible, online open degree programs with scholarship support to earn her graduate degree."
  }
];

