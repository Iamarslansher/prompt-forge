import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Sun, Moon, Flame, Zap, Award, LogOut, User } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { progress, levelInfo } = useProgress();
  const { isDark, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="PromptForge Logo"
              className="w-9 h-9 object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white flex items-center gap-0.5">
                Prompt<span className="text-[#F6C453]">Forge</span>
              </span>
              <span className="text-[9px] text-slate-400 font-medium tracking-widest uppercase block -mt-1">
                Learn • Practice • Master
              </span>
            </div>
          </Link>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 text-xs transition-colors"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline text-slate-400">Search topics...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Session Info */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Streak Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500/30" />
                  <span>{progress?.streakDays || 1}d Streak</span>
                </div>

                {/* Level / XP Pill */}
                <Link to="/profile" className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold hover:bg-blue-500/20 transition-colors">
                  <Zap className="w-4 h-4 text-blue-400 fill-blue-400/30" />
                  <span>{progress?.totalXp || 0} XP</span>
                </Link>

                {/* Profile Avatar */}
                <div className="relative group">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg bg-blue-900/30 ring-2 ring-blue-500/30 object-cover"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#111A33] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-blue-400 truncate">@{user.username}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4 text-blue-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/achievements"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Award className="w-4 h-4 text-purple-400" />
                        Achievements
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
