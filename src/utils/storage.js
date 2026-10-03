const KEYS = {
  USERS: 'pf_users',
  CURRENT_USER: 'pf_current_user',
  PROGRESS: 'pf_progress',
  QUIZ_ATTEMPTS: 'pf_quiz_attempts',
  LEADERBOARD: 'pf_leaderboard',
  ACHIEVEMENTS: 'pf_achievements',
  THEME: 'pf_theme',
  STREAK: 'pf_streak'
};

export const DEFAULT_USER_PROGRESS = {
  unlockedChapters: [1],
  passedChapters: [],
  chapterScores: {},
  readChapters: [],
  totalXp: 0,
  quizAttemptsCount: 0,
  bestQuizScore: 0,
  unlockedAchievements: [],
  certificateIssued: false,
  certificateId: null,
  certificateDate: null,
  streakDays: 1,
  lastLoginDate: new Date().toISOString().split('T')[0]
};

export function getStoredJSON(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

export function setStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// User Accounts
export function getUsers() {
  return getStoredJSON(KEYS.USERS, []);
}

export function saveUser(user) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id || u.username.toLowerCase() === user.username.toLowerCase());
  if (index >= 0) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  setStoredJSON(KEYS.USERS, users);
}

export function getCurrentUser() {
  return getStoredJSON(KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  setStoredJSON(KEYS.CURRENT_USER, user);
}

export function removeCurrentUser() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

// Update profile helper
export function updateUserProfileInStorage(originalUsername, updatedUser) {
  const users = getUsers();
  const index = users.findIndex(u => u.username.toLowerCase() === originalUsername.toLowerCase());
  
  if (index >= 0) {
    users[index] = { ...users[index], ...updatedUser };
    setStoredJSON(KEYS.USERS, users);
  }

  // Update session
  setCurrentUser(updatedUser);

  // If username changed, migrate progress & quiz attempt logs
  if (updatedUser.username !== originalUsername) {
    const allProgress = getStoredJSON(KEYS.PROGRESS, {});
    if (allProgress[originalUsername]) {
      allProgress[updatedUser.username] = allProgress[originalUsername];
      delete allProgress[originalUsername];
      setStoredJSON(KEYS.PROGRESS, allProgress);
    }

    const allAttempts = getStoredJSON(KEYS.QUIZ_ATTEMPTS, {});
    if (allAttempts[originalUsername]) {
      allAttempts[updatedUser.username] = allAttempts[originalUsername];
      delete allAttempts[originalUsername];
      setStoredJSON(KEYS.QUIZ_ATTEMPTS, allAttempts);
    }
  }
}

// Progress
export function getProgress(username) {
  if (!username) return DEFAULT_USER_PROGRESS;
  const allProgress = getStoredJSON(KEYS.PROGRESS, {});
  return allProgress[username] || { ...DEFAULT_USER_PROGRESS };
}

export function saveProgress(username, progressData) {
  if (!username) return;
  const allProgress = getStoredJSON(KEYS.PROGRESS, {});
  allProgress[username] = { ...allProgress[username], ...progressData };
  setStoredJSON(KEYS.PROGRESS, allProgress);
}

// Quiz Attempts Log
export function getQuizAttempts(username) {
  if (!username) return [];
  const allAttempts = getStoredJSON(KEYS.QUIZ_ATTEMPTS, {});
  return allAttempts[username] || [];
}

export function saveQuizAttempt(username, attempt) {
  if (!username) return;
  const allAttempts = getStoredJSON(KEYS.QUIZ_ATTEMPTS, {});
  const userAttempts = allAttempts[username] || [];
  userAttempts.unshift({
    id: `attempt_${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...attempt
  });
  allAttempts[username] = userAttempts;
  setStoredJSON(KEYS.QUIZ_ATTEMPTS, allAttempts);
}

// Theme
export function getStoredTheme() {
  return localStorage.getItem(KEYS.THEME) || 'dark';
}

export function setStoredTheme(theme) {
  localStorage.setItem(KEYS.THEME, theme);
}
