import { comprehensiveVocabulary, getVocabularyByLevel } from './comprehensiveVocabulary.js';

const STORAGE_KEY = 'german_flashcards';
const STATS_KEY = 'german_flashcards_stats';
const LEVEL_KEY = 'german_flashcards_level';

// Initialize cards from comprehensive vocabulary (optionally filtered by level)
const initializeCards = (level = null) => {
  const vocabulary = level ? getVocabularyByLevel(level) : comprehensiveVocabulary;
  return vocabulary.map((vocab, index) => ({
    id: `${vocab.level}-${index + 1}`,
    german: vocab.german,
    english: vocab.english,
    category: vocab.category,
    level: vocab.level,
    article: vocab.article || '',
    example: vocab.example || '',
    exampleTranslation: vocab.exampleTranslation || '',
    progress: {
      easeFactor: 2.5,
      interval: 1,
      reviews: 0,
      lastReview: null,
      nextReview: Date.now(),
    },
  }));
};

// Level management
export function getCurrentLevel() {
  const stored = localStorage.getItem(LEVEL_KEY);
  return stored || 'A1'; // Default to A1
}

export function setCurrentLevel(level) {
  localStorage.setItem(LEVEL_KEY, level);
}

export function getCards() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with all comprehensive vocabulary
    const initialCards = initializeCards();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCards));
    return initialCards;
  }

  const cards = JSON.parse(stored);

  // Check if cards need migration (old cards without level property)
  if (cards.length > 0 && !cards[0].level) {
    console.log('Migrating old cards to new format with levels...');
    // Reset to new vocabulary with levels
    return resetToDefaultVocabulary();
  }

  return cards;
}

// Get cards filtered by current level
export function getCardsByLevel(level) {
  const allCards = getCards();
  return allCards.filter(card => card.level === level);
}

export function addCard(cardData) {
  const cards = getCards();
  const newCard = {
    id: Date.now().toString(),
    ...cardData,
    progress: {
      easeFactor: 2.5,
      interval: 1,
      reviews: 0,
      lastReview: null,
      nextReview: Date.now(),
    },
  };
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  return newCard;
}

export function updateCard(id, cardData) {
  const cards = getCards();
  const index = cards.findIndex((card) => card.id === id);
  if (index !== -1) {
    cards[index] = { ...cards[index], ...cardData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
}

export function deleteCard(id) {
  const cards = getCards();
  const filtered = cards.filter((card) => card.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function saveProgress(cardId, rating) {
  const cards = getCards();
  const card = cards.find((c) => c.id === cardId);
  if (!card) return;

  const now = Date.now();
  const progress = card.progress;

  // Update stats
  updateStats(rating);

  // SM-2 Algorithm (simplified)
  let easeFactor = progress.easeFactor;
  let interval = progress.interval;

  switch (rating) {
    case 'again':
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      interval = 1;
      break;
    case 'hard':
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      interval = Math.max(1, Math.floor(interval * 1.2));
      break;
    case 'good':
      interval = Math.ceil(interval * easeFactor);
      break;
    case 'easy':
      easeFactor = Math.min(2.5, easeFactor + 0.15);
      interval = Math.ceil(interval * easeFactor * 1.3);
      break;
  }

  progress.easeFactor = easeFactor;
  progress.interval = interval;
  progress.reviews += 1;
  progress.lastReview = now;
  progress.nextReview = now + interval * 24 * 60 * 60 * 1000; // Convert days to ms

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function getStats() {
  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) {
    const initialStats = {
      totalReviews: 0,
      studyStreak: 0,
      lastStudyDate: null,
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
    return initialStats;
  }
  return JSON.parse(stored);
}

function updateStats(rating) {
  const stats = getStats();
  const today = new Date().toDateString();
  const lastStudy = stats.lastStudyDate
    ? new Date(stats.lastStudyDate).toDateString()
    : null;

  stats.totalReviews += 1;

  // Update streak
  if (lastStudy !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastStudy === yesterdayStr) {
      stats.studyStreak += 1;
    } else if (lastStudy !== today) {
      stats.studyStreak = 1;
    }
    stats.lastStudyDate = new Date().toISOString();
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function exportCards() {
  const cards = getCards();
  return JSON.stringify(cards, null, 2);
}

export function importCards(jsonData) {
  const cards = JSON.parse(jsonData);
  // Validate structure
  if (!Array.isArray(cards)) {
    throw new Error('Invalid data format');
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function resetToDefaultVocabulary() {
  const initialCards = initializeCards();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCards));
  // Reset stats as well
  const initialStats = {
    totalReviews: 0,
    studyStreak: 0,
    lastStudyDate: null,
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
  // Reset to A1 level
  localStorage.setItem(LEVEL_KEY, 'A1');
  return initialCards;
}

// Switch level - keeps progress but changes what cards are shown
export function switchLevel(newLevel) {
  setCurrentLevel(newLevel);
  return getCardsByLevel(newLevel);
}
