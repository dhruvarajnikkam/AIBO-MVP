import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/sounds';

interface OnboardingProps {
  onComplete: (data: { name: string; grade: string; subject: string; triedAI: boolean }) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [triedAI, setTriedAI] = useState<boolean | null>(null);

  const handleNext = () => {
    soundManager.play('click');
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({ name, grade, subject, triedAI: triedAI ?? false });
    }
  };

  return (
    <div className="absolute inset-0 z-[800] bg-gradient-to-br from-aibo-blue-50 via-white to-aibo-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur border border-white shadow-2xl p-8 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>
        
        {/* Mascot / Macro handling */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-32 h-32 mx-auto rounded-full mb-4 shadow-xl overflow-hidden border-4 border-white bg-white relative z-10"
        >
          <img src="/Student.png" alt="Student Mascot" className="w-full h-full object-cover scale-110" />
        </motion.div>

        <div className="relative z-10 min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-display font-black text-gray-700">What's your name?</h2>
                <p className="text-sm text-gray-500 font-medium">We'll use this to track your amazing progress.</p>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-aibo-blue-400 focus:outline-none font-display text-lg text-center"
                  autoFocus
                />
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-display font-black text-gray-700">What grade are you in?</h2>
                <div className="grid grid-cols-3 gap-2">
                  {['1st', '2nd', '3rd', '4th', '5th', '6th'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`py-3 rounded-xl font-display font-bold text-sm transition-all ${
                        grade === g 
                          ? 'bg-aibo-blue-500 text-white shadow-md scale-105' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-display font-black text-gray-700">Favorite Subject?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Math', 'Science', 'Art', 'Reading'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSubject(s)}
                      className={`py-3 rounded-xl font-display font-bold transition-all ${
                        subject === s 
                          ? 'bg-aibo-blue-500 text-white shadow-md scale-105' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-display font-black text-gray-700">Have you tried AI before?</h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setTriedAI(true)}
                    className={`py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 transition-all ${
                      triedAI === true 
                        ? 'bg-aibo-blue-500 text-white shadow-md scale-105' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    Yes, I have!
                  </button>
                  <button
                    onClick={() => setTriedAI(false)}
                    className={`py-4 rounded-xl font-display font-bold transition-all ${
                      triedAI === false 
                        ? 'bg-aibo-red-500 text-white shadow-md scale-105' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    No, I'm new to it.
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !name.trim()) ||
              (step === 2 && !grade) ||
              (step === 3 && !subject) ||
              (step === 4 && triedAI === null)
            }
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-black text-white px-5 py-4 font-black shadow-lg disabled:opacity-50 disabled:active:scale-100 active:scale-[0.99] transition-all"
          >
            {step === 4 ? "Let's Start!" : "Continue"}
            {step < 4 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all ${step >= i ? 'bg-aibo-blue-500 w-4' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
