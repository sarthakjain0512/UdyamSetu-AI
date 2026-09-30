/**
 * UdyamSetu AI — Multilingual Voice Assistant Language Configuration
 * Centralized registry of supported Indian languages for Web Speech API (ASR / TTS).
 * 
 * Note on Browser Capabilities:
 * SpeechRecognition and SpeechSynthesis availability depends on the operating system,
 * device, and browser engine (e.g., Chrome/Edge support hi-IN, en-IN, bn-IN, etc. natively;
 * others like Firefox or Safari may have limited regional language pack support).
 */

export const VOICE_LANGUAGES = [
  {
    id: "hi-IN",
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    speechRecognition: "hi-IN",
    speechSynthesis: "hi-IN",
    samplePrompts: [
      "वाराणसी में डेयरी उद्योग के लिए कितना लोन और सब्सिडी मिलेगी?",
      "महिला उद्यमी के लिए PMEGP और MUDRA में क्या अंतर है?",
      "खाद्य प्रसंस्करण इकाई के लिए 10 लाख की लागत पर ईएमआई कितनी बनेगी?"
    ],
    defaultResponse: "वाराणसी क्लस्टर के लिए PMEGP योजना में ग्रामीण महिला / विशेष श्रेणी हेतु 35% सब्सिडी का प्रावधान है। प्रोजेक्ट रिपोर्ट एवं Udyam पंजीयन प्रस्तुत करने पर बैंक द्वारा 90% तक ऋण सहायता प्रदान की जाती है।"
  },
  {
    id: "en-IN",
    code: "en",
    name: "English",
    nativeName: "English",
    speechRecognition: "en-IN",
    speechSynthesis: "en-IN",
    samplePrompts: [
      "How much loan can I get for spice processing in Ranchi?",
      "What is the difference between PMEGP and MUDRA for rural startups?",
      "What are the mandatory documents needed for a ₹10 Lakh term loan?"
    ],
    defaultResponse: "Under the PMEGP scheme, rural non-farm enterprises can receive up to 35% margin money subsidy. For a ₹10 Lakh spice processing unit, entrepreneur equity required is 10% (₹1 Lakh) and bank debt is 90% (₹9 Lakh)."
  },
  {
    id: "bn-IN",
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    speechRecognition: "bn-IN",
    speechSynthesis: "bn-IN",
    samplePrompts: [
      "গ্রামীণ তাঁত শিল্পের জন্য সরকারি অনুদান কত পাওয়া যাবে?",
      "১০ লাখ টাকা প্রকল্পের জন্য কোন ঋণ প্রকল্প সবচেয়ে সুবিধাজনক?",
      "উদ্যম রেজিস্ট্রেশন করতে কি কি নথিপত্র প্রয়োজন?"
    ],
    defaultResponse: "গ্রামীণ তাঁত ও কুটির শিল্পের জন্য PMEGP প্রকল্পের অধীনে ৩৫% পর্যন্ত মার্জিন মানি সাবসিডি পাওয়া যায়। জেলা শিল্প কেন্দ্রে প্রকল্প রিপোর্ট জমা দিলে ব্যাংক ঋণ মঞ্জুর করে।"
  },
  {
    id: "gu-IN",
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    speechRecognition: "gu-IN",
    speechSynthesis: "gu-IN",
    samplePrompts: [
      "ડેરી ફાર્મિંગ માટે સરકારી સબસિડી કેટલી મળે છે?",
      "ગ્રામીણ વિસ્તારોમાં નવા ઉદ્યોગ માટે કઈ બેંક લોન ઉપલબ્ધ છે?",
      "ઉદ્યમ નોંધણી માટે કયા કાગળો જરૂરી છે?"
    ],
    defaultResponse: "ગ્રામીણ વિસ્તારમાં ડેરી તેમજ ફૂડ પ્રોસેસિંગ માટે PMEGP હેઠળ ૩૫% સુધી સબસિડી મળી શકે છે. ૧૦ લાખના પ્રોજેક્ટ ખર્ચ પર ૯ લાખ સુધીની બેંક લોન સહાય મળવાપાત્ર છે."
  },
  {
    id: "kn-IN",
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    speechRecognition: "kn-IN",
    speechSynthesis: "kn-IN",
    samplePrompts: [
      "ಗ್ರಾಮೀಣ ಕೃಷಿ ಸಂಸ್ಕರಣಾ ಘಟಕಕ್ಕೆ ಎಷ್ಟು ಸಾಲ ಲಭ್ಯವಿದೆ?",
      "PMEGP ಯೋಜನೆಯಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ಎಷ್ಟು ಸಬ್ಸಿಡಿ ದೊರೆಯುತ್ತದೆ?",
      "ಉದ್ಯಮ ನೋಂದಣಿಗೆ ಬೇಕಾಗುವ ಮುಖ್ಯ ದಾಖಲೆಗಳು ಯಾವುವು?"
    ],
    defaultResponse: "PMEGP ಯೋಜನೆಯಡಿ ಗ್ರಾಮೀಣ ಮಹಿಳಾ ಮತ್ತು ವಿಶೇಷ ವರ್ಗದ ಉದ್ಯಮಿಗಳಿಗೆ ಶೇಕಡಾ 35 ರವರೆಗೆ ಸಹಾಯಧನ ಲಭ್ಯವಿದೆ. ಪ್ರಾಜೆಕ್ಟ್ ವರದಿಯೊಂದಿಗೆ ಬ್ಯಾಂಕ್ ಮೂಲಕ ಶೇಕಡಾ 90 ರವರೆಗೆ ಸಾಲ ಪಡೆಯಬಹುದು."
  },
  {
    id: "ml-IN",
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    speechRecognition: "ml-IN",
    speechSynthesis: "ml-IN",
    samplePrompts: [
      "ഗ്രാമീണ ഭക്ഷ്യ സംസ്കരണത്തിന് എത്ര സബ്സിഡി ലഭിക്കും?",
      "മുദ്ര വായ്പയ്ക്ക് ഈട് ആവശ്യമുണ്ടോ?",
      "ഉദ്യം രജിസ്ട്രേഷൻ എങ്ങനെ ചെയ്യാം?"
    ],
    defaultResponse: "PMEGP പദ്ധതി വഴി ഗ്രാമീണ സംരംഭകർക്ക് 35% വരെ സബ്സിഡി ലഭിക്കുന്നു. 10 ലക്ഷം രൂപ വരെയുള്ള പദ്ധതികൾക്ക് ഈടില്ലാതെ ബാങ്ക് വായ്പ ലഭ്യമാക്കാൻ ക്രെഡിറ്റ് ഗ്യാരന്റി സഹായകരമാണ്."
  },
  {
    id: "mr-IN",
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    speechRecognition: "mr-IN",
    speechSynthesis: "mr-IN",
    samplePrompts: [
      "ग्रामीण भागात कृषी प्रक्रिया उद्योगासाठी किती कर्ज मिळेल?",
      "PMEGP योजनेतून महिलांना किती टक्के अनुदान मिळते?",
      "१० लाखांच्या प्रकल्पासाठी मासिक हप्ता किती असेल?"
    ],
    defaultResponse: "PMEGP योजनेअंतर्गत ग्रामीण भागातील महिला व विशेष प्रवर्गासाठी ३५% पर्यंत भांडवली अनुदानाची तरतूद आहे. उद्योजकाला १०% स्वभांडवल गुंतवावे लागते व ९०% बँक कर्ज मंजूर होते."
  },
  {
    id: "od-IN",
    code: "od",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    speechRecognition: "od-IN",
    speechSynthesis: "od-IN",
    samplePrompts: [
      "ଗ୍ରାମାଞ୍ଚଳରେ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ପାଇଁ କେତେ ସବସିଡି ମିଳିବ?",
      "PMEGP ଯୋଜନାରେ ଆବେଦନ ପାଇଁ କଣ କାଗଜପତ୍ର ଦରକାର?",
      "ମହିଳା ଉଦ୍ୟୋଗୀଙ୍କ ପାଇଁ ସୁଧ ହାର କେତେ?"
    ],
    defaultResponse: "ଗ୍ରାମାଞ୍ଚଳ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ପାଇଁ PMEGP ଅଧୀନରେ ୩୫% ପର୍ଯ୍ୟନ୍ତ ସବସିଡି ମିଳିଥାଏ। ଉଦ୍ୟମ ପଞ୍ଜୀକରଣ ଏବଂ ପ୍ରକଳ୍ପ ରିପୋର୍ଟ ସହିତ ବ୍ୟାଙ୍କ ୯୦% ପର୍ଯ୍ୟନ୍ତ ଋଣ ଯୋଗାଇଦିଏ।"
  },
  {
    id: "pa-IN",
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    speechRecognition: "pa-IN",
    speechSynthesis: "pa-IN",
    samplePrompts: [
      "ਡੇਅਰੀ ਜਾਂ ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਕਿੰਨੀ ਸਬਸਿਡੀ ਮਿਲੇਗੀ?",
      "PMEGP ਸਕੀਮ ਅਧੀਨ ਔਰਤਾਂ ਲਈ ਕੀ ਲਾਭ ਹਨ?",
      "ਉਦਯਮ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਲਈ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਚਾਹੀਦੇ ਹਨ?"
    ],
    defaultResponse: "PMEGP ਸਕੀਮ ਅਧੀਨ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਸ਼੍ਰੇਣੀ ਅਤੇ ਮਹਿਲਾ ਉੱਦਮੀਆਂ ਲਈ 35% ਸਬਸਿਡੀ ਉਪਲਬਧ ਹੈ। 10 ਲੱਖ ਰੁਪਏ ਦੇ ਪ੍ਰੋਜੈਕਟ ਲਈ 10% ਨਿੱਜੀ ਪੂੰਜੀ ਅਤੇ 90% ਬੈਂਕ ਕਰਜ਼ਾ ਮਿਲਦਾ ਹੈ।"
  },
  {
    id: "ta-IN",
    code: "ta-IN",
    name: "Tamil",
    nativeName: "தமிழ்",
    speechRecognition: "ta-IN",
    speechSynthesis: "ta-IN",
    samplePrompts: [
      "கிராமப்புற உணவு பதப்படுத்தும் தொழிலுக்கு மானியம் எவ்வளவு?",
      "PMEGP திட்டத்தில் பெண்களுக்கு முன்னுரிமை உண்டா?",
      "உத்யம் பதிவு செய்ய தேவையான ஆவணங்கள் என்ன?"
    ],
    defaultResponse: "PMEGP திட்டத்தின் கீழ் கிராமப்புற பெண்கள் மற்றும் சிறப்புப் பிரிவினருக்கு 35% வரை மானியம் வழங்கப்படுகிறது. ₹10 லட்சம் திட்ட மதிப்பீட்டில் ₹9 லட்சம் வரை வங்கி கடன் பெறலாம்."
  },
  {
    id: "te-IN",
    code: "te-IN",
    name: "Telugu",
    nativeName: "తెలుగు",
    speechRecognition: "te-IN",
    speechSynthesis: "te-IN",
    samplePrompts: [
      "గ్రామీణ సూక్ష్మ పరిశ్రమలకు ప్రభుత్వ సబ్సిడీ ఎంత?",
      "PMEGP పథకం ద్వారా బ్యాంకు రుణం ఎలా పొందాలి?",
      "ఉద్యమ్ రిజిస్ట్రేషన్ కోసం ఏ పత్రాలు కావాలి?"
    ],
    defaultResponse: "గ్రామీణ ప్రాంతాల్లో PMEGP పథకం కింద మహిళలకు మరియు ప్రత్యేక వర్గాలకు 35% వరకు సబ్సిడీ లభిస్తుంది. ప్రాజెక్ట్ రిపోర్ట్ సమర్పించి 90% వరకు బ్యాంకు రుణం పొందవచ్చు."
  },
  {
    id: "ur-IN",
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    speechRecognition: "ur-IN",
    speechSynthesis: "ur-IN",
    samplePrompts: [
      "دیہی علاقوں میں چھوٹے کاروبار کے لیے کتنی سبسڈی ملتی ہے؟",
      "PMEGP اسکیم میں خواتین کے لیے کیا مراعات ہیں؟",
      "صنعتی قرض کے لیے کن دستاویزات کی ضرورت ہوتی ہے؟"
    ],
    defaultResponse: "PMEGP اسکیم کے تحت دیہی علاقوں میں خصوصی زمرے اور خواتین کے لیے 35 فیصد تک مارجن منی سبسڈی کی سہولت ہے۔ پروجیکٹ رپورٹ کے ساتھ 90 فیصد تک بینک قرض منظور کیا جاتا ہے۔"
  },
  {
    id: "bho-IN",
    code: "bho",
    name: "Bhojpuri",
    nativeName: "भोजपुरी",
    speechRecognition: "bho-IN",
    speechSynthesis: "hi-IN",
    isDialect: true,
    dialectFallback: "hi-IN",
    samplePrompts: [
      "गाँव में डेयरी चाहे मसाला उद्योग खातिर केतना लोन मिली?",
      "मेहरारू उद्यमी खातिर सरकार केतना सब्सिडी देला?",
      "उद्यम रजिस्ट्रेशन खातिर कवन-कवन कागज लागी?"
    ],
    defaultResponse: "PMEGP योजना में गाँव देहात के मेहरारू लोगन खातिर 35% ले सरकारी सब्सिडी के व्यवस्था बा। 10 लाख के प्रोजेक्ट पर 1 लाख रुपिया आपन लगावे के होला आ 9 लाख रुपिया बैंक से लोन मिल जाला।"
  }
];

export const DEFAULT_LANGUAGE_ID = "hi-IN";

export function getLanguageById(id) {
  return VOICE_LANGUAGES.find(l => l.id === id) || VOICE_LANGUAGES[0];
}

export function getLanguageByCode(code) {
  if (!code) return VOICE_LANGUAGES[0];
  const normalized = code.toLowerCase().trim();
  return VOICE_LANGUAGES.find(l => 
    l.code.toLowerCase() === normalized || 
    l.id.toLowerCase() === normalized ||
    l.id.toLowerCase().startsWith(normalized)
  ) || VOICE_LANGUAGES[0];
}
