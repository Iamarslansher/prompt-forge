import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#07111F] border-t border-white/10 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info & Developer Credit */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="PromptForge Logo"
              className="w-9 h-9 object-contain drop-shadow"
            />
            <div>
              <span className="font-heading font-black text-white text-xl tracking-tight">
                Prompt<span className="text-[#F6C453]">Forge</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-medium tracking-wider">
                Learn • Practice • Master
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            Interactive Prompt Engineering Academy. Empowering learners from
            zero knowledge to certified prompt engineering mastery.
          </p>

          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 text-xs text-blue-200 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400 fill-red-400 shrink-0" />
            <span>
              Developed by <strong>Arslan Sher</strong>
            </span>
          </div>
        </div>

        {/* Curriculum Links */}
        <div>
          <h4 className="text-sm font-semibold text-white font-heading mb-3">
            5-Chapter Curriculum
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                to="/chapters/1"
                className="hover:text-blue-400 transition-colors"
              >
                01. Foundations of Prompting
              </Link>
            </li>
            <li>
              <Link
                to="/chapters/2"
                className="hover:text-blue-400 transition-colors"
              >
                02. Anatomy of a Powerful Prompt
              </Link>
            </li>
            <li>
              <Link
                to="/chapters/3"
                className="hover:text-blue-400 transition-colors"
              >
                03. Think Like a Prompt Engineer
              </Link>
            </li>
            <li>
              <Link
                to="/chapters/4"
                className="hover:text-blue-400 transition-colors"
              >
                04. Real-World Applications
              </Link>
            </li>
            <li>
              <Link
                to="/chapters/5"
                className="hover:text-blue-400 transition-colors"
              >
                05. Become a Prompt Engineer
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform Features */}
        <div>
          <h4 className="text-sm font-semibold text-white font-heading mb-3">
            Platform Features
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-blue-400 transition-colors"
              >
                Global Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/achievements"
                className="hover:text-blue-400 transition-colors"
              >
                Badges & XP Levels
              </Link>
            </li>
            <li>
              <Link
                to="/certificate"
                className="hover:text-blue-400 transition-colors"
              >
                Download Certificate
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-400 transition-colors"
              >
                Student Profile
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About PromptForge
              </Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack Specs */}
        <div>
          <h4 className="text-sm font-semibold text-white font-heading mb-3">
            Follow Us
          </h4>
          <div className="space-y-2 text-xs text-slate-400">
            <Link
              to="https://www.linkedin.com/in/arsalan-sher-0bb9b32a8/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <FaLinkedin className="w-3.5 h-3.5 text-blue-400" />
              LinkedIn
            </Link>
            <Link
              to="https://twitter.com/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <FaSquareTwitter className="w-3.5 h-3.5 text-purple-400" />
              Twitter
            </Link>
            <Link
              to="https://github.com/Iamarslansher/prompt-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <FaGithubSquare className="w-3.5 h-3.5 text-gray-400" /> GitHub
            </Link>
            <p className="mt-4 text-[11px] text-slate-500">
              © 2026 PromptForge. Developed by Arslan Sher.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
