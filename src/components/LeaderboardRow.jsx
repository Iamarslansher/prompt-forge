import React from 'react';
import { Award, Zap, CheckCircle2 } from 'lucide-react';

export default function LeaderboardRow({ user, rank, isCurrentUser }) {
  let rankBadge = null;
  if (rank === 1) rankBadge = "🥇 01";
  else if (rank === 2) rankBadge = "🥈 02";
  else if (rank === 3) rankBadge = "🥉 03";
  else rankBadge = `#${String(rank).padStart(2, '0')}`;

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        isCurrentUser
          ? "bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30"
          : "glass-panel border-white/5 hover:border-white/10"
      }`}
    >
      {/* Left Rank & User */}
      <div className="flex items-center gap-4 min-w-0">
        <span className={`font-heading font-black text-sm w-10 text-center ${
          rank === 1 ? "text-amber-400 text-base" : rank === 2 ? "text-slate-300" : rank === 3 ? "text-amber-600" : "text-slate-500"
        }`}>
          {rankBadge}
        </span>

        <div className="relative shrink-0">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
            alt={user.name}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10"
          />
          {isCurrentUser && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-semibold text-sm text-white truncate">
              {user.name}
            </h4>
            {isCurrentUser && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider">
                YOU
              </span>
            )}
            {user.badge && (
              <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                {user.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 truncate">
            @{user.username} • <span className="text-blue-300">{user.levelTitle || `Level ${user.level || 1}`}</span>
          </p>
        </div>
      </div>

      {/* Right XP & Score Stats */}
      <div className="flex items-center gap-4 sm:gap-8 shrink-0">
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-400">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>{user.xp?.toLocaleString()} XP</span>
          </div>
          <p className="text-[10px] text-slate-400">Total Earned</p>
        </div>

        <div className="text-right hidden sm:block">
          <div className="flex items-center justify-end gap-1 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{user.bestScore}%</span>
          </div>
          <p className="text-[10px] text-slate-400">Best Quiz Score</p>
        </div>
      </div>
    </div>
  );
}
