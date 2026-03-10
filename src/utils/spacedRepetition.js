// Spaced Repetition Algorithm
// Prioritizes cards that are due for review

export function getNextCard(cards) {
  if (cards.length === 0) return null;

  const now = Date.now();

  // Filter cards that are due for review
  const dueCards = cards.filter((card) => {
    return card.progress.nextReview <= now;
  });

  // If there are due cards, pick one randomly
  if (dueCards.length > 0) {
    return dueCards[Math.floor(Math.random() * dueCards.length)];
  }

  // If no cards are due, return the card with the earliest next review
  const sortedCards = [...cards].sort(
    (a, b) => a.progress.nextReview - b.progress.nextReview
  );
  return sortedCards[0];
}

export function getDueCardsCount(cards) {
  const now = Date.now();
  return cards.filter((card) => card.progress.nextReview <= now).length;
}

export function getUpcomingReviews(cards) {
  const now = Date.now();
  const upcoming = {
    today: 0,
    tomorrow: 0,
    thisWeek: 0,
  };

  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneWeekMs = 7 * oneDayMs;

  cards.forEach((card) => {
    const timeUntil = card.progress.nextReview - now;

    if (timeUntil <= 0) {
      upcoming.today += 1;
    } else if (timeUntil <= oneDayMs) {
      upcoming.tomorrow += 1;
    } else if (timeUntil <= oneWeekMs) {
      upcoming.thisWeek += 1;
    }
  });

  return upcoming;
}
