import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bug, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface Step {
  id: string;
  text: string;
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
}

interface StepDebuggerProps {
  processName: string;
  steps: Step[];
  onSelect: (completed: boolean) => void;
  isChecked: boolean;
}

export default function StepDebugger({
  processName,
  steps,
  onSelect,
  isChecked
}: StepDebuggerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (showFeedback || isChecked) return;
    setSelectedOption(index);
    const correct = index === steps[currentStepIndex].correct_option;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      soundManager.play('correct');
      if (currentStepIndex === steps.length - 1) {
        onSelect(true);
      }
    } else {
      soundManager.play('incorrect');
    }
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
      soundManager.play('click');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Bug size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{processName}</h3>
          <p className="text-sm text-gray-500">Step {currentStepIndex + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              i < currentStepIndex ? 'bg-indigo-500' :
              i === currentStepIndex ? 'bg-indigo-200 overflow-hidden' :
              'bg-gray-100'
            }`}
          >
            {i === currentStepIndex && (
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: showFeedback && isCorrect ? '100%' : '0%' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-gray-50 border-b-2 border-gray-200">
          <p className="text-lg font-medium text-gray-800">{steps[currentStepIndex].text}</p>
        </div>

        <div className="p-6 space-y-6">
          <h4 className="text-xl font-bold text-gray-900">{steps[currentStepIndex].question}</h4>
          
          <div className="space-y-3">
            {steps[currentStepIndex].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(i)}
                disabled={showFeedback || isChecked}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                  selectedOption === i
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <span className="font-medium">{option}</span>
                {selectedOption === i && (
                  isCorrect ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                <p className="text-sm font-medium">{steps[currentStepIndex].explanation}</p>
                {isCorrect && currentStepIndex < steps.length - 1 && (
                  <button
                    onClick={nextStep}
                    className="mt-4 flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
