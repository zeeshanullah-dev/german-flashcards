import { motion } from 'framer-motion';
import { useState } from 'react';

function FlashCard({ card, showAnswer, onFlip, onRate }) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    onFlip();
    setTimeout(() => setIsFlipping(false), 600);
  };

  const speak = (text, lang = 'de-DE') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Card Container */}
      <div className="w-full max-w-2xl mx-auto mb-4 md:mb-8 px-2 sm:px-0">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          style={{ perspective: '2000px' }}
        >
          {/* Card Inner - 3D Transform Container (Desktop) / Simple Container (Mobile) */}
          <div
            className="relative cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
              transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
            onClick={handleFlip}
          >
            {/* Front of Card */}
            <div
              className="w-full glass-strong rounded-2xl md:rounded-3xl p-5 md:p-8"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow: '0 20px 50px -12px rgba(139, 92, 246, 0.15)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
                WebkitBackdropFilter: 'blur(20px)',
                backdropFilter: 'blur(20px)',
                position: showAnswer ? 'absolute' : 'relative',
                opacity: showAnswer ? 0 : 1,
                pointerEvents: showAnswer ? 'none' : 'auto',
              }}
            >
              <div className="flex flex-col items-center justify-center text-center relative z-10 px-2 w-full py-4 md:py-6">
                {/* Category Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-bold rounded-full mb-2 md:mb-4 shadow-md"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  {card.category.toUpperCase()}
                </motion.div>

                {/* German Word */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-violet-600 to-blue-600 mb-3 md:mb-4 leading-tight tracking-tight max-w-full"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {card.german}
                </motion.h2>

                {/* Article */}
                {card.article && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-2xl md:text-3xl font-bold text-violet-600 mb-3 md:mb-4 glass px-5 py-2 md:px-6 md:py-2 rounded-lg md:rounded-xl shadow-md"
                  >
                    {card.article}
                  </motion.div>
                )}

                {/* Listen Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(card.german);
                  }}
                  className="mt-3 md:mt-4 px-6 py-2.5 md:px-7 md:py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white rounded-lg md:rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-4.5 md:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v12a1 1 0 01-1.707.707L6.586 13H4a2 2 0 01-2-2V9a2 2 0 012-2h2.586l2.707-2.707A1 1 0 0110 3z" />
                    <path d="M14.293 4.293a1 1 0 011.414 0 8 8 0 010 11.314 1 1 0 01-1.414-1.414 6 6 0 000-8.486 1 1 0 010-1.414z" />
                  </svg>
                  <span className="text-sm">Listen</span>
                </motion.button>

                {/* Hint Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3 md:mt-4 text-gray-500 text-xs md:text-sm font-medium glass px-4 py-2 md:px-5 md:py-2 rounded-full"
                >
                  <span className="inline-block animate-pulse mr-1">✨</span>
                  Tap to reveal
                </motion.div>
              </div>
            </div>

            {/* Back of Card */}
            <div
              className="w-full glass-strong rounded-2xl md:rounded-3xl p-5 md:p-8"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 20px 50px -12px rgba(34, 211, 238, 0.15)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
                WebkitBackdropFilter: 'blur(20px)',
                backdropFilter: 'blur(20px)',
                position: showAnswer ? 'relative' : 'absolute',
                opacity: showAnswer ? 1 : 0,
                pointerEvents: showAnswer ? 'auto' : 'none',
              }}
            >
              <div className="flex flex-col items-center justify-center text-center relative z-10 px-2 w-full py-4 md:py-6">
                {/* Translation Badge */}
                <motion.div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full mb-2 md:mb-4 shadow-md"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  TRANSLATION
                </motion.div>

                {/* English Translation */}
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-cyan-600 to-blue-600 mb-3 md:mb-4 leading-tight tracking-tight max-w-full"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}
                >
                  {card.english}
                </h2>

                {/* Example Section */}
                {card.example && (
                  <div className="mt-2 md:mt-3 p-3 md:p-5 glass rounded-xl md:rounded-2xl w-full shadow-lg">
                    <div className="text-xs font-bold text-cyan-600 mb-2 uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">Example</span>
                    </div>
                    <p className="text-gray-800 font-semibold mb-2 text-sm md:text-base leading-snug">
                      "{card.example}"
                    </p>
                    {card.exampleTranslation && (
                      <p className="text-gray-600 text-xs md:text-sm leading-snug italic border-t border-gray-200 pt-2">
                        {card.exampleTranslation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rating Buttons */}
      {showAnswer && (
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex flex-wrap justify-center w-full max-w-xl gap-2 md:gap-3 mt-3 md:mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRate('again')}
            className="flex-1 min-w-[75px] sm:min-w-[100px] md:min-w-[140px] px-3 py-2.5 md:px-6 md:py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg md:rounded-xl font-bold shadow-lg transition-all"
          >
            <div className="text-xl md:text-2xl mb-1 md:mb-1.5">❌</div>
            <div className="text-xs md:text-sm">Again</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRate('hard')}
            className="flex-1 min-w-[75px] sm:min-w-[100px] md:min-w-[140px] px-3 py-2.5 md:px-6 md:py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg md:rounded-xl font-bold shadow-lg transition-all"
          >
            <div className="text-xl md:text-2xl mb-1 md:mb-1.5">😓</div>
            <div className="text-xs md:text-sm">Hard</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRate('good')}
            className="flex-1 min-w-[75px] sm:min-w-[100px] md:min-w-[140px] px-3 py-2.5 md:px-6 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg md:rounded-xl font-bold shadow-lg transition-all"
          >
            <div className="text-xl md:text-2xl mb-1 md:mb-1.5">👍</div>
            <div className="text-xs md:text-sm">Good</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRate('easy')}
            className="flex-1 min-w-[75px] sm:min-w-[100px] md:min-w-[140px] px-3 py-2.5 md:px-6 md:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg md:rounded-xl font-bold shadow-lg transition-all"
          >
            <div className="text-xl md:text-2xl mb-1 md:mb-1.5">✅</div>
            <div className="text-xs md:text-sm">Easy</div>
          </motion.button>
        </motion.div>
      )}

      {!showAnswer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-3 md:mt-6 px-4"
        >
          <div className="inline-block glass px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl shadow-md">
            <p className="text-sm md:text-base font-medium text-gray-600">
              💭 Think of the answer, then tap
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default FlashCard;
