import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Trophy, Award, GraduationCap, User, Info, Sparkles } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export default function Sidebar() {
  const { progress } = useProgress();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/chapters", label: "Curriculum", icon: BookOpen },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/achievements", label: "Achievements", icon: Award },
    { 
      to: "/certificate", 
      label: "Certificate", 
      icon: GraduationCap,
      badge: progress?.certificateIssued ? "Unlocked" : null,
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/about", label: "About Academy", icon: Info },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0B1020]/90 border-r border-white/10 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Main Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 border border-blue-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Course Completion Progress Box */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/20 text-xs">
          <div className="flex items-center gap-2 text-blue-300 font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Course Progress</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(((progress?.passedChapters?.length || 0) / 5) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{progress?.passedChapters?.length || 0} / 5 Chapters</span>
            <span className="text-white font-medium">{Math.round(((progress?.passedChapters?.length || 0) / 5) * 100)}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
