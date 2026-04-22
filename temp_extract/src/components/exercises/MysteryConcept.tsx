import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HelpCircle, Trophy } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface MysteryConceptProps {
  concept: string;
  clues: string[];
  hotKeywords: string[];
  warmKeywords: string[];
  onSelect: (guess: string) => void;
  isChecked: boolean;
}

export default function MysteryConcept({
  concept,
  clues,
  hotKeywords,
  warmKeywords,
  onSelect,
  isChecked
}: MysteryConceptProps) {
  const [revealedClues, setRevealedClues] = useState(1);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'cold' | 'warm' | 'hot' | 'correct'>('none');

  const handleGuess = (e: FormEvent) => {
    e.preventDefault();
    if (isChecked || !guess.trim()) return;

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedConcept = concept.toLowerCase();

    if (normalizedGuess === normalizedConcept) {
      setFeedback('correct');
      onSelect(guess);
      soundManager.play('correct');
    } else if (hotKeywords.some(k => normalizedGuess.includes(k.toLowerCase()))) {
      setFeedback('hot');
      soundManager.play('click');
    } else if (warmKeywords.some(k => normalizedGuess.includes(k.toLowerCase()))) {
      setFeedback('warm');
      soundManager.play('click');
    } else {
      setFeedback('cold');
      soundManager.play('incorrect');
    }
  };

  const revealNextClue = () => {
    if (revealedClues < clues.length) {
      setRevealedClues(prev => prev + 1);
      soundManager.play('click');
    }
  };

  const handleReveal = () => {
    setFeedback('correct');
    setGuess(concept);
    onSelect(concept);
    soundManager.play('click');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Search size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Mystery Concept</h3>
        </div>

        <div className="space-y-4 mb-8">
          {clues.slice(0, revealedClues).map((clue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center font-bold text-gray-500">
                {i + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{clue}</p>
            </motion.div>
          ))}
        </div>

        {revealedClues < clues.length && !isChecked ? (
          <button
            onClick={revealNextClue}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-amber-400 hover:text-amber-600 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle size={20} />
            Reveal Next Clue
          </button>
        ) : revealedClues === clues.length && !isChecked && feedback !== 'correct' ? (
          <button
            onClick={handleReveal}
            className="w-full py-3 border-2 border-dashed border-amber-300 rounded-xl text-amber-600 font-bold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trophy size={20} />
            Reveal Answer
          </button>
        ) : null}
      </div>

      <form onSubmit={handleGuess} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={isChecked}
            placeholder="What is the concept?"
            className="w-full p-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-lg"
          />
          <button
            type="submit"
            disabled={isChecked || !guess.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
          >
            Guess
          </button>
        </div>

        <AnimatePresence mode="wait">
          {feedback !== 'none' && (
            <motion.div
              key={feedback}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 ${
                feedback === 'correct' ? 'bg-green-100 text-green-700' :
                feedback === 'hot' ? 'bg-orange-100 text-orange-700' :
                feedback === 'warm' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}
            >
              {feedback === 'correct' && <Trophy size={20} />}
              {feedback === 'correct' ? 'Correct!' :
               feedback === 'hot' ? 'Burning Hot! Almost there!' :
               feedback === 'warm' ? 'Getting Warm...' :
               'Cold... Try another clue!'}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="flex justify-center gap-2">
        {clues.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < revealedClues ? 'bg-amber-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
