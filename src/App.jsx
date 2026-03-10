import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlashCard from './components/FlashCard';
import CardManager from './components/CardManager';
import Stats from './components/Stats';
import { getCards, getCardsByLevel, saveProgress, getStats, getCurrentLevel, switchLevel } from './utils/storage';
import { getNextCard } from './utils/spacedRepetition';

// Check if vocabulary needs to be loaded
const checkVocabularyLoaded = () => {
  const stored = localStorage.getItem('german_flashcards');
  if (stored) {
    const cards = JSON.parse(stored);
    // If less than 100 cards, it's the old data
    if (cards.length < 100) {
      return false;
    }
  }
  return true;
};

function App() {
  const [view, setView] = useState('study'); // 'study', 'manage', 'stats'
  const [cards, setCards] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('A1');
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState(null);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if we need to show update banner
    const vocabLoaded = checkVocabularyLoaded();
    if (!vocabLoaded) {
      setShowUpdateBanner(true);
    }

    // Load current level
    const level = getCurrentLevel();
    setCurrentLevel(level);

    loadCards(level);
    setStats(getStats());
  }, []);

  const loadCards = (level) => {
    const loadedCards = getCardsByLevel(level || currentLevel);
    setCards(loadedCards);
    if (loadedCards.length > 0) {
      setCurrentCard(getNextCard(loadedCards));
    }
  };

  const handleLevelChange = (newLevel) => {
    setCurrentLevel(newLevel);
    switchLevel(newLevel);
    setShowAnswer(false);
    loadCards(newLevel);
  };

  const handleRating = (rating) => {
    if (!currentCard || isTransitioning) return;

    saveProgress(currentCard.id, rating);

    // Start transition - fade out current card
    setIsTransitioning(true);

    // After fade out, update to next card
    setTimeout(() => {
      const updatedCards = getCardsByLevel(currentLevel);
      setCards(updatedCards);
      setStats(getStats());

      const nextCard = getNextCard(updatedCards);
      setCurrentCard(nextCard);
      setShowAnswer(false);

      // End transition - fade in new card
      setIsTransitioning(false);
    }, 300);
  };

  const handleCardUpdate = () => {
    loadCards(currentLevel);
    setStats(getStats());
  };

  const handleLoadNewVocabulary = () => {
    if (confirm('This will load 300+ B1 vocabulary words and clear your current progress. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen md:h-screen md:overflow-y-auto p-3 sm:p-6 md:p-10">
      <div className="mx-auto space-y-3 md:space-y-8" style={{ maxWidth: '1100px' }}>
        {/* Update Banner */}
        {showUpdateBanner && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong border border-emerald-500/30 text-white p-6 rounded-2xl mb-6 text-center shadow-2xl"
          >
            <p className="font-bold text-lg mb-2">🎉 1200+ Vocabulary Words Available!</p>
            <p className="text-sm text-emerald-200 mb-4">Upgrade to the complete A1, A2, and B1 vocabulary set!</p>
            <button
              onClick={handleLoadNewVocabulary}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg border border-white/20"
            >
              Load Complete Vocabulary
            </button>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-3 md:mb-8">
            {/* Logo/Title - Hidden on mobile */}
            <div className="flex-1 hidden md:flex justify-start">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="glass px-4 py-2 rounded-xl"
              >
                <span className="text-3xl">🇩🇪</span>
              </motion.div>
            </div>

            {/* Main Title */}
            <div className="flex-1 text-center">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 mb-1 md:mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                DeutschLern
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-xs md:text-sm font-medium hidden md:block"
              >
                Master German with Confidence
              </motion.p>
            </div>

            {/* Level Selector */}
            <div className="flex-1 flex justify-center md:justify-end gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLevelChange('A1')}
                className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-bold transition-all text-xs md:text-sm ${
                  currentLevel === 'A1'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'glass text-gray-700 hover:shadow-md'
                }`}
              >
                A1
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLevelChange('A2')}
                className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-bold transition-all text-xs md:text-sm ${
                  currentLevel === 'A2'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'glass text-gray-700 hover:shadow-md'
                }`}
              >
                A2
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLevelChange('B1')}
                className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-bold transition-all text-xs md:text-sm ${
                  currentLevel === 'B1'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                    : 'glass text-gray-700 hover:shadow-md'
                }`}
              >
                B1
              </motion.button>
            </div>
          </div>

          {/* Level Info Badge - Hidden on mobile */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="hidden md:inline-block glass px-6 py-3 rounded-full"
          >
            <span className="text-gray-700 font-semibold text-sm">
              <span className="text-violet-600 font-bold">{currentLevel}</span> Level
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-blue-600 font-bold">{cards.length}</span> cards
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-emerald-600">TELC Prep</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-1.5 md:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('study')}
            className={`px-3 py-2 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-semibold transition-all text-xs md:text-base ${
              view === 'study'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                : 'glass text-gray-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-1 md:gap-2.5">
              <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Study</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('manage')}
            className={`px-3 py-2 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-semibold transition-all text-xs md:text-base ${
              view === 'manage'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                : 'glass text-gray-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-1 md:gap-2.5">
              <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Manage</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('stats')}
            className={`px-3 py-2 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-semibold transition-all text-xs md:text-base ${
              view === 'stats'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                : 'glass text-gray-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-1 md:gap-2.5">
              <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Stats</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {view === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {currentCard ? (
                <motion.div
                  key={currentCard.id}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isTransitioning ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FlashCard
                    card={currentCard}
                    showAnswer={showAnswer}
                    onFlip={() => setShowAnswer(!showAnswer)}
                    onRate={handleRating}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-strong rounded-3xl shadow-2xl p-12 text-center border border-white/10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-7xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    All Done!
                  </h2>
                  <p className="text-violet-200/80 mb-8 text-lg">No cards to study right now. Great job!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('manage')}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all border border-white/20"
                  >
                    Manage Cards
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CardManager cards={cards} onUpdate={handleCardUpdate} />
            </motion.div>
          )}

          {view === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Stats stats={stats} cards={cards} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
