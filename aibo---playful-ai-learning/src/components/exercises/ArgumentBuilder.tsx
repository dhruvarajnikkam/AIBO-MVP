import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface ArgumentCard {
  text: string;
  side: 'for' | 'against';
  note: string;
}

interface ArgumentBuilderProps {
  statement: string;
  cards: ArgumentCard[];
  onSelect: (assignments: { [key: number]: 'for' | 'against' }) => void;
  isChecked: boolean;
}

export default function ArgumentBuilder({
  statement,
  cards,
  onSelect,
  isChecked
}: ArgumentBuilderProps) {
  const [assignments, setAssignments] = useState<{ [key: number]: 'for' | 'against' }>({});
  const [showNotes, setShowNotes] = useState<{ [key: number]: boolean }>({});

  const handleAssign = (index: number, side: 'for' | 'against') => {
    if (isChecked) return;
    const newAssignments = { ...assignments, [index]: side };
    setAssignments(newAssignments);
    onSelect(newAssignments);
    soundManager.play('click');
  };

  const toggleNote = (index: number) => {
    setShowNotes(prev => ({ ...prev, [index]: !prev[index] }));
    soundManager.play('click');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Scale size={120} />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">The Debate</h3>
        <p className="text-2xl font-bold leading-tight relative z-10">"{statement}"</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            layout
            className={`p-6 rounded-2xl border-2 transition-all ${
              assignments[i] === 'for' ? 'border-emerald-500 bg-emerald-50' :
              assignments[i] === 'against' ? 'border-rose-500 bg-rose-50' :
              'border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-lg font-medium text-slate-800 flex-1">{card.text}</p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAssign(i, 'for')}
                  disabled={isChecked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-bold ${
                    assignments[i] === 'for'
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-200 text-slate-400 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  <ThumbsUp size={18} /> For
                </button>
                <button
                  onClick={() => handleAssign(i, 'against')}
                  disabled={isChecked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-bold ${
                    assignments[i] === 'against'
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-600'
                  }`}
                >
                  <ThumbsDown size={18} /> Against
                </button>
                {isChecked && (
                  <button
                    onClick={() => toggleNote(i)}
                    className="p-2 text-slate-400 hover:text-slate-600"
                  >
                    <Info size={20} />
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showNotes[i] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white/50 rounded-xl text-sm text-slate-600 italic border border-slate-200"
                >
                  {card.note}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
