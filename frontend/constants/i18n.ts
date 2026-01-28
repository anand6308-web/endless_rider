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
    'te-IN': 'రోజువారీ సాధన సమయం'
  },
  'onboarding.voiceMode': {
    'en-US': 'Enable voice mode',
    'en-IN': 'Enable voice mode',
    'te-IN': 'వాయిస్ మోడ్ ప్రారంభించండి'
  },
  'onboarding.disclaimer': {
    'en-US': 'This is a training app, not a medical device',
    'en-IN': 'This is a training app, not a medical device',
    'te-IN': 'ఇది శిక్షణ యాప్, వైద్య పరికరం కాదు'
  },
  'onboarding.getStarted': {
    'en-US': 'Get Started',
    'en-IN': 'Get Started',
    'te-IN': 'ప్రారంభించండి'
  },
  
  // Home Screen
  'home.title': {
    'en-US': 'Daily Session',
    'en-IN': 'Daily Session',
    'te-IN': 'రోజువారీ సెషన్'
  },
  'home.startSession': {
    'en-US': 'Start Session',
    'en-IN': 'Start Session',
    'te-IN': 'సెషన్ ప్రారంభించండి'
  },
  'home.track': {
    'en-US': 'Track',
    'en-IN': 'Track',
    'te-IN': 'ట్రాక్'
  },
  'home.time': {
    'en-US': 'Time',
    'en-IN': 'Time',
    'te-IN': 'సమయం'
  },
  'home.mode': {
    'en-US': 'Mode',
    'en-IN': 'Mode',
    'te-IN': 'మోడ్'
  },
  'home.minutes': {
    'en-US': 'minutes',
    'en-IN': 'minutes',
    'te-IN': 'నిమిషాలు'
  },
  
  // Tracks
  'track.numbers': {
    'en-US': 'Numbers/OTP',
    'en-IN': 'Numbers/OTP',
    'te-IN': 'సంఖ్యలు/OTP'
  },
  'track.names': {
    'en-US': 'Names & Faces',
    'en-IN': 'Names & Faces',
    'te-IN': 'పేర్లు & ముఖాలు'
  },
  'track.focus': {
    'en-US': 'Focus',
    'en-IN': 'Focus',
    'te-IN': 'ఫోకస్'
  },
  'track.custom': {
    'en-US': 'Custom Mix',
    'en-IN': 'Custom Mix',
    'te-IN': 'కస్టమ్ మిక్స్'
  },
  'track.surprise': {
    'en-US': 'Surprise Me',
    'en-IN': 'Surprise Me',
    'te-IN': 'నన్ను ఆశ్చర్యపరచండి'
  },
  
  // Mode
  'mode.calm': {
    'en-US': 'Calm',
    'en-IN': 'Calm',
    'te-IN': 'ప్రశాంతత'
  },
  'mode.game': {
    'en-US': 'Game',
    'en-IN': 'Game',
    'te-IN': 'గేమ్'
  },
  
  // Navigation
  'nav.home': {
    'en-US': 'Home',
    'en-IN': 'Home',
    'te-IN': 'హోమ్'
  },
  'nav.explore': {
    'en-US': 'Explore',
    'en-IN': 'Explore',
    'te-IN': 'అన్వేషించండి'
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
