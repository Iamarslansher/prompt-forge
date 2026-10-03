import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CHAPTERS_DATA } from '../data/chapters';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter sections and concepts
  const results = [];
  if (query.trim()) {
    const q = query.toLowerCase();
    CHAPTERS_DATA.forEach(ch => {
      if (ch.title.toLowerCase().includes(q) || ch.description.toLowerCase().includes(q)) {
        results.push({
          type: 'Chapter',
          title: `Chapter ${ch.number}: ${ch.title}`,
          subtitle: ch.subtitle,
          link: `/chapters/${ch.id}`
        });
      }

      ch.sections?.forEach(sec => {
        if (sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)) {
          results.push({
            type: 'Topic',
            title: sec.title,
            subtitle: `In Chapter ${ch.number}: ${ch.title}`,
            link: `/chapters/${ch.id}`
          });
        }
      });
    });
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="bg-[#111A33] border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
        >
          {/* Header Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters, prompt techniques (e.g. 'few shot', 'RCTCO')..."
              className="bg-transparent w-full text-white placeholder-slate-400 focus:outline-none text-base"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {!query.trim() ? (
              <div className="text-center py-8 text-slate-400">
                <Sparkles className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-60" />
                <p className="text-sm">Type to search techniques, frameworks & topics</p>
                <div className="flex flex-wrap gap-2 justify-center mt-3 text-xs">
                  {['RCTCO', 'Few-shot', 'JSON Prompting', 'Injection', 'Role'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 text-slate-300 border border-white/5 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">No prompt engineering topics found matching "{query}"</p>
              </div>
            ) : (
              results.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase">{item.type}</span>
                      <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
