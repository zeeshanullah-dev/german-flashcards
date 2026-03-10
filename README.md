# 🇩🇪 German Flashcards App

A beautiful and functional flashcard application to help you prepare for the B1 TELC German exam.

## 🎉 Includes 300+ B1 Vocabulary Words!

The app comes pre-loaded with **300+ essential German vocabulary words** specifically curated for the B1 TELC exam, covering all major topics including daily life, work, health, travel, food, family, and more. See [VOCABULARY.md](VOCABULARY.md) for the complete list.

## Features

✨ **Smart Learning**
- Spaced repetition algorithm for optimal retention
- Rate cards as Again, Hard, Good, or Easy
- Cards automatically scheduled based on your performance

🎴 **Flashcard Management**
- Add unlimited vocabulary cards
- Categories: Nouns, Verbs, Adjectives, Phrases, and more
- Include German articles (der, die, das) for nouns
- Add example sentences with translations
- Edit or delete existing cards

🎤 **Audio Pronunciation**
- Text-to-speech for German words
- Practice listening skills

📊 **Progress Tracking**
- Total cards, studied cards, and mastered cards
- Category breakdown visualization
- Study streak counter
- Total reviews tracking

💾 **Data Management**
- All data stored locally in your browser
- Export your cards as JSON backup
- Import cards from backup files

🎨 **Beautiful UI**
- Smooth animations with Framer Motion
- Gradient purple theme
- Responsive design
- Card flip animations

## Getting Started

### Prerequisites
- Node.js (v20.19+ or v22.12+)

### Installation

1. Navigate to the project directory:
```bash
cd ~/Documents/learning/german-flashcards
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: **http://localhost:5173**

## Usage

### Study Mode
1. Click on a flashcard to reveal the answer
2. Click the 🔊 Listen button to hear pronunciation
3. Rate your knowledge:
   - ❌ **Again**: Forgot completely, see it soon
   - 😓 **Hard**: Difficult to remember, see it moderately soon
   - 👍 **Good**: Remembered well, standard interval
   - ✅ **Easy**: Very easy, long interval before next review

### Manage Cards
1. Click "Manage" in the navigation
2. **🔄 Reset** - Restore all 300+ default B1 vocabulary cards and reset progress
3. **📥 Export** - Download your cards as a JSON file for backup
4. **📤 Import** - Upload a previously exported JSON file
5. **➕ Add** - Create custom vocabulary cards with:
   - German word (required)
   - English translation (required)
   - Category (Noun, Verb, Adjective, etc.)
   - Article (for nouns: der, die, das)
   - Example sentence in German (optional)
   - Example translation in English (optional)
6. **✏️ Edit** or **🗑️ Delete** existing cards

### Statistics
- View your overall progress
- See cards by category
- Track your study streak
- Monitor total reviews

## Vocabulary Included

The app comes pre-loaded with **300+ B1 TELC vocabulary words** organized by topic:

- 📅 **Daily Routines & Time** - 30+ words
- 🏠 **Household & Living** - 15+ words
- 💼 **Work & Professions** - 13+ words
- 📚 **Education & Learning** - 12+ words
- 🏥 **Health & Body** - 15+ words
- 🍽️ **Food & Dining** - 30+ words
- ✈️ **Travel & Transportation** - 25+ words
- 🛍️ **Shopping & Money** - 18+ words
- 🌤️ **Weather & Seasons** - 17+ words
- 👨‍👩‍👧‍👦 **Family & Relationships** - 17+ words
- 💻 **Communication & Technology** - 14+ words
- 🔤 **Essential Verbs** - 50+ words
- 🎨 **Common Adjectives** - 40+ words
- 💬 **Common Phrases** - 10+ phrases

Each card includes German word (with article for nouns), English translation, and example sentences. See [VOCABULARY.md](VOCABULARY.md) for the complete list.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **LocalStorage** - Data persistence
- **Web Speech API** - Text-to-speech

## Tips for B1 TELC Exam

1. **Add cards regularly**: Build your vocabulary gradually
2. **Use example sentences**: Context helps memory
3. **Practice daily**: Even 10 minutes makes a difference
4. **Focus on articles**: Critical for German nouns
5. **Review consistently**: The spaced repetition algorithm works best with regular use
6. **Listen to pronunciations**: Improve your speaking and listening skills

## Data Storage

All your data is stored locally in your browser's LocalStorage. This means:
- ✅ Your data is private and never leaves your computer
- ✅ Works offline
- ⚠️ Clearing browser data will delete your cards
- 💡 Use the Export feature regularly to backup your cards

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder. You can open `dist/index.html` directly in your browser.

## Keyboard Shortcuts (Future Enhancement)

Coming soon:
- Space: Flip card
- 1: Again
- 2: Hard
- 3: Good
- 4: Easy

## Contributing

This is a personal project for your B1 TELC exam preparation. Feel free to modify and enhance it as needed!

## Good Luck! 🍀

Viel Erfolg bei deiner B1 Prüfung! 🎉
