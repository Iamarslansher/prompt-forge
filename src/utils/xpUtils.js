export const LEVEL_THRESHOLDS = [
  { level: 1, title: "Beginner", minXp: 0, maxXp: 299, color: "text-slate-400" },
  { level: 2, title: "Learner", minXp: 300, maxXp: 699, color: "text-blue-400" },
  { level: 3, title: "Explorer", minXp: 700, maxXp: 1199, color: "text-cyan-400" },
  { level: 4, title: "Practitioner", minXp: 1200, maxXp: 1799, color: "text-emerald-400" },
  { level: 5, title: "Prompt Crafter", minXp: 1800, maxXp: 2499, color: "text-purple-400" },
  { level: 6, title: "Prompt Engineer", minXp: 2500, maxXp: 3299, color: "text-indigo-400" },
  { level: 7, title: "Advanced Engineer", minXp: 3300, maxXp: 4199, color: "text-amber-400" },
  { level: 8, title: "Prompt Master", minXp: 4200, maxXp: 99999, color: "text-yellow-300" },
];

export function getLevelInfo(xp = 0) {
  const current = LEVEL_THRESHOLDS.find(t => xp >= t.minXp && xp <= t.maxXp) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const next = LEVEL_THRESHOLDS.find(t => t.level === current.level + 1);

  let progressPercent = 100;
  let xpToNext = 0;

  if (next) {
    const xpInLevel = xp - current.minXp;
    const range = next.minXp - current.minXp;
    progressPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / range) * 100)));
    xpToNext = next.minXp - xp;
  }

  return {
    level: current.level,
    title: current.title,
    fullTitle: `Level ${String(current.level).padStart(2, '0')} — ${current.title}`,
    minXp: current.minXp,
    maxXp: current.maxXp,
    color: current.color,
    progressPercent,
    xpToNext,
    nextLevelTitle: next ? next.title : "MAX LEVEL"
  };
}
