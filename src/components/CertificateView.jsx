import React, { useState } from 'react';
import { Download, Printer, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { formatDate, downloadCertificateAsImage } from '../utils/certificateUtils';

export default function CertificateView({ user, progress }) {
  const [downloading, setDownloading] = useState(false);

  const certId = progress?.certificateId || "PF-2026-EX89A2";
  const issueDate = formatDate(progress?.certificateDate);
  const bestScore = progress?.bestQuizScore || 92;
  const candidateName = user?.name?.toUpperCase() || "ARSALAN SHER";

  const handleDownload = async () => {
    setDownloading(true);
    await downloadCertificateAsImage('printable-certificate', `PromptForge_Certificate_${user?.username || 'User'}.png`);
    setDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div>
          <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Official Prompt Engineering Certificate
          </h3>
          <p className="text-xs text-slate-400">Verified platform credential • ID: {certId}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Certificate</span>
          </button>
          
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "Generating PNG..." : "Download Certificate"}</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div className="overflow-x-auto pb-4">
        <div
          id="printable-certificate"
          className="min-w-[800px] w-full bg-[#0B1020] text-[#F8FAFC] p-8 sm:p-12 rounded-3xl border-8 border-[#F6C453]/40 relative shadow-2xl overflow-hidden font-sans select-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(246, 196, 83, 0.05) 0%, rgba(11, 16, 32, 0.95) 100%)`
          }}
        >
          {/* Inner Decorative Gold Border */}
          <div className="border-2 border-dashed border-[#F6C453]/30 p-8 rounded-2xl relative">
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#F6C453]" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#F6C453]" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#F6C453]" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#F6C453]" />

            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F6C453]/20 to-amber-500/20 border border-[#F6C453]/40 text-[#F6C453] text-xs font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4 text-[#F6C453]" />
                PROMPTFORGE ACADEMY
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                Certificate of Completion
              </h1>
              <p className="text-xs text-slate-400 tracking-wider uppercase">Official Prompt Engineering Certification</p>
            </div>

            {/* Body Certification Statement */}
            <div className="text-center space-y-6 my-8">
              <p className="text-sm text-slate-300 font-light italic">This certifies that</p>
              
              <div className="py-2">
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F6C453] via-yellow-200 to-amber-400 tracking-wide border-b-2 border-[#F6C453]/30 inline-block pb-2 px-8">
                  {candidateName}
                </h2>
              </div>

              <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                has successfully completed the full 5-chapter curriculum of <strong className="text-white font-semibold">PROMPT ENGINEERING MASTERY</strong> and demonstrated advanced proficiency in:
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl mx-auto text-xs text-slate-300">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ Prompt Fundamentals</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ Structured Prompting</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ Few-Shot Reasoning</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ Real-World Engineering</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ Security & Injection</div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">✓ AI Agent Workflows</div>
              </div>
            </div>

            {/* Footer Signatures & Gold Seal */}
            <div className="mt-12 pt-8 border-t border-[#F6C453]/20 flex flex-wrap items-end justify-between gap-6">
              
              {/* Left Details */}
              <div className="text-left space-y-1">
                <p className="text-[11px] text-slate-400">Final Assessment Score: <strong className="text-[#F6C453]">{bestScore}%</strong></p>
                <p className="text-[11px] text-slate-400">Certificate ID: <span className="font-mono text-white">{certId}</span></p>
                <p className="text-[11px] text-slate-400">Date Issued: <span className="text-white">{issueDate}</span></p>
              </div>

              {/* Middle Gold Seal Badge */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#0B1020] border-2 border-[#F6C453] flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-6 h-6 text-[#F6C453]" />
                    <span className="text-[8px] font-black text-[#F6C453] uppercase tracking-tighter">VERIFIED</span>
                    <span className="text-[7px] text-slate-300 uppercase">PROMPTFORGE</span>
                  </div>
                </div>
              </div>

              {/* Right Signature Area */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-lg text-amber-300 font-bold border-b border-white/20 pb-1">
                  Arsalan Sher
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Lead Frontend Architect & Creator</p>
                <p className="text-[9px] text-slate-500">PROMPTFORGE ACADEMY</p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
