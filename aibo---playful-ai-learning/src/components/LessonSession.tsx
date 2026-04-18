import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Lesson, Challenge } from '../lib/content';
import SpotTheAI from './exercises/SpotTheAI';
import AnalogyCard from './exercises/AnalogyCard';
import DragAndDrop from './exercises/DragAndDrop';
import FillInBlank from './exercises/FillInBlank';
import MatchPairs from './exercises/MatchPairs';
import SortSequence from './exercises/SortSequence';
import BuildAConcept from './exercises/BuildAConcept';
import ScenarioQuest from './exercises/ScenarioQuest';
import RapidFire from './exercises/RapidFire';
import BeforeAfterExperiment from './exercises/BeforeAfterExperiment';
import MysteryConcept from './exercises/MysteryConcept';
import StepDebugger from './exercises/StepDebugger';
import ArgumentBuilder from './exercises/ArgumentBuilder';
import LinkBuilder from './exercises/LinkBuilder';
import { generateAdaptiveSession, UserPerformance } from '../lib/sessionGenerator';
import { soundManager } from '../lib/sounds';

// Memoize exercise components to prevent re-renders when parent state (progress, etc) changes
const MemoizedDragAndDrop = memo(DragAndDrop);
const MemoizedBuildAConcept = memo(BuildAConcept);
const MemoizedSortSequence = memo(SortSequence);
const MemoizedMatchPairs = memo(MatchPairs);

interface LessonSessionProps {
  lesson: Lesson;
  performance: UserPerformance;
  onClose: () => void;
  onComplete: (xpEarned: number, accuracy: number, finalStreak: number) => void;
  onStreakRestore?: (amount: number, streak: number) => void;

  userId?: string;  onWrongAnswer?: (amount: number) => void;
}

