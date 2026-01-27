# Morning Memory Gym - MVP Documentation

## 🧠 Overview

**Morning Memory Gym** is a scientifically-grounded memory and focus training application designed for adults (primary audience: 50+). The app implements evidence-based cognitive training techniques including:

- **Retrieval Practice**: Active recall exercises
- **Spaced Repetition**: SM-2 algorithm for optimal review scheduling  
- **Adaptive Difficulty**: Automatically adjusts to maintain 70-85% success rate
- **Localization**: Multi-language support with culturally appropriate content

## ✨ Features

### Core Training Modules

1. **Numbers/OTP Memory** ("One-Shot OTP")
   - Memorize and recall digit sequences (4-10 digits)
   - Adaptive exposure time (600-2000ms)
   - Practical for remembering OTPs, phone numbers, PINs

2. **Names & Faces** ("Name-Face Snap")
   - Associate names with faces
   - Multiple choice or type-in modes
   - Culturally representative content for each locale

3. **Focus Training** ("Switch Rules")
   - Attention switching exercises
   - Rule-based number selection tasks
   - Tracks errors and reaction time

### Intelligent Features

- **Spaced Repetition**: Items reviewed at optimal intervals based on performance
- **Adaptive Difficulty**: Difficulty adjusts automatically to keep you in the optimal learning zone
- **Progress Tracking**: Visual charts showing accuracy and response time improvements
- **Accessibility**: Large text, high contrast, voice mode options

### Localization

- **Supported Locales**:
  - English (US) - en-US
  - English (India) - en-IN
  - Telugu - te-IN (UI strings)
- **Content Packs**: Culturally appropriate names and training tips for each locale

## 📱 Tech Stack

### Frontend
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: Expo Router (file-based routing)
- **Storage**: LocalStorage (web) / SQLite (native - planned)
- **UI Components**: React Native core components

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **API**: RESTful endpoints for sync and content delivery

## 🚀 Quick Start

The app is already running! Access it at the preview URL provided.

### For Development

```bash
# Frontend
cd /app/frontend
yarn start

# Backend
cd /app/backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## 🎯 Usage Flow

### First Launch
1. **Onboarding** (4 steps):
   - Welcome and disclaimer
   - Select language/locale
   - Choose training goal (track)
   - Set daily time (2/5/10 min) and voice mode

### Daily Training
1. **Home Screen**: Configure session
   - Select Track: Numbers, Names & Faces, Focus, Custom Mix, or Surprise Me
   - Choose Duration: 2, 5, or 10 minutes
   - Pick Mode: Calm or Game

2. **Training Session**: 
   - Exercise with real-time feedback
   - Progress bar showing completion
   - Adaptive difficulty based on performance

3. **Results**: 
   - Accuracy percentage
   - Response time statistics
   - Performance insights and tips

### Progress Tracking
- **Progress Tab**: View stats, skill levels, recent activity
- **Explore Tab**: Browse all modules and content packs
- **Settings Tab**: Customize accessibility, language, notifications

## 🧪 How It Works

### Spaced Repetition (SM-2 Algorithm)
- Quality score (0-5) based on correctness and response time
- Success increases interval (1d → 6d → 15d...)
- Failure resets to 1 day
- Ease factor adjusts based on quality

### Adaptive Difficulty
- Success rate < 70%: Decrease difficulty
- Success rate 70-85%: Maintain (optimal learning zone)
- Success rate > 85%: Increase difficulty

Adjustments per exercise:
- **Numbers**: Digit count, exposure time
- **Names**: Multiple choice vs. typing, exposure time
- **Focus**: Number count, time limit, rule complexity

## 🔧 Customization Guide

### Adding a New Exercise

1. **Define in `/frontend/constants/exercises.json`**
2. **Create component in `/frontend/components/exercises/`**
3. **Add to session runner in `/frontend/app/session.tsx`**
4. **Update session engine in `/frontend/utils/sessionEngine.ts`**

### Adding a New Content Pack

1. **Add to `/frontend/constants/content-packs.json`**
2. **Add translations in `/frontend/constants/i18n.ts`**

## 🎨 Accessibility Features

- **Text Sizing**: 3 levels (Normal, Large, Extra Large)
- **High Contrast Mode**: Enhanced visibility
- **Voice Mode**: Text-to-speech for prompts (UI toggle available)
- **Touch Targets**: Minimum 44x44pt for easy tapping

## 🔒 Important Disclaimers

1. **Not a Medical Device**: This app is for cognitive training and entertainment, not medical diagnosis or treatment
2. **Performance Metrics**: Scores reflect training performance, not cognitive ability
3. **Results**: Individual results may vary; consistent practice recommended

## 📄 What's Implemented

✅ Complete onboarding flow  
✅ 3 exercise modules (Numbers, Names & Faces, Focus)  
✅ Session engine with adaptive difficulty  
✅ Spaced repetition scheduling  
✅ Progress tracking  
✅ Multi-language support (3 locales)  
✅ Settings & accessibility options  
✅ Results screen with insights  
✅ Cross-platform storage  
✅ FastAPI backend with MongoDB  

## 🛣️ Future Enhancements

- Push notifications for reminders
- Voice input for exercises
- More exercise types
- Social features (family mode)
- Advanced analytics
- Module marketplace

---

**Remember**: Consistency is key! Just 5 minutes daily can make a meaningful difference in your cognitive training journey.
