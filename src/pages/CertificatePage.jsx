import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import CertificateView from '../components/CertificateView';
import { GraduationCap, Lock, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chapters';

export default function CertificatePage() {
  const { user } = useAuth();
  const { progress } = useProgress();

  const passedChapters = progress?.passedChapters || [];
  const isEligible = passedChapters.length >= 5 || progress?.certificateIssued;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3 bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-blue-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Academy Accreditation</span>
        </div>

        <h1 className="font-heading font-black text-3xl text-white">Prompt Engineering Certificate</h1>
        <p className="text-xs text-slate-300 max-w-xl">
          Demonstrate your prompt engineering expertise. Earn an official verified platform credential upon passing all 5 curriculum chapters with 75%+ scores.
        </p>
      </div>

      {isEligible ? (
        <CertificateView user={user} progress={progress} />
      ) : (
        /* Locked Certificate View */
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-2xl text-white">Certificate Currently Locked</h2>
            <p className="text-xs text-slate-300">
              You must complete all 5 curriculum chapters and pass each chapter quiz with a score of <strong>75% or higher</strong> to unlock your certificate.
            </p>
          </div>

          {/* Chapters Checklist */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-left text-xs max-w-md mx-auto">
            {CHAPTERS_DATA.map((ch) => {
              const isPassed = passedChapters.includes(ch.id);
              return (
                <div key={ch.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-slate-300">Chapter {ch.number}: {ch.title}</span>
                  {isPassed ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium text-[11px]">Pending</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-heading font-bold text-xs shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              <span>Continue Learning to Unlock</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
