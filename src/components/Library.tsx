import React, { useState } from 'react';
import { GlyphData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Trash2 } from 'lucide-react';

interface LibraryProps {
  history: GlyphData[];
  onSelect: (glyph: GlyphData) => void;
  onDelete: (id: string) => void;
}

export default function Library({ history, onSelect, onDelete }: LibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(glyph => 
    glyph.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
    glyph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    glyph.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 bg-black flex flex-col p-4 md:p-8 overflow-hidden relative border-t border-white/5"
    >
      <div className="absolute inset-0 opacity-10 grid-pattern pointer-events-none"></div>
      
      <div className="flex items-center gap-4 mb-6 md:mb-12 mt-2 md:mt-6 relative z-10 w-full max-w-2xl mx-auto">
        <Search className="text-zinc-500 w-4 h-4 md:w-5 md:h-5" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="SEARCH MANIFESTATIONS..."
          className="flex-1 bg-transparent border-b border-white/20 text-white font-mono text-xs md:text-sm pb-2 uppercase tracking-[0.2em] focus:border-blue-500 outline-none placeholder:text-zinc-700"
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6 w-full max-w-[1400px] mx-auto px-2 md:px-4 pb-20">
          <AnimatePresence>
            {filteredHistory.map((glyph) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={glyph.id}
                className="group relative flex flex-col items-center gap-2 md:gap-3 text-left w-full"
              >
                <div 
                  onClick={() => onSelect(glyph)}
                  className="w-full aspect-square bg-elegant-surface border border-white/10 group-hover:border-blue-500 transition-colors flex items-center justify-center p-2 md:p-4 cursor-pointer relative overflow-hidden"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-500 group-hover:text-blue-400 transition-colors">
                    {glyph.paths.map((p, i) => (
                      <path key={i} d={p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    ))}
                  </svg>
                  
                  {/* Delete Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(glyph.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/80 border border-white/10 text-zinc-400 hover:text-red-500 hover:border-red-500/50 opacity-0 group-hover:opacity-100 transition-all z-20 tooltip-trigger"
                    title="Delete Glyph"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div 
                  onClick={() => onSelect(glyph)}
                  className="w-full space-y-1 cursor-pointer"
                >
                  <h3 className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold truncate group-hover:text-blue-200 transition-colors">{glyph.name}</h3>
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 uppercase tracking-widest truncate">
                    <span>{glyph.word}</span>
                    <span className="opacity-50">{new Date(glyph.createdAt).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredHistory.length === 0 && (
            <div className="col-span-full pt-20 text-center flex flex-col items-center">
              <div className="text-zinc-600 font-mono tracking-widest text-[10px] uppercase">No Fragment Data Found</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Hum Intensity overlay just to add atmosphere */}
      <motion.div 
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"
      />
    </motion.div>
  );
}
