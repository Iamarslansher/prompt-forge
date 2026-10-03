import React from 'react';
import { DEMO_EXPLORERS } from '../data/demoUsers';
import { Users, Sparkles, Activity } from 'lucide-react';

export default function RecentExplorers() {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm text-white flex items-center gap-1.5">
              Recent Explorers
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </h3>
            <p className="text-[11px] text-slate-400">Learners active on Prompt Master</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
          Community
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_EXPLORERS.map((exp) => (
          <div
            key={exp.id}
            className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all flex items-center gap-3"
          >
            <div className="relative">
              <img
                src={exp.avatar}
                alt={exp.name}
                className="w-9 h-9 rounded-lg object-cover ring-2 ring-blue-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B1020]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-white truncate">{exp.name}</h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                <span className="text-blue-400 font-medium">Lvl {exp.level}</span>
                <span>•</span>
                <span>{exp.lastActive}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
