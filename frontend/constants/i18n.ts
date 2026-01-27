// Internationalization strings
// Currently supports: en-US, en-IN, te-IN (basic)

export type LocaleCode = 'en-US' | 'en-IN' | 'te-IN';

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
    'te-IN': 'మార్నింగ్ మెమరీ జిమ్‌కి స్వాగతం'
  },
  'onboarding.selectLocale': {
    'en-US': 'Select your language',
    'en-IN': 'Select your language',
    'te-IN': 'మీ భాషను ఎంచుకోండి'
  },
  'onboarding.selectTrack': {
    'en-US': 'Choose your training goal',
    'en-IN': 'Choose your training goal',
    'te-IN': 'మీ శిక్షణ లక్ష్యాన్ని ఎంచుకోండి'
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
