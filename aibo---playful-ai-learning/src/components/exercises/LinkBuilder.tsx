import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check, X, Info } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface PoolItem {
  text: string;
  belongs: boolean;
  reason: string;
}

interface LinkBuilderProps {
  centralConcept: string;
  pool: PoolItem[];
  onSelect: (selectedIndices: number[]) => void;
  isChecked: boolean;
}

export default function LinkBuilder({
  centralConcept,
  pool,
  onSelect,
  isChecked
}: LinkBuilderProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [showReasons, setShowReasons] = useState<{ [key: number]: boolean }>({});

  const toggleSelection = (index: number) => {
    if (isChecked) return;
    
    const newSelection = selectedIndices.includes(index)
      ? selectedIndices.filter(i => i !== index)
      : [...selectedIndices, index];
    
    setSelectedIndices(newSelection);
    onSelect(newSelection);
    soundManager.play('click');
  };

  const toggleReason = (index: number) => {
    setShowReasons(prev => ({ ...prev, [index]: !prev[index] }));
    soundManager.play('click');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="relative flex justify-center">
        {/* Central Concept */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center p-6 text-center shadow-2xl shadow-indigo-200 border-4 border-white"
        >
          <div className="absolute -top-4 -right-4 p-3 bg-white rounded-2xl shadow-lg text-indigo-600">
            <Share2 size={24} />
          </div>
          <span className="text-xl font-black text-white leading-tight uppercase tracking-tighter">
            {centralConcept}
          </span>
        </motion.div>

        {/* Decorative Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full -z-0 pointer-events-none opacity-10">
          <circle cx="50%" cy="50%" r="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="50%" cy="50%" r="250" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pool.map((item, i) => {
          const isSelected = selectedIndices.includes(i);
          const isCorrect = item.belongs;
          const showFeedback = isChecked;

          return (
            <div key={i} className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSelection(i)}
                disabled={isChecked}
                className={`w-full p-4 rounded-2xl border-2 font-bold transition-all h-full flex flex-col items-center justify-center text-center gap-2 ${
                  isSelected
                    ? showFeedback
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : showFeedback && isCorrect
                      ? 'border-green-200 bg-green-50/50 text-green-400'
                      : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-indigo-200 hover:text-indigo-400'
                }`}
              >
                <span className="text-sm leading-tight">{item.text}</span>
                {showFeedback && (
                  <div className="flex gap-1">
                    {isSelected && (isCorrect ? <Check size={16} /> : <X size={16} />)}
                  </div>
                )}
              </motion.button>

              {showFeedback && (
                <button
                  onClick={() => toggleReason(i)}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-indigo-500 shadow-sm z-20"
                >
                  <Info size={14} />
                </button>
              )}

              <AnimatePresence>
                {showReasons[i] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-slate-800 text-white text-xs rounded-xl shadow-xl z-30 pointer-events-none"
                  >
                    <div className="font-bold mb-1 text-indigo-300">
                      {item.belongs ? 'Connection:' : 'Why not?'}
                    </div>
                    {item.reason}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
