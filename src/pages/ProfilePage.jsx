import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';
import { checkPasswordStrength } from '../utils/passwordUtils';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import AchievementCard from '../components/AchievementCard';
import { User, Mail, Lock, Eye, EyeOff, Edit3, Camera, Save, X, Award, GraduationCap, Zap, Flame, CheckCircle2, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { progress, levelInfo, attemptsHistory } = useProgress();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordStrength = checkPasswordStrength(formData.password);
  const unlockedAchIds = progress?.unlockedAchievements || [];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      setError('Name, username, and email cannot be empty.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar
      };

      if (formData.password) {
        if (formData.password.length < 6) {
          throw new Error('New password must be at least 6 characters.');
        }
        payload.password = formData.password;
      }

      updateProfile(payload);

      addToast({
        title: "Profile Updated! ✨",
        message: "Your changes have been saved to local storage.",
        type: 'success',
        icon: 'CheckCircle'
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative group">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username}`}
              alt={user?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-500/30 shadow-2xl shrink-0"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-colors"
              title="Edit Profile Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">{user?.name}</h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {levelInfo.fullTitle}
              </span>
            </div>

            <p className="text-xs text-blue-400">@{user?.username} • Prompt Engineer in Progress</p>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Member since {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'October 2026'}
            </p>

            {/* Level Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>Level Progress</span>
                <span>{levelInfo.progressPercent}% ({levelInfo.xpToNext} XP to next level)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: `${levelInfo.progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          {progress?.certificateIssued ? (
            <Link
              to="/certificate"
              className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs text-center space-y-0.5"
            >
              <GraduationCap className="w-5 h-5 mx-auto text-amber-400" />
              <strong className="block text-white font-bold">🏆 CERTIFIED</strong>
              <span className="text-[10px]">View Certificate</span>
            </Link>
          ) : (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 text-xs text-center">
              <strong className="block text-slate-300 font-semibold">Certificate Locked</strong>
              <span className="text-[10px]">Complete 5 chapters</span>
            </div>
          )}
        </div>

      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1 fill-amber-400" />
          <div className="font-heading font-black text-2xl text-white">{(progress?.totalXp || 0).toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Total XP</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="font-heading font-black text-2xl text-white">{progress?.passedChapters?.length || 0} / 5</div>
          <span className="text-[11px] text-slate-400">Chapters Passed</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="font-heading font-black text-2xl text-white">{progress?.bestQuizScore || 0}%</div>
          <span className="text-[11px] text-slate-400">Best Quiz Score</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1 fill-amber-500" />
          <div className="font-heading font-black text-2xl text-white">{progress?.streakDays || 1} Days</div>
          <span className="text-[11px] text-slate-400">Daily Streak</span>
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-white">Earned Badges & Achievements</h2>
          <Link to="/achievements" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
            View All ({unlockedAchIds.length} / {ACHIEVEMENTS_DATA.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_DATA.slice(0, 6).map((ach) => (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              isUnlocked={unlockedAchIds.includes(ach.id)}
            />
          ))}
        </div>
      </div>

      {/* Quiz Attempt History Log */}
      {attemptsHistory.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">Recent Quiz Attempts</h3>
          <div className="space-y-2">
            {attemptsHistory.slice(0, 5).map((att) => (
              <div key={att.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white">Chapter {att.chapterId} Assessment</h4>
                  <span className="text-[10px] text-slate-400">{new Date(att.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${att.passed ? "text-emerald-400" : "text-red-400"}`}>
                    {att.score}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">{att.correctCount} / {att.totalQuestions} Correct</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#111A33] border border-white/10 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-400" />
                Edit Profile Details
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Profile Picture / Avatar</label>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={formData.avatar || user?.avatar}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-blue-500/30 shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                      placeholder="Paste Image URL"
                      className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                    <label className="inline-block text-[11px] text-blue-400 hover:underline cursor-pointer">
                      Or Upload File...
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 mb-1">Or choose a preset avatar:</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar: preset }))}
                      className={`w-9 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        formData.avatar === preset ? "border-blue-500 ring-2 ring-blue-500/30" : "border-transparent opacity-75"
                      }`}
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2 pl-9 text-xs text-white"
                    required
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2 pl-9 text-xs text-white"
                    required
                  />
                  <span className="text-slate-500 font-bold text-xs absolute left-3.5 top-2">@</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2 pl-9 text-xs text-white"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">New Password (Optional)</label>
                  {formData.password && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Leave blank to keep current"
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2 pl-9 pr-9 text-xs text-white"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full transition-all ${passwordStrength.barColor}`} style={{ width: `${passwordStrength.percent}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{submitting ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
