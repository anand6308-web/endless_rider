// Internationalization strings
// Currently supports: en-US, en-IN, te-IN, hi-IN, ta-IN, kn-IN, ml-IN, mr-IN, bn-IN, gu-IN, pa-IN

export type LocaleCode = 'en-US' | 'en-IN' | 'te-IN' | 'hi-IN' | 'ta-IN' | 'kn-IN' | 'ml-IN' | 'mr-IN' | 'bn-IN' | 'gu-IN' | 'pa-IN';

interface Translations {
  [key: string]: {
    [locale in LocaleCode]: string;
  };
}

export const translations: Translations = {
  // Onboarding
  'onboarding.welcome': {
    'en-US': 'Welcome to Morning Memory Gym',
    'en-IN': 'Welcome to Morning Memory Gym',
    'te-IN': 'మార్నింగ్ మెమరీ జిమ్‌కి స్వాగతం',
    'hi-IN': 'मॉर्निंग मेमोरी जिम में आपका स्वागत है',
    'ta-IN': 'காலை நினைவக உடற்பயிற்சி கூடத்திற்கு வரவேற்கிறோம்',
    'kn-IN': 'ಮಾರ್ನಿಂಗ್ ಮೆಮೊರಿ ಜಿಮ್‌ಗೆ ಸ್ವಾಗತ',
    'ml-IN': 'മോണിംഗ് മെമ്മറി ജിമ്മിലേക്ക് സ്വാഗതം',
    'mr-IN': 'मॉर्निंग मेमरी जिममध्ये आपले स्वागत आहे',
    'bn-IN': 'মর্নিং মেমোরি জিমে স্বাগতম',
    'gu-IN': 'મોર્નિંગ મેમરી જીમમાં તમારું સ્વાગત છે',
    'pa-IN': 'ਮਾਰਨਿੰਗ ਮੈਮੋਰੀ ਜਿਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ'
  },
  'onboarding.selectLocale': {
    'en-US': 'Select your language',
    'en-IN': 'Select your language',
    'te-IN': 'మీ భాషను ఎంచుకోండి',
    'hi-IN': 'अपनी भाषा चुनें',
    'ta-IN': 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    'kn-IN': 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'ml-IN': 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    'mr-IN': 'तुमची भाषा निवडा',
    'bn-IN': 'আপনার ভাষা নির্বাচন করুন',
    'gu-IN': 'તમારી ભાષા પસંદ કરો',
    'pa-IN': 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ'
  },
  'onboarding.selectTrack': {
    'en-US': 'Choose your training goal',
    'en-IN': 'Choose your training goal',
    'te-IN': 'మీ శిక్షణ లక్ష్యాన్ని ఎంచుకోండి',
    'hi-IN': 'अपना प्रशिक्षण लक्ष्य चुनें',
    'ta-IN': 'உங்கள் பயிற்சி இலக்கைத் தேர்ந்தெடுக்கவும்',
    'kn-IN': 'ನಿಮ್ಮ ತರಬೇತಿ ಗುರಿಯನ್ನು ಆರಿಸಿ',
    'ml-IN': 'നിങ്ങളുടെ പരിശീലന ലക്ഷ്യം തിരഞ്ഞെടുക്കുക',
    'mr-IN': 'तुमचे प्रशिक्षण ध्येय निवडा',
    'bn-IN': 'আপনার প্রশিক্ষণ লক্ষ্য নির্বাচন করুন',
    'gu-IN': 'તમારો તાલીમ લક્ષ્ય પસંદ કરો',
    'pa-IN': 'ਆਪਣਾ ਸਿਖਲਾਈ ਟੀਚਾ ਚੁਣੋ'
  },
  'onboarding.selectTime': {
    'en-US': 'Daily practice time',
    'en-IN': 'Daily practice time',
    'te-IN': 'రోజువారీ సాధన సమయం',
    'hi-IN': 'दैनिक अभ्यास समय',
    'ta-IN': 'தினசரி பயிற்சி நேரம்',
    'kn-IN': 'ದೈನಂದಿನ ಅಭ್ಯಾಸ ಸಮಯ',
    'ml-IN': 'ദിനംപ്രതി പരിശീലന സമയം',
    'mr-IN': 'दैनिक सराव वेळ',
    'bn-IN': 'দৈনিক অনুশীলনের সময়',
    'gu-IN': 'દૈનિક અભ્યાસ સમય',
    'pa-IN': 'ਰੋਜ਼ਾਨਾ ਅਭਿਆਸ ਸਮਾਂ'
  },
  'onboarding.getStarted': {
    'en-US': 'Get Started',
    'en-IN': 'Get Started',
    'te-IN': 'ప్రారంభించండి',
    'hi-IN': 'शुरू करें',
    'ta-IN': 'தொடங்குங்கள்',
    'kn-IN': 'ಪ್ರಾರಂಭಿಸಿ',
    'ml-IN': 'ആരംഭിക്കുക',
    'mr-IN': 'सुरू करा',
    'bn-IN': 'শুরু করুন',
    'gu-IN': 'શરૂ કરો',
    'pa-IN': 'ਸ਼ੁਰੂ ਕਰੋ'
  },
  'common.continue': {
    'en-US': 'Continue',
    'en-IN': 'Continue',
    'te-IN': 'కొనసాగించు',
    'hi-IN': 'जारी रखें',
    'ta-IN': 'தொடர்க',
    'kn-IN': 'ಮುಂದುವರಿಸಿ',
    'ml-IN': 'തുടരുക',
    'mr-IN': 'सुरू ठेवा',
    'bn-IN': 'চালিয়ে যান',
    'gu-IN': 'ચાલુ રાખો',
    'pa-IN': 'ਜਾਰੀ ਰੱਖੋ'
  },
  'common.back': {
    'en-US': 'Back',
    'en-IN': 'Back',
    'te-IN': 'వెనక్కి',
    'hi-IN': 'वापस',
    'ta-IN': 'பின்',
    'kn-IN': 'ಹಿಂದೆ',
    'ml-IN': 'തിരികെ',
    'mr-IN': 'मागे',
    'bn-IN': 'পিছনে',
    'gu-IN': 'પાછળ',
    'pa-IN': 'ਪਿੱਛੇ'
  },
  // Removed duplicate home.startSession entry
  'nav.home': {
    'en-US': 'Home',
    'en-IN': 'Home',
    'te-IN': 'హోమ్',
    'hi-IN': 'होम',
    'ta-IN': 'முகப்பு',
    'kn-IN': 'ಮುಖಪುಟ',
    'ml-IN': 'ഹോം',
    'mr-IN': 'होम',
    'bn-IN': 'হোম',
    'gu-IN': 'હોમ',
    'pa-IN': 'ਹੋਮ'
  },
  'nav.progress': {
    'en-US': 'Progress',
    'en-IN': 'Progress',
    'te-IN': 'పురోగతి',
    'hi-IN': 'प्रगति',
    'ta-IN': 'முன்னேற்றம்',
    'kn-IN': 'ಪ್ರಗತಿ',
    'ml-IN': 'പുരോഗതി',
    'mr-IN': 'प्रगती',
    'bn-IN': 'অগ্রগতি',
    'gu-IN': 'પ્રગતિ',
    'pa-IN': 'ਤਰੱਕੀ'
  },
  'nav.settings': {
    'en-US': 'Settings',
    'en-IN': 'Settings',
    'te-IN': 'సెట్టింగ్స్',
    'hi-IN': 'सेटिंग्स',
    'ta-IN': 'அமைப்புகள்',
    'kn-IN': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'ml-IN': 'ക്രമീകരണങ്ങൾ',
    'mr-IN': 'सेटिंग्ज',
    'bn-IN': 'সেটিংস',
    'gu-IN': 'સેટિંગ્સ',
    'pa-IN': 'ਸੈਟਿੰਗਾਂ'
  },
  'onboarding.voiceMode': {
    'en-US': 'Enable voice mode',
    'en-IN': 'Enable voice mode',
    'te-IN': 'వాయిస్ మోడ్ ప్రారంభించండి',
    'hi-IN': 'वॉयस मोड सक्षम करें',
    'ta-IN': 'குரல் பயன்முறையை இயக்கவும்',
    'kn-IN': 'ಧ್ವನಿ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಿ',
    'ml-IN': 'വോയ്‌സ് മോഡ് പ്രാപ്തമാക്കുക',
    'mr-IN': 'व्हॉइस मोड सक्षम करा',
    'bn-IN': 'ভয়েস মোড সক্রিয় করুন',
    'gu-IN': 'વૉઇસ મોડ સક્ષમ કરો',
    'pa-IN': 'ਵੌਇਸ ਮੋਡ ਸਮਰੱਥ ਕਰੋ'
  },
  'onboarding.disclaimer': {
    'en-US': 'This is a training app, not a medical device',
    'en-IN': 'This is a training app, not a medical device',
    'te-IN': 'ఇది శిక్షణ యాప్, వైద్య పరికరం కాదు',
    'hi-IN': 'यह एक प्रशिक्षण ऐप है, चिकित्सा उपकरण नहीं',
    'ta-IN': 'இது ஒரு பயிற்சி செயலி, மருத்துவ சாதனம் அல்ல',
    'kn-IN': 'ಇದು ತರಬೇತಿ ಅಪ್ಲಿಕೇಶನ್, ವೈದ್ಯಕೀಯ ಸಾಧನವಲ್ಲ',
    'ml-IN': 'ഇത് ഒരു പരിശീലന ആപ്പാണ്, മെഡിക്കൽ ഉപകരണമല്ല',
    'mr-IN': 'हे एक प्रशिक्षण अॅप आहे, वैद्यकीय उपकरण नाही',
    'bn-IN': 'এটি একটি প্রশিক্ষণ অ্যাপ, চিকিৎসা যন্ত্র নয়',
    'gu-IN': 'આ એક તાલીમ એપ્લિકેશન છે, તબીબી ઉપકરણ નથી',
    'pa-IN': 'ਇਹ ਇੱਕ ਸਿਖਲਾਈ ਐਪ ਹੈ, ਮੈਡੀਕਲ ਡਿਵਾਈਸ ਨਹੀਂ'
  },
  'onboarding.getStarted': {
    'en-US': 'Get Started',
    'en-IN': 'Get Started',
    'te-IN': 'ప్రారంభించండి',
    'hi-IN': 'शुरू करें',
    'ta-IN': 'தொடங்குங்கள்',
    'kn-IN': 'ಪ್ರಾರಂಭಿಸಿ',
    'ml-IN': 'ആരംഭിക്കുക',
    'mr-IN': 'सुरू करा',
    'bn-IN': 'শুরু করুন',
    'gu-IN': 'શરૂ કરો',
    'pa-IN': 'ਸ਼ੁਰੂ ਕਰੋ'
  },
  
  // Home Screen
  'home.title': {
    'en-US': 'Daily Session',
    'en-IN': 'Daily Session',
    'te-IN': 'రోజువారీ సెషన్',
    'hi-IN': 'दैनिक सत्र',
    'ta-IN': 'தினசரி அமர்வு',
    'kn-IN': 'ದೈನಂದಿನ ಅಧಿವೇಶನ',
    'ml-IN': 'ദിനംപ്രതി സെഷൻ',
    'mr-IN': 'दैनिक सत्र',
    'bn-IN': 'দৈনিক সেশন',
    'gu-IN': 'દૈનિક સત્ર',
    'pa-IN': 'ਰੋਜ਼ਾਨਾ ਸੈਸ਼ਨ'
  },
  'home.startSession': {
    'en-US': 'Start Session',
    'en-IN': 'Start Session',
    'te-IN': 'సెషన్ ప్రారంభించండి',
    'hi-IN': 'सत्र शुरू करें',
    'ta-IN': 'அமர்வைத் தொடங்குங்கள்',
    'kn-IN': 'ಅಧಿವೇಶನ ಪ್ರಾರಂಭಿಸಿ',
    'ml-IN': 'സെഷൻ ആരംഭിക്കുക',
    'mr-IN': 'सत्र सुरू करा',
    'bn-IN': 'সেশন শুরু করুন',
    'gu-IN': 'સત્ર શરૂ કરો',
    'pa-IN': 'ਸੈਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ'
  },
  'home.track': {
    'en-US': 'Track',
    'en-IN': 'Track',
    'te-IN': 'ట్రాక్',
    'hi-IN': 'ट्रैक',
    'ta-IN': 'தடம்',
    'kn-IN': 'ಟ್ರ್ಯಾಕ್',
    'ml-IN': 'ട്രാക്ക്',
    'mr-IN': 'ट्रॅक',
    'bn-IN': 'ট্র্যাক',
    'gu-IN': 'ટ્રેક',
    'pa-IN': 'ਟਰੈਕ'
  },
  'home.time': {
    'en-US': 'Time',
    'en-IN': 'Time',
    'te-IN': 'సమయం',
    'hi-IN': 'समय',
    'ta-IN': 'நேரம்',
    'kn-IN': 'ಸಮಯ',
    'ml-IN': 'സമയം',
    'mr-IN': 'वेळ',
    'bn-IN': 'সময়',
    'gu-IN': 'સમય',
    'pa-IN': 'ਸਮਾਂ'
  },
  'home.mode': {
    'en-US': 'Mode',
    'en-IN': 'Mode',
    'te-IN': 'మోడ్',
    'hi-IN': 'मोड',
    'ta-IN': 'முறை',
    'kn-IN': 'ಮೋಡ್',
    'ml-IN': 'മോഡ്',
    'mr-IN': 'मोड',
    'bn-IN': 'মোড',
    'gu-IN': 'મોડ',
    'pa-IN': 'ਮੋਡ'
  },
  'home.minutes': {
    'en-US': 'minutes',
    'en-IN': 'minutes',
    'te-IN': 'నిమిషాలు',
    'hi-IN': 'मिनट',
    'ta-IN': 'நிமிடங்கள்',
    'kn-IN': 'ನಿಮಿಷಗಳು',
    'ml-IN': 'മിനിറ്റ്',
    'mr-IN': 'मिनिटे',
    'bn-IN': 'মিনিট',
    'gu-IN': 'મિનિટ',
    'pa-IN': 'ਮਿੰਟ'
  },
  
  // Tracks
  'track.numbers': {
    'en-US': 'Numbers/OTP',
    'en-IN': 'Numbers/OTP',
    'te-IN': 'సంఖ్యలు/OTP',
    'hi-IN': 'नंबर/OTP',
    'ta-IN': 'எண்கள்/OTP',
    'kn-IN': 'ಸಂಖ್ಯೆಗಳು/OTP',
    'ml-IN': 'നമ്പറുകൾ/OTP',
    'mr-IN': 'क्रमांक/OTP',
    'bn-IN': 'নম্বর/OTP',
    'gu-IN': 'નંબર/OTP',
    'pa-IN': 'ਨੰਬਰ/OTP'
  },
  'track.names': {
    'en-US': 'Names & Faces',
    'en-IN': 'Names & Faces',
    'te-IN': 'పేర్లు & ముఖాలు',
    'hi-IN': 'नाम और चेहरे',
    'ta-IN': 'பெயர்கள் & முகங்கள்',
    'kn-IN': 'ಹೆಸರುಗಳು ಮತ್ತು ಮುಖಗಳು',
    'ml-IN': 'പേരുകളും മുഖങ്ങളും',
    'mr-IN': 'नावे आणि चेहरे',
    'bn-IN': 'নাম ও মুখ',
    'gu-IN': 'નામ અને ચહેરા',
    'pa-IN': 'ਨਾਮ ਅਤੇ ਚਿਹਰੇ'
  },
  'track.focus': {
    'en-US': 'Focus',
    'en-IN': 'Focus',
    'te-IN': 'ఫోకస్',
    'hi-IN': 'फोकस',
    'ta-IN': 'கவனம்',
    'kn-IN': 'ಗಮನ',
    'ml-IN': 'ഫോക്കസ്',
    'mr-IN': 'फोकस',
    'bn-IN': 'ফোকাস',
    'gu-IN': 'ધ્યાન',
    'pa-IN': 'ਫੋਕਸ'
  },
  'track.cooking': {
    'en-US': 'Cooking',
    'en-IN': 'Cooking',
    'te-IN': 'వంట',
    'hi-IN': 'खाना पकाना',
    'ta-IN': 'சமையல்',
    'kn-IN': 'ಅಡುಗೆ',
    'ml-IN': 'പാചകം',
    'mr-IN': 'स्वयंपाक',
    'bn-IN': 'রান্না',
    'gu-IN': 'રસોઈ',
    'pa-IN': 'ਖਾਣਾ ਪਕਾਉਣਾ'
  },
  'track.politics': {
    'en-US': 'Politics',
    'en-IN': 'Politics',
    'te-IN': 'రాజకీయాలు',
    'hi-IN': 'राजनीति',
    'ta-IN': 'அரசியல்',
    'kn-IN': 'ರಾಜಕೀಯ',
    'ml-IN': 'രാഷ്ട്രീയം',
    'mr-IN': 'राजकारण',
    'bn-IN': 'রাজনীতি',
    'gu-IN': 'રાજકારણ',
    'pa-IN': 'ਰਾਜਨੀਤੀ'
  },
  'track.farming': {
    'en-US': 'Farming',
    'en-IN': 'Farming',
    'te-IN': 'వ్యవసాయం',
    'hi-IN': 'खेती',
    'ta-IN': 'விவசாயம்',
    'kn-IN': 'ಕೃಷಿ',
    'ml-IN': 'കൃഷി',
    'mr-IN': 'शेती',
    'bn-IN': 'কৃষি',
    'gu-IN': 'ખેતી',
    'pa-IN': 'ਖੇਤੀ'
  },
  'track.custom': {
    'en-US': 'Custom Mix',
    'en-IN': 'Custom Mix',
    'te-IN': 'కస్టమ్ మిక్స్',
    'hi-IN': 'कस्टम मिक्स',
    'ta-IN': 'தனிப்பயன் கலவை',
    'kn-IN': 'ಕಸ್ಟಮ್ ಮಿಶ್ರಣ',
    'ml-IN': 'കസ്റ്റം മിക്സ്',
    'mr-IN': 'कस्टम मिश्रण',
    'bn-IN': 'কাস্টম মিক্স',
    'gu-IN': 'કસ્ટમ મિશ્રણ',
    'pa-IN': 'ਕਸਟਮ ਮਿਕਸ'
  },
  'track.surprise': {
    'en-US': 'Surprise Me',
    'en-IN': 'Surprise Me',
    'te-IN': 'నన్ను ఆశ్చర్యపరచండి',
    'hi-IN': 'मुझे आश्चर्यचकित करें',
    'ta-IN': 'என்னை ஆச்சரியப்படுத்துங்கள்',
    'kn-IN': 'ನನಗೆ ಆಶ್ಚರ್ಯ',
    'ml-IN': 'എന്നെ അതിശയിപ്പിക്കൂ',
    'mr-IN': 'मला आश्चर्यचकित करा',
    'bn-IN': 'আমাকে চমকে দিন',
    'gu-IN': 'મને આશ્ચર્ય',
    'pa-IN': 'ਮੈਨੂੰ ਹੈਰਾਨ ਕਰੋ'
  },
  
  // Mode
  'mode.calm': {
    'en-US': 'Calm',
    'en-IN': 'Calm',
    'te-IN': 'ప్రశాంততత',
    'hi-IN': 'शांत',
    'ta-IN': 'அமைதி',
    'kn-IN': 'ಶಾಂತ',
    'ml-IN': 'ശാന്തം',
    'mr-IN': 'शांत',
    'bn-IN': 'শান্ত',
    'gu-IN': 'શાંત',
    'pa-IN': 'ਸ਼ਾਂਤ'
  },
  'mode.game': {
    'en-US': 'Game',
    'en-IN': 'Game',
    'te-IN': 'గేమ్',
    'hi-IN': 'खेल',
    'ta-IN': 'விளையாட்டு',
    'kn-IN': 'ಆಟ',
    'ml-IN': 'ഗെയിം',
    'mr-IN': 'खेळ',
    'bn-IN': 'খেলা',
    'gu-IN': 'રમત',
    'pa-IN': 'ਖੇਡ'
  },
  
  // Navigation
  'nav.explore': {
    'en-US': 'Explore',
    'en-IN': 'Explore',
    'te-IN': 'అన్వేషించండి',
    'hi-IN': 'एक्सप्लोर करें',
    'ta-IN': 'ஆராயுங்கள்',
    'kn-IN': 'ಅನ್ವೇಷಿಸಿ',
    'ml-IN': 'പര്യവേക്ഷണം',
    'mr-IN': 'एक्सप्लोर करा',
    'bn-IN': 'অন্বেষণ',
    'gu-IN': 'અન્વેષણ',
    'pa-IN': 'ਖੋਜੋ'
  },
  'nav.progress': {
    'en-US': 'Progress',
    'en-IN': 'Progress',
    'te-IN': 'పురోగతి'
  },
  'nav.settings': {
    'en-US': 'Settings',
    'en-IN': 'Settings',
    'te-IN': 'సెట్టింగ్స్'
  },
  
  // Progress
  'progress.weeklyStreak': {
    'en-US': 'Weekly Streak',
    'en-IN': 'Weekly Streak',
    'te-IN': 'వారపు స్ట్రీక్'
  },
  'progress.totalSessions': {
    'en-US': 'Total Sessions',
    'en-IN': 'Total Sessions',
    'te-IN': 'మొత్తం సెషన్లు'
  },
  'progress.accuracy': {
    'en-US': 'Accuracy',
    'en-IN': 'Accuracy',
    'te-IN': 'ఖచ్చితత్వం'
  },
  'progress.avgResponseTime': {
    'en-US': 'Avg. Response Time',
    'en-IN': 'Avg. Response Time',
    'te-IN': 'సగటు ప్రతిస్పందన సమయం'
  },
  
  // Settings
  'settings.accessibility': {
    'en-US': 'Accessibility',
    'en-IN': 'Accessibility',
    'te-IN': 'ప్రాప్యత'
  },
  'settings.textSize': {
    'en-US': 'Text Size',
    'en-IN': 'Text Size',
    'te-IN': 'టెక్స్ట్ పరిమాణం'
  },
  'settings.highContrast': {
    'en-US': 'High Contrast',
    'en-IN': 'High Contrast',
    'te-IN': 'అధిక కాంట్రాస్ట్'
  },
  'settings.voiceMode': {
    'en-US': 'Voice Mode',
    'en-IN': 'Voice Mode',
    'te-IN': 'వాయిస్ మోడ్'
  },
  'settings.notifications': {
    'en-US': 'Notifications',
    'en-IN': 'Notifications',
    'te-IN': 'నోటిఫికేషన్లు'
  },
  'settings.language': {
    'en-US': 'Language',
    'en-IN': 'Language',
    'te-IN': 'భాష'
  },
  'settings.exportData': {
    'en-US': 'Export Data',
    'en-IN': 'Export Data',
    'te-IN': 'డేటా ఎగుమతి'
  },
  'settings.deleteData': {
    'en-US': 'Delete All Data',
    'en-IN': 'Delete All Data',
    'te-IN': 'మొత్తం డేటా తొలగించండి'
  },
  
  // Exercise
  'exercise.ready': {
    'en-US': 'Ready?',
    'en-IN': 'Ready?',
    'te-IN': 'సిద్ధంగా ఉన్నారా?'
  },
  'exercise.memorize': {
    'en-US': 'Memorize this',
    'en-IN': 'Memorize this',
    'te-IN': 'దీన్ని గుర్తుంచుకోండి'
  },
  'exercise.recall': {
    'en-US': 'Now recall',
    'en-IN': 'Now recall',
    'te-IN': 'ఇప్పుడు గుర్తుచేసుకోండి'
  },
  'exercise.correct': {
    'en-US': 'Correct!',
    'en-IN': 'Correct!',
    'te-IN': 'సరైనది!'
  },
  'exercise.incorrect': {
    'en-US': 'Incorrect',
    'en-IN': 'Incorrect',
    'te-IN': 'తప్పు'
  },
  'exercise.submit': {
    'en-US': 'Submit',
    'en-IN': 'Submit',
    'te-IN': 'సబ్మిట్'
  },
  'exercise.next': {
    'en-US': 'Next',
    'en-IN': 'Next',
    'te-IN': 'తదుపరి'
  },
  
  // Common
  'common.continue': {
    'en-US': 'Continue',
    'en-IN': 'Continue',
    'te-IN': 'కొనసాగించు'
  },
  'common.back': {
    'en-US': 'Back',
    'en-IN': 'Back',
    'te-IN': 'వెనక్కి'
  },
  'common.cancel': {
    'en-US': 'Cancel',
    'en-IN': 'Cancel',
    'te-IN': 'రద్దు'
  },
  'common.confirm': {
    'en-US': 'Confirm',
    'en-IN': 'Confirm',
    'te-IN': 'నిర్ధారించండి'
  },
  'common.loading': {
    'en-US': 'Loading...',
    'en-IN': 'Loading...',
    'te-IN': 'లోడ్ అవుతోంది...'
  },
};

export const t = (key: string, locale: LocaleCode = 'en-US'): string => {
  return translations[key]?.[locale] || key;
};
