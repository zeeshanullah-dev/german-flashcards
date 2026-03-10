import { motion } from 'framer-motion';

function Stats({ stats, cards }) {
  if (!stats) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong rounded-3xl shadow-2xl p-12 text-center border border-white/10"
      >
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-3xl font-bold text-white mb-2">No Stats Yet</h3>
        <p className="text-violet-200/70">Start studying to see your progress!</p>
      </motion.div>
    );
  }

  const totalCards = cards.length;
  const studiedCards = cards.filter((card) => card.progress?.reviews > 0).length;
  const masteredCards = cards.filter(
    (card) => card.progress?.easeFactor >= 2.5 && card.progress?.reviews >= 5
  ).length;

  const categoryBreakdown = cards.reduce((acc, card) => {
    acc[card.category] = (acc[card.category] || 0) + 1;
    return acc;
  }, {});

  const progressPercentage = Math.round((studiedCards / totalCards) * 100) || 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong rounded-3xl p-8 shadow-lg"
      >
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Your Progress
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 text-center hover:shadow-md transition-all"
          >
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-purple-600 mb-2">
              {totalCards}
            </div>
            <div className="text-gray-600 font-semibold text-sm">Total Cards</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6 text-center hover:shadow-md transition-all"
          >
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-600 mb-2">
              {studiedCards}
            </div>
            <div className="text-gray-600 font-semibold text-sm">Studied</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6 text-center hover:shadow-md transition-all"
          >
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-green-600 mb-2">
              {masteredCards}
            </div>
            <div className="text-gray-600 font-semibold text-sm">Mastered</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6 text-center hover:shadow-md transition-all"
          >
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-rose-600 mb-2">
              {stats.totalReviews}
            </div>
            <div className="text-gray-600 font-semibold text-sm">Reviews</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">Overall Progress</h3>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Cards by Category
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([category, count], index) => (
              <motion.div
                key={category}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-semibold text-gray-700">{category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 md:w-48 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / totalCards) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.05 }}
                      className="bg-gradient-to-r from-violet-500 to-blue-500 h-full rounded-full"
                    />
                  </div>
                  <span className="text-violet-600 font-bold w-10 text-right">
                    {count}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Study Streak */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Study Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-lg p-4">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2">
                {stats.studyStreak} 🔥
              </div>
              <div className="text-gray-600 text-sm font-medium">Day Streak</div>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-2">
                {progressPercentage}%
              </div>
              <div className="text-gray-600 text-sm font-medium">Completion</div>
            </div>
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-xl p-6 text-center text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <p className="text-base md:text-lg font-bold relative z-10">
            {masteredCards >= totalCards * 0.8
              ? "🎉 Amazing! You've mastered most of your cards!"
              : masteredCards >= totalCards * 0.5
              ? '💪 Great progress! Keep up the good work!'
              : studiedCards >= totalCards * 0.5
              ? '👍 Good start! Keep studying regularly!'
              : '🚀 Start your learning journey today!'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Stats;
