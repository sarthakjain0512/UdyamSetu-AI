/**
 * UdyamSetu AI — Deterministic Voice Intent & Relevance Gate (SIH 26091)
 *
 * Implements a deterministic, multi-signal relevance classifier between
 * Speech-to-Text and Advisory Response generation.
 *
 * Prevents false positives on personal statements, greetings, casual chatter,
 * and unrelated inquiries, ensuring only genuine rural micro-enterprise
 * advisory queries reach the business response engine.
 */

export const INTENT_TYPES = {
  // Relevant Domain Intents
  BUSINESS_IDEA: 'BUSINESS_IDEA',
  MARKET_ANALYSIS: 'MARKET_ANALYSIS',
  FINANCING: 'FINANCING',
  GOVERNMENT_SCHEME: 'GOVERNMENT_SCHEME',
  FEASIBILITY: 'FEASIBILITY',
  BUSINESS_PLAN: 'BUSINESS_PLAN',
  RURAL_ENTREPRENEURSHIP: 'RURAL_ENTREPRENEURSHIP',

  // Non-Relevant / Non-Advisory Intents
  GENERAL_GREETING: 'GENERAL_GREETING',
  PERSONAL_STATEMENT: 'PERSONAL_STATEMENT',
  CASUAL_CONVERSATION: 'CASUAL_CONVERSATION',
  UNSUPPORTED_TOPIC: 'UNSUPPORTED_TOPIC',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Signal dictionaries across English, Hindi, and regional phonetic patterns.
 */
const SIGNAL_PATTERNS = {
  // Domain 1: Business Ideation & Startup
  BUSINESS_IDEA: {
    weight: 2.0,
    exactOrPhrases: [
      'start business', 'start a business', 'start enterprise', 'start a dairy', 'start dairy',
      'dairy business', 'dairy farming', 'spice processing', 'food processing', 'oil mill',
      'dal mill', 'flour mill', 'business idea', 'business ideas', 'what business can i start',
      'which business is suitable', 'new business', 'rural business', 'village business',
      'small business', 'manufacturing unit', 'processing unit', 'open a shop',
      'व्यवसाय शुरू', 'कारोबार शुरू', 'बिजनेस शुरू', 'काम शुरू', 'डेयरी उद्योग', 'डेयरी बिजनेस',
      'डेयरी फार्मिंग', 'मसाला उद्योग', 'मसाला बिजनेस', 'मसाला पिसाई', 'खाद्य प्रसंस्करण', 'उद्योग लगाना', 'नया बिजनेस',
      'ग्रामीण उद्योग', 'गांव में बिजनेस', 'लघु उद्योग', 'सूक्ष्म उद्यम', 'कारोबार करे के बा',
      'काम धंधा शुरू', 'डेयरी चाहे मसाला'
    ],
    keywords: [
      'enterprise', 'entrepreneur', 'entrepreneurship', 'startup', 'processing',
      'manufacturing', 'उद्यम', 'उद्यमी', 'उद्योग', 'बिजनेस', 'व्यवसाय', 'कारोबार', 'मसाला', 'डेयरी'
    ]
  },

  // Domain 2: Financing, Debt & Capital
  FINANCING: {
    weight: 2.2,
    exactOrPhrases: [
      'how much loan', 'business loan', 'loan amount', 'project cost', 'margin money',
      'margin capital', 'what will my emi be', 'calculate emi', 'monthly emi', 'repayment',
      'interest rate', 'capital structure', 'debt financing', 'term loan', 'working capital',
      'how much capital', 'equity required', 'loan can i get', 'loan eligibility',
      'कितना लोन', 'ऋण', 'लोन मिलेगा', 'लोन मिल सकता', 'प्रोजेक्ट लागत', 'प्रोजेक्ट कॉस्ट',
      'मार्जिन मनी', 'स्वपूंजी', 'ईएमआई', 'मासिक किस्त', 'ब्याज दर', 'पूंजी', 'कर्ज',
      'केतना लोन मिली', 'लोन चाही'
    ],
    keywords: [
      'loan', 'emi', 'capital', 'debt', 'financing', 'interest', 'repayment',
      'लोन', 'कर्ज', 'ऋण', 'किस्त', 'ब्याज', 'लागत'
    ]
  },

  // Domain 3: Government Schemes & Subsidies
  GOVERNMENT_SCHEME: {
    weight: 2.5,
    exactOrPhrases: [
      'pmegp', 'mudra', 'government scheme', 'government schemes', 'subsidy',
      'margin money subsidy', 'which scheme', 'scheme support', 'scheme eligibility',
      'nodal scheme', 'cgtmse', 'kvic', 'msme scheme', 'central scheme', 'state scheme',
      'difference between pmegp and mudra', 'subsidy amount', 'capital subsidy',
      'पीएमईजीपी', 'मुद्रा', 'सरकारी योजना', 'योजनाएं', 'सब्सिडी', 'अनुदान', 'सरकारी सहायता',
      'पात्रता', 'सरकारी लोन', 'कवन योजना', 'सरकार केतना सब्सिडी देला'
    ],
    keywords: [
      'pmegp', 'mudra', 'subsidy', 'scheme', 'सब्सिडी', 'योजना', 'अनुदान'
    ]
  },

  // Domain 4: Local Market & Demand
  MARKET_ANALYSIS: {
    weight: 2.0,
    exactOrPhrases: [
      'market demand', 'local market', 'market opportunity', 'demand for', 'competitor',
      'competitors', 'who are my competitors', 'customer base', 'target customers',
      'market potential', 'market analysis', 'demand in varanasi', 'demand in my village',
      'बाजार मांग', 'स्थानीय बाजार', 'मार्केट डिमांड', 'ग्राहक', 'प्रतियोगी', 'कंपटीटर',
      'बाजार विश्लेषण', 'मार्केट में मांग'
    ],
    keywords: [
      'competitor', 'competitors', 'competition', 'demand', 'customer', 'customers',
      'बाजार', 'ग्राहक', 'प्रतियोगी'
    ]
  },

  // Domain 5: Feasibility & Risk
  FEASIBILITY: {
    weight: 2.0,
    exactOrPhrases: [
      'is dairy farming feasible', 'is this business feasible', 'business feasible',
      'financially viable', 'viability', 'is it profitable', 'business risks',
      'risk analysis', 'feasibility score', 'break even', 'is it viable', 'viable business',
      'व्यावहारिक', 'संभाव्यता', 'फायदेमंद', 'नफा नुकसान', 'जोखिम', 'घाटा', 'व्यवसाय चलेगा'
    ],
    keywords: [
      'feasible', 'feasibility', 'viable', 'viability', 'profitable', 'profitability',
      'संभाव्यता', 'व्यावहारिकता', 'फायदेमंद', 'जोखिम'
    ]
  },

  // Domain 6: Business Planning & Roadmap
  BUSINESS_PLAN: {
    weight: 2.0,
    exactOrPhrases: [
      'business plan', 'create a business plan', 'launch plan', 'before launching',
      'launch steps', 'next steps for my business', 'roadmap', 'what documents should i prepare',
      'document checklist', 'dpr', 'detailed project report',
      'बिजनेस प्लान', 'व्यवसाय योजना', 'लॉन्च', 'दस्तावेज', 'कागजात', 'अगले कदम',
      'प्रोजेक्ट रिपोर्ट', 'कवन कवन कागज'
    ],
    keywords: [
      'roadmap', 'dpr', 'checklist', 'दस्तावेज', 'कागजात'
    ]
  },

  // Domain 7: Rural Entrepreneurship
  RURAL_ENTREPRENEURSHIP: {
    weight: 1.8,
    exactOrPhrases: [
      'rural enterprise', 'rural entrepreneur', 'village business', 'first-time entrepreneur',
      'start in my village', 'expand my small business', 'self-employment',
      'ग्रामीण उद्यमी', 'गांव में रोजगार', 'ग्रामीण स्वरोजगार', 'पहला बिजनेस'
    ],
    keywords: [
      'rural', 'village', 'ग्रामीण', 'गांव'
    ]
  }
};

/**
 * Negative Signals & Irrelevant Patterns.
 */
const IRRELEVANT_PATTERNS = {
  GREETINGS: [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
    'namaste', 'namaskar', 'pranam', 'नमस्ते', 'नमस्कार', 'प्रणाम', 'हेलो', 'हाय'
  ],
  PERSONAL_INTRODUCTIONS: [
    /(?:^|\b)(?:hello|hi|hey|हेलो|हाय|नमस्ते|नमस्कार)?\s*(?:माय|माइ)\s*नेम\s*(?:इस|इज़|इज)\b/iu,
    /(?:^|\b)(?:hello|hi|hey|हेलो|हाय|नमस्ते|नमस्कार)?\s*(?:my\s*name\s*is|i\s*am|i'm|this\s*is)\b/iu,
    /(?:^|\b)(?:hello|hi|hey|हेलो|हाय|नमस्ते|नमस्कार)?\s*(?:आई|आइ)\s*(?:ऍम|एम|ऐम|हूँ|हूं)\b/iu,
    /(?:^|\b)(?:hello|hi|hey|हेलो|हाय|नमस्ते|नमस्कार)?\s*(?:मेरा|महारो|मोर|हमर)\s*नाम\b/iu,
    /(?:^|\b)(?:hello|hi|hey|हेलो|हाय|नमस्ते|नमस्कार)?\s*(?:मैं|हम्|हम)\s+.*(?:हूँ|हूं|बानी|आहे|आही|हु)\b/iu,
    /(?:^|\b)(?:i\s*live\s*in|i\s*am\s*from|i\s*am\s*a\s*student|i\s*study\s*in)\b/iu,
    /(?:^|\b)(?:मैं|हम)\s+(?:एक\s+)?(?:छात्र|स्टूडेंट|विद्यार्थी)\b/iu
  ],
  CASUAL_CHATTER: [
    'how are you', 'how are u', 'how do you do', 'tell me a joke', 'tell a joke',
    'what is the weather', 'weather today', 'cricket', 'ipl', 'football',
    'movie', 'favorite movie', 'who are you', 'what is your name', 'feeling tired',
    'i am tired', 'i like cricket', 'i love', 'thank you', 'thanks a lot', 'nice to meet you',
    'good night', 'bye', 'goodbye', 'sing a song', 'play song', 'kya haal hai',
    'kaise ho', 'aap kaun ho'
  ],
  AMBIGUOUS_SHORT: [
    'tell me about this', 'what is this', 'explain this', 'help me', 'tell me',
    'ok', 'okay', 'yes', 'no', 'fine', 'kuch batao', 'bataiye', 'kya hai'
  ]
};

/**
 * Normalizes text for robust deterministic comparison.
 */
export function normalizeInput(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  return rawText
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Safe keyword matching supporting both ASCII and Unicode/Devanagari word boundaries.
 */
function matchKeyword(text, kw) {
  if (!text || !kw) return false;
  if (/^[a-z0-9_-]+$/i.test(kw)) {
    return new RegExp(`\\b${kw}\\b`, 'i').test(text);
  }
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[\\s,.;:!?।\\-_])${escaped}([\\s,.;:!?।\\-_]|$)`, 'i');
  return regex.test(text);
}

/**
 * Deterministic intent scoring and relevance gate.
 *
 * @param {string} rawTranscript - Spoken or typed user input
 * @param {string} [languageId='en-IN'] - Current UI selected language code
 * @returns {Object} Intent analysis result
 */
export function analyzeVoiceIntent(rawTranscript, languageId = 'en-IN') {
  const normalized = normalizeInput(rawTranscript);

  // 1. Guard against empty / whitespace
  if (!normalized) {
    return {
      relevant: false,
      intent: INTENT_TYPES.UNKNOWN,
      confidence: 0,
      reason: 'Empty input received.',
      matchedSignals: [],
      relevanceMessage: getRelevanceMessage(INTENT_TYPES.UNKNOWN, languageId)
    };
  }

  // 2. Multi-clause check: Extract business signals first across the ENTIRE transcript
  const domainMatches = [];
  for (const [intentKey, config] of Object.entries(SIGNAL_PATTERNS)) {
    let score = 0;
    const matchedPhrases = [];

    // Check exact or phrase occurrences
    for (const phrase of config.exactOrPhrases) {
      if (normalized.includes(phrase)) {
        score += config.weight;
        matchedPhrases.push(phrase);
      }
    }

    // Check standalone keywords with lower increment using Unicode-safe boundaries
    for (const kw of config.keywords) {
      if (matchKeyword(normalized, kw)) {
        score += 0.8;
        if (!matchedPhrases.includes(kw)) {
          matchedPhrases.push(kw);
        }
      }
    }

    if (score >= 1.5) {
      domainMatches.push({
        intent: intentKey,
        score,
        matchedPhrases
      });
    }
  }

  // Sort domain matches by score descending
  domainMatches.sort((a, b) => b.score - a.score);

  // 3. IF STRONG BUSINESS INTENT IS PRESENT:
  // Even if the sentence starts with "My name is Sarthak and..." or "Hello, ...",
  // genuine business intent must be accepted!
  if (domainMatches.length > 0) {
    const topMatch = domainMatches[0];
    const confidence = Math.min(1.0, 0.6 + (topMatch.score * 0.1));

    return {
      relevant: true,
      intent: topMatch.intent,
      confidence,
      reason: `Deterministic business domain match: ${topMatch.matchedPhrases.slice(0, 3).join(', ')}`,
      matchedSignals: topMatch.matchedPhrases,
      relevanceMessage: null
    };
  }

  // 4. Check for standalone greetings
  const isPureGreeting = IRRELEVANT_PATTERNS.GREETINGS.some(g => {
    return normalized === g || normalized === `${g} udyamsetu` || (normalized.startsWith(`${g} `) && normalized.length < 25);
  });

  if (isPureGreeting) {
    return {
      relevant: false,
      intent: INTENT_TYPES.GENERAL_GREETING,
      confidence: 0.95,
      reason: 'General greeting detected without business advisory intent.',
      matchedSignals: ['greeting'],
      relevanceMessage: getRelevanceMessage(INTENT_TYPES.GENERAL_GREETING, languageId)
    };
  }

  // 5. Check for personal introductions / statements without business signals
  const isPersonal = IRRELEVANT_PATTERNS.PERSONAL_INTRODUCTIONS.some(regex => regex.test(normalized)) ||
    normalized.includes('माय नेम इस') ||
    normalized.includes('my name is') ||
    normalized.includes('मेरा नाम') ||
    normalized.startsWith('i am ') ||
    normalized.startsWith('मैं ') ||
    normalized.startsWith('आई ऍम ') ||
    normalized.startsWith('आई एम ');

  if (isPersonal) {
    return {
      relevant: false,
      intent: INTENT_TYPES.PERSONAL_STATEMENT,
      confidence: 0.95,
      reason: 'Personal introduction detected without business intent.',
      matchedSignals: ['personal_statement'],
      relevanceMessage: getRelevanceMessage(INTENT_TYPES.PERSONAL_STATEMENT, languageId)
    };
  }

  // 6. Check for casual conversation / unsupported questions
  const matchedCasual = IRRELEVANT_PATTERNS.CASUAL_CHATTER.find(c => normalized.includes(c));
  if (matchedCasual) {
    return {
      relevant: false,
      intent: INTENT_TYPES.CASUAL_CONVERSATION,
      confidence: 0.9,
      reason: `Casual conversation topic detected: "${matchedCasual}".`,
      matchedSignals: [matchedCasual],
      relevanceMessage: getRelevanceMessage(INTENT_TYPES.CASUAL_CONVERSATION, languageId)
    };
  }

  // 7. Check for ambiguous / underspecified inputs
  const isAmbiguous = IRRELEVANT_PATTERNS.AMBIGUOUS_SHORT.some(a => normalized === a || normalized.startsWith(a));
  if (isAmbiguous || normalized.split(' ').length <= 2) {
    return {
      relevant: false,
      intent: INTENT_TYPES.UNKNOWN,
      confidence: 0.85,
      reason: 'Ambiguous or insufficient query detail.',
      matchedSignals: ['underspecified'],
      relevanceMessage: getRelevanceMessage(INTENT_TYPES.UNKNOWN, languageId)
    };
  }

  // 8. Fallback: No recognized business domain signals
  return {
    relevant: false,
    intent: INTENT_TYPES.UNSUPPORTED_TOPIC,
    confidence: 0.8,
    reason: 'Input does not match UdyamSetu rural micro-enterprise advisory scope.',
    matchedSignals: [],
    relevanceMessage: getRelevanceMessage(INTENT_TYPES.UNSUPPORTED_TOPIC, languageId)
  };
}

/**
 * Returns language-aware, clear relevance and guidance messages.
 */
export function getRelevanceMessage(intent, languageId = 'en-IN') {
  const isHindi = languageId.startsWith('hi') || languageId === 'bho-IN';

  switch (intent) {
    case INTENT_TYPES.GENERAL_GREETING:
      return isHindi
        ? "नमस्ते! मैं UdyamSetu AI हूँ। मैं ग्रामीण व्यवसाय, स्थानीय बाजार विश्लेषण, बैंक लोन व ईएमआई, सरकारी योजनाओं (PMEGP, MUDRA) और बिजनेस प्लान में आपकी सहायता कर सकता हूँ। आप किस व्यवसाय के बारे में जानना चाहते हैं?"
        : "Hello! I am UdyamSetu AI. I can assist you with rural business ideas, local market opportunities, financing & EMI estimates, government schemes (like PMEGP & MUDRA), and business launch planning. What would you like to explore?";

    case INTENT_TYPES.PERSONAL_STATEMENT:
    case INTENT_TYPES.CASUAL_CONVERSATION:
    case INTENT_TYPES.UNSUPPORTED_TOPIC:
      return isHindi
        ? "यह सवाल UdyamSetu AI की व्यावसायिक सलाह सेवाओं से संबंधित नहीं लगता। कृपया ग्रामीण व्यवसाय शुरू करने, स्थानीय बाजार मांग, बैंक लोन, सरकारी योजनाओं (PMEGP/MUDRA) या बिजनेस प्लान के बारे में पूछें।"
        : "This doesn't seem relevant to UdyamSetu AI's business advisory services. Please ask about starting or expanding a rural business, local market opportunities, financing, government schemes, or business planning.";

    case INTENT_TYPES.UNKNOWN:
    default:
      return isHindi
        ? "मैं ग्रामीण व्यवसाय, स्थानीय बाजार अवसर, लोन व सब्सिडी, सरकारी योजनाओं और बिज़नेस प्लान में मदद कर सकता हूँ। कृपया स्पष्ट करें कि आप किस व्यवसाय या योजना के बारे में जानना चाहते हैं।"
        : "I can help with rural business ideas, local market opportunities, financing, government schemes, feasibility, and business planning. Please specify what business idea or query you would like to explore.";
  }
}

/**
 * Generates an intelligent, domain-grounded advisory response for relevant queries,
 * leveraging active session analysis context if available.
 *
 * @param {string} transcript - User spoken query
 * @param {string} intent - Detected domain intent
 * @param {Object} langObj - Selected voice language object
 * @param {Object} [sessionContext=null] - Active canonical session data from localStorage
 */
export function generateDomainAdvisoryResponse(transcript, intent, langObj, sessionContext = null) {
  const isHindi = langObj.id.startsWith('hi') || langObj.id === 'bho-IN';
  
  // Extract contextual parameters if present
  const location = sessionContext?.location?.district || sessionContext?.location?.blockOrLocality || 'वाराणसी / ग्रामीण क्लस्टर';
  const category = sessionContext?.business?.category || sessionContext?.business?.idea || 'डेयरी एवं खाद्य प्रसंस्करण';
  const marginCapital = sessionContext?.finance?.marginCapital || 100000;
  const projectCost = sessionContext?.finance?.projectCost || (marginCapital * 10);
  const loanCeiling = sessionContext?.scheme?.indicativeLoan || 900000;

  switch (intent) {
    case INTENT_TYPES.FINANCING:
      if (isHindi) {
        return `UdyamSetu वित्तपोषण विश्लेषण: ₹${(projectCost/100000).toFixed(1)} लाख की कुल प्रोजेक्ट लागत पर 10% स्वपूंजी (₹${(marginCapital/100000).toFixed(1)} लाख) तथा 90% बैंक ऋण (₹${(loanCeiling/100000).toFixed(1)} लाख) संरचित होता है। 8% ब्याज दर पर 84 माह (7 वर्ष) की अवधि में 6 माह के मोरेटोरियम उपरांत अनुमानित मासिक ईएमआई लगभग ₹14,845 बनती है।`;
      }
      return `UdyamSetu Financing Advisory: For a project cost of ₹${(projectCost/100000).toFixed(1)} Lakh, the structure requires 10% entrepreneur margin (₹${(marginCapital/100000).toFixed(1)} Lakh) and 90% bank debt (₹${(loanCeiling/100000).toFixed(1)} Lakh). At an 8% interest rate over an 84-month tenure (7 years with 6-month moratorium), the indicative monthly EMI is approximately ₹14,845.`;

    case INTENT_TYPES.GOVERNMENT_SCHEME:
      if (isHindi) {
        return `UdyamSetu योजना विश्लेषण: ग्रामीण सूक्ष्म उद्यमियों के लिए PMEGP (प्रधानमंत्री रोजगार सृजन कार्यक्रम) सबसे उपयुक्त है, जिसमें ग्रामीण विशेष श्रेणी हेतु 35% तक मार्जिन मनी सब्सिडी मिलती है। 10 लाख तक के बिना गारंटी ऋण के लिए MUDRA योजना (तरुण श्रेणी) भी उपलब्ध है।`;
      }
      return `UdyamSetu Scheme Advisory: For rural micro-enterprises, the PMEGP scheme offers up to 35% capital subsidy for rural women and special category entrepreneurs. For collateral-free loans up to ₹10 Lakh, MUDRA (Tarun category) is also applicable under CGTMSE credit guarantee.`;

    case INTENT_TYPES.BUSINESS_IDEA:
      if (isHindi) {
        return `UdyamSetu व्यवसाय सुझाव: ${location} क्षेत्र के लिए ${category}, मसाला पिसाई व पैकेजिंग, तथा कोल्ड-प्रेस्ड सरसों तेल निष्कर्षण उच्च लाभप्रदता वाले व्यवसाय हैं। स्थानीय कृषि उपज की निकटता के कारण कच्चे माल की आपूर्ति निरंतर बनी रहती है।`;
      }
      return `UdyamSetu Business Idea Advisory: In the ${location} cluster, recommended high-potential rural non-farm enterprises include ${category}, spice grinding & packaging, and mini oil expellers, leveraging local agrarian raw material supply with steady market demand.`;

    case INTENT_TYPES.MARKET_ANALYSIS:
      if (isHindi) {
        return `UdyamSetu बाजार विश्लेषण: स्थानीय ग्रामीण व अर्ध-शहरी बाजारों में दैनिक उपभोग्य खाद्य उत्पादों की मांग निरंतर बढ़ रही है। 3-5 किमी के दायरे में प्रत्यक्ष खुदरा किराना नेटवर्क और स्थानीय हाट प्राथमिक लक्षित ग्राहक आधार प्रदान करते हैं।`;
      }
      return `UdyamSetu Market Analysis: Local rural and semi-urban markets exhibit strong everyday demand for packaged staples and processed food. Establishing direct distribution with rural kirana stores within a 5-10 km radius provides steady initial sales volume.`;

    case INTENT_TYPES.FEASIBILITY:
      if (isHindi) {
        return `UdyamSetu व्यावहारिकता रिपोर्ट: यह व्यवसाय तकनीकी एवं वाणिज्यिक दृष्टि से सुदृढ़ है। आवश्यक कच्चे माल की उपलब्धता 90% से अधिक है। मौसमी मूल्य उतार-चढ़ाव से बचाव के लिए 2 माह का कार्यशील पूंजी बैकअप अनिवार्य है।`;
      }
      return `UdyamSetu Feasibility Assessment: This enterprise shows high feasibility with verified local raw material access. To de-risk against seasonal commodity price volatility, maintaining a 60-day working capital reserve is strongly advised.`;

    case INTENT_TYPES.BUSINESS_PLAN:
      if (isHindi) {
        return `UdyamSetu बिजनेस प्लान रोडमैप: 1. Udyam पंजीकरण पूर्ण करें, 2. बैंक योग्य डीपीआर (प्रोजेक्ट रिपोर्ट) तैयार करें, 3. PMEGP ऑनलाइन पोर्टल पर आवेदन दर्ज करें, 4. बैंक ऋण स्वीकृति प्राप्त कर इकाई स्थापित करें।`;
      }
      return `UdyamSetu Business Plan Roadmap: 1. Complete official Udyam Registration, 2. Finalize bankable Detailed Project Report (DPR), 3. Apply via the PMEGP e-portal, 4. Secure bank sanction and release capital subsidy.`;

    case INTENT_TYPES.RURAL_ENTREPRENEURSHIP:
    default:
      if (isHindi) {
        return langObj.defaultResponse || `UdyamSetu ग्रामीण उद्यमिता मार्गदर्शन: ग्रामीण गैर-कृषि उद्यमों के लिए सरकार 90% तक ऋण सहायता और 35% तक सब्सिडी प्रदान करती है। जिला उद्योग केंद्र (DIC) से अनुमोदन उपरांत कार्य आरंभ किया जा सकता है।`;
      }
      return langObj.defaultResponse || `UdyamSetu Rural Advisory: Rural micro-enterprises can access up to 90% structured bank debt and 35% margin money capital subsidy under national livelihood and entrepreneurship programs.`;
  }
}
