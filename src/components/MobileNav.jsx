import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Trophy, Award, User } from 'lucide-react';

export default function MobileNav() {
  const items = [
    { to: "/dashboard", label: "Home", icon: LayoutDashboard },
    { to: "/chapters", label: "Learn", icon: BookOpen },
    { to: "/leaderboard", label: "Ranks", icon: Trophy },
    { to: "/achievements", label: "Badges", icon: Award },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1020]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex justify-around items-center">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