export default function LessonSession({ lesson, performance, onClose, onComplete, onStreakRestore, onWrongAnswer, userId }: LessonSessionProps) {
  const [adaptiveChallenges, setAdaptiveChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateAdaptiveSession(lesson, performance, userId).then(challenges => {
      setAdaptiveChallenges(challenges);
      setIsLoading(false);
    });
  }, [lesson, performance, userId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [maxSessionStreak, setMaxSessionStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

// MOVED LOADING CHECK

  const currentChallenge = adaptiveChallenges[currentIndex];

  useEffect(() => {
    setProgress((currentIndex / adaptiveChallenges.length) * 100);
    // Robustly reset state when challenge changes to prevent cross-exercise state leakage
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
    setShowExplanation(false);
  }, [currentIndex, adaptiveChallenges.length]);

  const handleCheck = useCallback(() => {
    if (isChecked || !currentChallenge) return;
    
    let correct = false;

    switch (currentChallenge.type) {
      case 'drag_and_drop':
        const assignments = selectedOption as { [itemId: string]: string } || {};
        const items = currentChallenge.items || [];
        correct = items.every(item => assignments[item.id] === item.correct_bucket);
        break;
      case 'fill_in_blank':
        correct = selectedOption === currentChallenge.correctAnswer;
        break;
      case 'spot_the_ai':
        const aiIds = currentChallenge.items?.filter(i => i.has_ai).map(i => i.id) || [];
        const selectedIds = selectedOption as string[] || [];
        correct = aiIds.length === selectedIds.length && aiIds.every(id => selectedIds.includes(id));
        break;
      case 'scenario_quest':
        correct = selectedOption?.is_best || false;
        break;
      case 'match_pairs':
        correct = selectedOption === true;
        break;
      case 'sort_sequence':
        const order = selectedOption as string[] || [];
        correct = order.length === currentChallenge.correctOrder?.length && 
                  order.every((id, idx) => id === currentChallenge.correctOrder?.[idx]);
        break;
      case 'build_concept':
        const selectedChips = selectedOption as string[] || [];
        correct = selectedChips.length === currentChallenge.chipsCorrect?.length &&
                  selectedChips.every((chip, idx) => chip === currentChallenge.chipsCorrect?.[idx]);
        break;
      case 'rapid_fire':
        correct = (selectedOption as number) >= (currentChallenge.questions?.length || 0) / 2;
        break;
      case 'analogy_card':
        correct = selectedOption === currentChallenge.correctAnswer;
        break;
      case 'before_after_exp':
        correct = selectedOption === currentChallenge.experiment?.reflectionQuestions[0].correctAnswer;
        break;
      case 'mystery_concept':
        correct = selectedOption?.toLowerCase().trim() === currentChallenge.mystery?.concept.toLowerCase().trim();
        break;
      case 'step_debugger':
        correct = selectedOption === true;
        break;
      case 'argument_builder':
        const argAssignments = selectedOption as { [key: number]: 'for' | 'against' } || {};
        const argCards = currentChallenge.argument?.cards || [];
        correct = Object.keys(argAssignments).length === argCards.length && 
                  Object.entries(argAssignments).every(([idx, side]) => argCards[parseInt(idx)].side === side);
        break;
      case 'link_builder':
        const linkIndices = selectedOption as number[] || [];
        const linkPool = currentChallenge.linkBuilder?.pool || [];
        correct = linkPool.every((item, idx) => item.belongs === linkIndices.includes(idx));
        break;
      default:
        correct = selectedOption === currentChallenge.correctAnswer;
    }

    setIsCorrect(correct);
    setIsChecked(true);
    
    if (correct) {
      const nextStreak = sessionStreak + 1;
      setXpEarned(prev => prev + (currentChallenge.xpValue || 10));
      setCorrectCount(prev => prev + 1);
      setSessionStreak(nextStreak);
      setMaxSessionStreak(m => Math.max(m, nextStreak));
      
      // Restore charging every 3 correct answers in a row
      if (nextStreak > 0 && nextStreak % 3 === 0 && onStreakRestore) {
        onStreakRestore(5, nextStreak);
      }
      
      soundManager.play('correct');
    } else {
      setSessionStreak(0);
      if (onWrongAnswer) onWrongAnswer(5);
      soundManager.play('incorrect');
    }
  }, [isChecked, currentChallenge, selectedOption, sessionStreak, onStreakRestore, onWrongAnswer]);

  const handleSelect = useCallback((option: any) => {
    if (isChecked) return;
    setSelectedOption(option);
    soundManager.play('click');
  }, [isChecked]);

  const handleContinue = useCallback(() => {
    if (!isChecked) return;
    
    soundManager.play('click');
    if (currentIndex < adaptiveChallenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalAccuracy = correctCount / adaptiveChallenges.length;
      // Bonus XP for perfect accuracy
      const accuracyBonus = finalAccuracy === 1 ? 5 : 0;
      onComplete(lesson.xpReward + accuracyBonus, finalAccuracy, maxSessionStreak);
    }
  }, [isChecked, currentIndex, adaptiveChallenges.length, correctCount, onComplete, xpEarned, maxSessionStreak]);

  if (isLoading || adaptiveChallenges.length === 0) {
    return <div className="h-full bg-white flex items-center justify-center font-display font-bold text-gray-400">Loading lesson...</div>;
  }
  const renderExercise = () => {
    switch (currentChallenge.type) {
      case 'spot_the_ai':
        return (
          <SpotTheAI 
            items={currentChallenge.items || []}
            onSelect={handleSelect} 
            isChecked={isChecked}
          />
        );
      case 'analogy_card':
        return (
          <AnalogyCard 
            analogy={currentChallenge.analogy!}
            correctAnswer={currentChallenge.correctAnswer as string}
            onSelect={handleSelect}
            selectedOption={selectedOption}
            isChecked={isChecked}
            isCorrect={isCorrect}
          />
        );
      case 'drag_and_drop':
        return (
          <MemoizedDragAndDrop 
            buckets={currentChallenge.buckets || []}
            items={currentChallenge.items as any || []}
            isChecked={isChecked}
            onSelect={handleSelect}
          />
        );
      case 'fill_in_blank':
        return (
          <FillInBlank 
            sentence={currentChallenge.question}
            options={currentChallenge.options || []}
            correctAnswer={currentChallenge.correctAnswer as string}
            onSelect={handleSelect}
            selectedOption={selectedOption}
            isChecked={isChecked}
            isCorrect={isCorrect}
          />
        );
      case 'match_pairs':
        return (
          <MemoizedMatchPairs 
            pairs={currentChallenge.pairs || []}
            isChecked={isChecked}
            onSelect={handleSelect}
          />
        );
      case 'sort_sequence':
        return (
          <MemoizedSortSequence 
            steps={currentChallenge.steps || []}
            correctOrder={currentChallenge.correctOrder || []}
            isChecked={isChecked}
            onSelect={handleSelect}
          />
        );
      case 'build_concept':
        return (
          <MemoizedBuildAConcept 
            targetSentence={currentChallenge.targetSentence || ''}
            chipsCorrect={currentChallenge.chipsCorrect || []}
            chipsDistractor={currentChallenge.chipsDistractor || []}
            isChecked={isChecked}
            onSelect={handleSelect}
          />
        );
      case 'scenario_quest':
        return (
          <ScenarioQuest 
            scenario={currentChallenge.scenario || ''}
            studentRole={currentChallenge.studentRole || ''}
            decisionPrompt={currentChallenge.decisionPrompt || ''}
            options={currentChallenge.scenarioOptions || []}
            onSelect={handleSelect}
            selectedOption={selectedOption}
            isChecked={isChecked}
          />
        );
      case 'rapid_fire':
        return (
          <RapidFire 
            questions={currentChallenge.questions || []}
            onComplete={handleSelect}
            isChecked={isChecked}
          />
        );
      case 'before_after_exp':
        return (
          <BeforeAfterExperiment 
            conditionA={currentChallenge.experiment!.conditionA}
            conditionB={currentChallenge.experiment!.conditionB}
            reflectionQuestions={currentChallenge.experiment!.reflectionQuestions}
            onSelect={handleSelect}
            isChecked={isChecked}
          />
        );
      case 'mystery_concept':
        return (
          <MysteryConcept 
            concept={currentChallenge.mystery!.concept}
            clues={currentChallenge.mystery!.clues}
            hotKeywords={currentChallenge.mystery!.hotKeywords}
            warmKeywords={currentChallenge.mystery!.warmKeywords}
            onSelect={handleSelect}
            isChecked={isChecked}
          />
        );
      case 'step_debugger':
        return (
          <StepDebugger 
            processName={currentChallenge.question}
            steps={currentChallenge.steps as any || []}
            onSelect={handleSelect}
            isChecked={isChecked}
          />
        );
      case 'argument_builder':
        return (
          <ArgumentBuilder 
            statement={currentChallenge.argument!.statement}
            cards={currentChallenge.argument!.cards}
            onSelect={handleSelect}
            isChecked={isChecked}
          />
        );
      case 'link_builder':
        return (
          <LinkBuilder 
            centralConcept={currentChallenge.linkBuilder!.centralConcept}
            pool={currentChallenge.linkBuilder!.pool}
            onSelect={handleSelect}
            isChecked={isChecked}
          />
        );
      default:
        return <div>Exercise type {currentChallenge.type} not implemented yet.</div>;
    }
  };

  return (
    <div className="absolute inset-0 z-[400] bg-white flex flex-col">
      {/* Explanation Overlay */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 z-[500] bg-white flex flex-col p-6 overflow-y-auto scrollbar-hide"
          >
            <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
              <div className="flex-1 space-y-8 pt-12">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${isCorrect ? 'bg-duo-green text-white' : 'bg-aibo-red-500 text-white'}`}>
                    {isCorrect ? <CheckCircle2 size={40} /> : <AlertCircle size={40} />}
                  </div>
                  <div>
                    <h2 className={`text-3xl font-display font-black ${isCorrect ? 'text-duo-green' : 'text-aibo-red-500'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Explanation</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100">
                  <p className="text-xl font-medium text-gray-700 leading-relaxed italic">
                    "{currentChallenge.explanation}"
                  </p>
                </div>

                {!isCorrect && currentChallenge.correctAnswer && (
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Correct Answer</p>
                    <div className="bg-duo-green/10 border-2 border-duo-green/20 rounded-2xl p-4">
                      <p className="text-duo-green font-black text-lg">
                        {typeof currentChallenge.correctAnswer === 'object' 
                          ? Array.isArray(currentChallenge.correctAnswer)
                            ? currentChallenge.correctAnswer.join(', ')
                            : JSON.stringify(currentChallenge.correctAnswer)
                          : String(currentChallenge.correctAnswer)
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setShowExplanation(false);
                  soundManager.play('click');
                }}
                className="btn-3d btn-3d-blue w-full py-4 text-xl uppercase tracking-wider mt-8"
              >
                Got it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="flex items-center gap-4 px-4 py-6">
        <button 
          onClick={() => {
            onClose();
            soundManager.play('click');
          }} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-aibo-blue-500 rounded-full"
          />
        </div>
        <span className="text-xs font-display font-black text-aibo-blue-400 min-w-[3rem] text-right">
          {currentIndex + 1} / {adaptiveChallenges.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-display font-black text-gray-800 leading-tight">
                {currentChallenge.question}
              </h2>
            </div>

            {renderExercise()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Feedback */}
      <div className={`p-6 border-t-2 transition-colors duration-300 ${
        !isChecked ? 'bg-white border-gray-100' : isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {isChecked && (
            <div className="flex items-start gap-4">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-duo-green" />
              ) : (
                <AlertCircle className="w-8 h-8 text-aibo-red-500" />
              )}
              <div>
                <h4 className={`font-display font-black text-xl ${isCorrect ? 'text-duo-green' : 'text-aibo-red-500'}`}>
                  {isCorrect ? 'Amazing Job!' : 'Not quite right'}
                </h4>
                <button 
                  onClick={() => {
                    setShowExplanation(true);
                    soundManager.play('click');
                  }}
                  className={`text-sm font-black uppercase tracking-widest underline underline-offset-4 mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
                >
                  Explain my answer
                </button>
              </div>
            </div>
          )}

          <button
            onClick={isChecked ? handleContinue : handleCheck}
            disabled={!selectedOption && currentChallenge.type !== 'spot_the_ai'}
            className={`btn-3d w-full py-4 text-xl uppercase tracking-wider ${
              !selectedOption && currentChallenge.type !== 'spot_the_ai'
                ? 'bg-slate-200 text-slate-400 shadow-[0_4px_0_#CBD5E1]' 
                : isChecked 
                  ? isCorrect 
                    ? 'btn-3d-green' 
                    : 'btn-3d-red'
                  : 'btn-3d-blue'
            }`}
          >
            {isChecked ? 'Continue' : 'Check'}
          </button>
        </div>
      </div>
    </div>
  );
}
