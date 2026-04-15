import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Zap, Check, X as CloseIcon } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface RapidFireProps {
  questions: any[];
  onComplete: (score: number) => void;
  isChecked: boolean;
}

export default function RapidFire({ questions, onComplete, isChecked }: RapidFireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished && !isChecked) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished, isChecked, score, onComplete]);

  const handleAnswer = (isCorrect: boolean) => {
    if (feedback) return;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCombo(prev => {
        const next = prev + 1;
        setMaxCombo(m => Math.max(m, next));
        return next;
      });
      soundManager.play('correct');
    } else {
      setCombo(0);
      soundManager.play('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 800);
  };

  if (isFinished || isChecked) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 py-8"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="w-40 h-40 bg-gradient-to-br from-aibo-blue-400 to-aibo-blue-600 rounded-full flex flex-col items-center justify-center mx-auto shadow-2xl border-4 border-white"
          >
            <span className="text-6xl font-display font-black text-white leading-none">{score}</span>
            <span className="text-xs font-black text-aibo-blue-100 uppercase tracking-widest mt-1">Points</span>
          </motion.div>
          {maxCombo > 2 && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute -right-4 -top-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-black text-sm shadow-lg border-2 border-white flex items-center gap-1"
            >
              <Zap size={14} fill="currentColor" />
              {maxCombo}x COMBO
            </motion.div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-display font-black text-gray-800">Blitz Complete!</h3>
          <p className="text-gray-500 font-bold text-lg">
            Accuracy: {Math.round((score / questions.length) * 100)}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Time Left</p>
            <p className="text-xl font-black text-gray-700">{timeLeft}s</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Combo</p>
            <p className="text-xl font-black text-gray-700">{maxCombo}</p>
          </div>
        </div>

        {!isChecked && (
          <button
            onClick={() => {
              const speedBonus = timeLeft > 15 ? 5 : timeLeft > 5 ? 2 : 0;
              const comboBonus = Math.floor(maxCombo / 2);
              onComplete(score + speedBonus + comboBonus);
            }}
            className="btn-3d btn-3d-blue w-full py-4 text-xl uppercase tracking-wider max-w-sm mx-auto"
          >
            Finish Blitz
          </button>
        )}
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-8 relative">
      {/* Feedback Flash Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-10 rounded-3xl pointer-events-none flex items-center justify-center ${
              feedback === 'correct' ? 'bg-duo-green/20' : 'bg-aibo-red-500/20'
            }`}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              className={`p-4 rounded-full ${feedback === 'correct' ? 'bg-duo-green text-white' : 'bg-aibo-red-500 text-white'}`}
            >
              {feedback === 'correct' ? <Check size={48} strokeWidth={4} /> : <CloseIcon size={48} strokeWidth={4} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className={`flex items-center gap-2 transition-colors duration-300 ${timeLeft < 10 ? 'text-aibo-red-500 animate-pulse' : 'text-aibo-blue-500'}`}>
            <Timer className="w-6 h-6" />
            <span className="font-display font-black text-2xl tabular-nums">{timeLeft}s</span>
          </div>
          
          <div className="flex items-center gap-3">
            {combo > 1 && (
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-black text-sm shadow-sm"
              >
                <Zap size={14} fill="currentColor" />
                {combo}x
              </motion.div>
            )}
            <div className="text-gray-400 font-display font-black text-sm uppercase tracking-widest">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 30) * 100}%` }}
            className={`h-full transition-colors duration-500 ${timeLeft < 10 ? 'bg-aibo-red-500' : 'bg-aibo-blue-500'}`}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border-4 border-gray-100 rounded-[2.5rem] p-10 shadow-xl text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-aibo-blue-400 to-aibo-blue-600 opacity-20" />
            <h4 className="text-2xl font-display font-black text-gray-800 leading-tight">
              {currentQ.question}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((opt: string) => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={!!feedback}
                onClick={() => handleAnswer(opt === currentQ.correctAnswer)}
                className={`group relative p-6 text-left font-display font-black text-xl rounded-3xl border-b-4 transition-all duration-200 ${
                  feedback && opt === currentQ.correctAnswer
                    ? 'bg-duo-green text-white border-green-700 shadow-none translate-y-1'
                    : feedback && opt !== currentQ.correctAnswer && feedback === 'incorrect'
                      ? 'bg-gray-100 text-gray-400 border-gray-200 shadow-none'
                      : 'bg-white border-gray-200 hover:border-aibo-blue-300 text-gray-700 shadow-[0_4px_0_#E5E7EB] hover:shadow-[0_4px_0_#93C5FD]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    feedback && opt === currentQ.correctAnswer
                      ? 'bg-white text-duo-green border-white'
                      : 'border-gray-200 group-hover:border-aibo-blue-300'
                  }`}>
                    {feedback && opt === currentQ.correctAnswer && <Check size={18} strokeWidth={4} />}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
