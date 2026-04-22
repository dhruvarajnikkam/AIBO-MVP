import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Play, ArrowRight } from 'lucide-react';
import { soundManager } from '../../lib/sounds';

interface Condition {
  name: string;
  accuracy: number;
  results: boolean[];
}

interface ReflectionQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface BeforeAfterExperimentProps {
  conditionA: Condition;
  conditionB: Condition;
  reflectionQuestions: ReflectionQuestion[];
  onSelect: (answer: string) => void;
  isChecked: boolean;
}

export default function BeforeAfterExperiment({
  conditionA,
  conditionB,
  reflectionQuestions,
  onSelect,
  isChecked
}: BeforeAfterExperimentProps) {
  const [activeExperiment, setActiveExperiment] = useState<'none' | 'A' | 'B'>('none');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedReflection, setSelectedReflection] = useState<string | null>(null);

  const runExperiment = (type: 'A' | 'B') => {
    if (running) return;
    soundManager.play('click');
    setActiveExperiment(type);
    setRunning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleReflectionSelect = (option: string) => {
    if (isChecked) return;
    setSelectedReflection(option);
    onSelect(option);
    soundManager.play('click');
  };

  const currentQuestion = reflectionQuestions[currentQuestionIndex];

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Condition A */}
        <motion.div 
          className={`p-6 rounded-2xl border-2 transition-colors ${
            activeExperiment === 'A' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">{conditionA.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Target Accuracy: {conditionA.accuracy}%</span>
            <button
              onClick={() => runExperiment('A')}
              disabled={running}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              <Play size={20} fill="currentColor" />
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {conditionA.results.map((res, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-colors duration-500 ${
                  activeExperiment === 'A' && progress > (i / conditionA.results.length) * 100
                    ? res ? 'bg-green-500' : 'bg-red-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Condition B */}
        <motion.div 
          className={`p-6 rounded-2xl border-2 transition-colors ${
            activeExperiment === 'B' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">{conditionB.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Target Accuracy: {conditionB.accuracy}%</span>
            <button
              onClick={() => runExperiment('B')}
              disabled={running}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
            >
              <Play size={20} fill="currentColor" />
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {conditionB.results.map((res, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-colors duration-500 ${
                  activeExperiment === 'B' && progress > (i / conditionB.results.length) * 100
                    ? res ? 'bg-green-500' : 'bg-red-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reflection Section */}
      <AnimatePresence>
        {!running && activeExperiment !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-4">Reflection</h4>
            <p className="text-gray-700 mb-6">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleReflectionSelect(option)}
                  disabled={isChecked}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedReflection === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
