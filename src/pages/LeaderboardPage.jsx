import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { getUsers, getProgress } from '../utils/storage';
import { getLevelInfo } from '../utils/xpUtils';
import { DEMO_LEADERBOARD_USERS } from '../data/demoUsers';
import LeaderboardRow from '../components/LeaderboardRow';
import { Trophy, Award, Zap, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('global');
  const { user } = useAuth();
  const { progress, levelInfo } = useProgress();

  // 1. Fetch all registered real users from LocalStorage
  const storedUsers = getUsers();

  // 2. Map real registered users with their actual progress data from LocalStorage
  const registeredLeaderboardUsers = storedUsers.map(usr => {
    const usrProgress = getProgress(usr.username);
    const lvl = getLevelInfo(usrProgress?.totalXp || 0);

    return {
      id: usr.id,
      name: usr.name,
      username: usr.username,
      avatar: usr.avatar,
      xp: usrProgress?.totalXp || 0,
      bestScore: usrProgress?.bestQuizScore || 0,
      chaptersCompleted: usrProgress?.passedChapters?.length || 0,
      levelTitle: lvl.fullTitle,
      level: lvl.level,
      isDemo: false
    };
  });

  // 3. Merge real registered users with demo baseline users
  const combinedUsersMap = new Map();

  // Add demo users first
  DEMO_LEADERBOARD_USERS.forEach(d => combinedUsersMap.set(d.username.toLowerCase(), d));

  // Override or insert real registered users
  registeredLeaderboardUsers.forEach(r => combinedUsersMap.set(r.username.toLowerCase(), r));

  const allLeaderboardUsers = Array.from(combinedUsersMap.values());

  // 4. Sort by XP descending, then by best score descending
  allLeaderboardUsers.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return b.bestScore - a.bestScore;
  });

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3 bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-indigo-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time LocalStorage Rankings</span>
        </div>

        <h1 className="font-heading font-black text-3xl text-white">Global Leaderboard</h1>
        <p className="text-xs text-slate-300 max-w-xl">
          Compete with fellow learners. Rankings update dynamically from local storage based on XP earned, chapter quiz scores, and streak days.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
          {['global', 'weekly', 'monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing {allLeaderboardUsers.length} Top Learners
        </span>
      </div>

      {/* Leaderboard Table List */}
      <div className="space-y-3">
        {allLeaderboardUsers.map((item, idx) => (
          <LeaderboardRow
            key={item.id || idx}
            user={item}
            rank={idx + 1}
            isCurrentUser={user?.username.toLowerCase() === item.username.toLowerCase()}
          />
        ))}
      </div>

    </div>
  );
}
