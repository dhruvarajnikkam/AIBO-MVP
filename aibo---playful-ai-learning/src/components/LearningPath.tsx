import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, Lock, Filter, X, Gift, Trophy, Sparkles } from 'lucide-react';
import { Module, Lesson } from '../lib/content';
import { soundManager } from '../lib/sounds';

interface LearningPathProps {
  modules: Module[];
  onLessonSelect: (lessonId: string) => void;
  completedLessons: string[];
  currentLessonId?: string;
  charging: number;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function LearningPath({ modules, onLessonSelect, completedLessons, currentLessonId, charging }: LearningPathProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; moduleIdx: number; lessonIdx: number } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const filteredModules = useMemo(() => {
    if (selectedDifficulty === 'All') return modules;
    
    return modules
      .map(module => ({
        ...module,
        lessons: module.lessons.filter(lesson => lesson.difficulty === selectedDifficulty)
      }))
      .filter(module => module.lessons.length > 0 || module.difficulty === selectedDifficulty);
  }, [modules, selectedDifficulty]);

  // Create a flat list of all lessons to determine global locking
  const allLessons = useMemo(() => {
    return modules.flatMap(m => m.lessons);
  }, [modules]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActiveLesson(null);
      }
    };

    if (activeLesson) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeLesson]);

  return (
    <div className="flex flex-col items-center gap-6 py-4 pb-4 overflow-y-auto scrollbar-hide h-full relative">
      {/* Practice Card */}
      {charging < 50 && (
        <div className="w-full max-w-md px-4">
          <button 
            onClick={() => onLessonSelect('practice')}
            className="w-full bg-duo-green text-white p-4 rounded-3xl shadow-[0_4px_0_#58A700] flex items-center gap-4 hover:brightness-105 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-black text-lg leading-tight">Recharge Battery</h3>
              <p className="text-xs font-medium opacity-90">Practice to gain 20% charge!</p>
            </div>
          </button>
        </div>
      )}

      {/* Difficulty Selector */}
      <div className="w-full max-w-md px-4 mb-2">
        <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-2 flex gap-1 items-center">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <motion.button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                soundManager.play('click');
                setActiveLesson(null);
              }}
              animate={{ 
                scale: selectedDifficulty === diff ? 1.05 : 1,
                zIndex: selectedDifficulty === diff ? 10 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex-1 py-2 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-200 ${
                selectedDifficulty === diff
                  ? 'bg-white text-aibo-blue-500 shadow-md border-2 border-aibo-blue-200 ring-4 ring-aibo-blue-500/5'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {diff}
            </motion.button>
          ))}
        </div>
      </div>

      {filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Filter className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-display font-bold">No lessons found for this level</p>
        </div>
      ) : (
        filteredModules.map((module, mIdx) => {
          // A module is locked if its first lesson is locked
          const firstLesson = module.lessons[0];
          const globalIdx = allLessons.findIndex(al => al.id === firstLesson?.id);
          const isModuleLocked = globalIdx > 0 && !completedLessons.includes(allLessons[globalIdx - 1].id);

          return (
            <div key={module.id} className={`w-full max-w-md px-4 transition-opacity duration-500 ${isModuleLocked ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}>
              {/* Module Header */}
              <div className={`${isModuleLocked ? 'bg-gray-400' : 'bg-aibo-blue-500'} text-white p-6 rounded-3xl mb-8 shadow-lg relative overflow-hidden transition-colors duration-500`}>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-display font-black uppercase tracking-widest opacity-80">
                      Module {mIdx + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isModuleLocked && <Lock size={12} className="text-white/80" />}
                      <span className="text-[10px] font-black uppercase tracking-tighter bg-white/20 px-2 py-0.5 rounded-full">
                        {module.difficulty}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-display font-black leading-tight">
                    {module.title}
                  </h2>
                </div>
                {/* Decorative background element */}
                {!isModuleLocked && <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />}
              </div>

              {/* Lessons Zigzag */}
            <div className="flex flex-col items-center gap-8">
              {module.lessons.map((lesson, lIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                
                // Find global index of this lesson
                const globalIdx = allLessons.findIndex(al => al.id === lesson.id);
                
                // A lesson is locked if it's not completed AND it's not the first lesson AND the previous global lesson is not completed
                const isLocked = !isCompleted && globalIdx > 0 && !completedLessons.includes(allLessons[globalIdx - 1].id);
                
                const isCurrent = lesson.id === currentLessonId;
                const isActive = activeLesson?.lesson.id === lesson.id;

                return (
                  <div key={lesson.id} className="relative flex items-center w-full" style={{ paddingLeft: lIdx % 2 === 0 ? '20%' : '0', paddingRight: lIdx % 2 !== 0 ? '20%' : '0', justifyContent: lIdx % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                    <div className="relative">
                      <div className={`flex items-center gap-4 ${lIdx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <motion.button
                          whileHover={!isLocked ? { scale: 1.1 } : {}}
                          whileTap={!isLocked ? { scale: 0.95 } : {}}
                          onClick={() => {
                            if (!isLocked) {
                              setActiveLesson({ lesson, moduleIdx: mIdx, lessonIdx: lIdx });
                              soundManager.play('click');
                            }
                          }}
                          className={`relative w-20 h-20 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isCompleted 
                              ? lesson.isChallenge ? 'bg-yellow-500 shadow-[0_6px_0_#CA8A04]' : 'bg-aibo-blue-500 shadow-[0_6px_0_#0077B6]' 
                              : isLocked 
                                ? 'bg-gray-200 shadow-[0_6px_0_#D1D5DB]' 
                                : lesson.isBonus 
                                  ? 'bg-purple-100 border-4 border-purple-500 shadow-[0_6px_0_#7E22CE]'
                                  : lesson.isChest
                                    ? 'bg-yellow-100 border-4 border-yellow-500 shadow-[0_6px_0_#CA8A04]'
                                    : 'bg-white border-4 border-aibo-blue-500 shadow-[0_6px_0_#0077B6]'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-10 h-10 text-white stroke-[4px]" />
                          ) : isLocked ? (
                            <Lock className="w-8 h-8 text-gray-400" />
                          ) : lesson.isChest ? (
                            <div className="relative w-12 h-12">
                              {/* Chest Base */}
                              <div className="absolute bottom-1 left-1 right-1 h-6 bg-yellow-700 rounded-b-md border-2 border-yellow-900 shadow-inner" />
                              {/* Chest Lid */}
                              <div className="absolute top-1 left-0 right-0 h-6 bg-yellow-600 rounded-t-xl border-2 border-yellow-900 flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-900" />
                              </div>
                              {/* Straps */}
                              <div className="absolute top-1 bottom-1 left-3 w-1.5 bg-yellow-900/30" />
                              <div className="absolute top-1 bottom-1 right-3 w-1.5 bg-yellow-900/30" />
                              
                              {isCurrent && (
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl -z-10"
                                />
                              )}
                            </div>
                          ) : lesson.isChallenge ? (
                            <Trophy className="w-10 h-10 text-yellow-600" />
                          ) : lesson.isBonus ? (
                            <Sparkles className="w-10 h-10 text-purple-600" />
                          ) : (
                            <Star className={`w-10 h-10 ${isCurrent ? 'text-aibo-blue-500 fill-aibo-blue-500' : 'text-aibo-blue-500'}`} />
                          )}

                          {/* Current Lesson Indicator */}
                          {isCurrent && !isLocked && !isActive && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-200 px-4 py-2 rounded-xl shadow-md whitespace-nowrap animate-bounce">
                              <span className="font-display font-black text-aibo-blue-500 uppercase text-xs">Start</span>
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-gray-200 rotate-45" />
                            </div>
                          )}

                          {/* Difficulty Badge for Lesson */}
                          {selectedDifficulty === 'All' && (
                            <div className="absolute -bottom-2 -right-2 bg-gray-100 text-gray-500 text-[8px] font-black px-1.5 py-0.5 rounded-md border border-gray-200">
                              {lesson.difficulty[0]}
                            </div>
                          )}
                        </motion.button>

                        <div className={`flex flex-col ${lIdx % 2 === 0 ? 'text-left' : 'text-right'} max-w-[180px]`}>
                          <h4 className={`font-display font-black text-sm uppercase tracking-tight ${isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
                            {lesson.title}
                          </h4>
                          <p className={`text-[10px] font-medium leading-tight mt-1 ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
                            {lesson.description}
                          </p>
                        </div>
                      </div>

                      {/* Lesson Popup */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            ref={popupRef}
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            className="absolute z-[50] top-full mt-6 left-1/2 -translate-x-1/2 w-64 bg-aibo-blue-500 rounded-3xl p-6 shadow-2xl"
                          >
                            <div className="relative">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLesson(null);
                                }}
                                className="absolute -top-2 -right-2 p-1 text-white/50 hover:text-white transition-colors"
                              >
                                <X size={16} />
                              </button>
                              
                              <h3 className="text-white font-display font-black text-xl mb-1 leading-tight">
                                {lesson.isChest ? 'Bonus Treasure!' : lesson.isChallenge ? 'Module Challenge!' : lesson.isBonus ? 'Bonus Lesson!' : lesson.title}
                              </h3>
                              <p className="text-white/80 font-display font-bold text-sm mb-6">
                                {lesson.isChest 
                                  ? 'Open for a quick bonus round!' 
                                  : lesson.isChallenge
                                    ? 'Master the module for extra XP!'
                                    : lesson.isBonus
                                      ? 'Explore creative AI concepts!'
                                      : `Lesson ${lIdx + 1} of ${module.lessons.length}`}
                              </p>
                              
                              <button
                                onClick={() => {
                                  onLessonSelect(lesson.id);
                                  setActiveLesson(null);
                                }}
                                className="w-full bg-white text-aibo-blue-500 py-3 rounded-2xl font-display font-black text-lg uppercase tracking-wider shadow-[0_4px_0_#E2E8F0] hover:translate-y-0.5 hover:shadow-[0_2px_0_#E2E8F0] active:translate-y-1 active:shadow-none transition-all"
                              >
                                {lesson.isChest ? 'Open Chest +50 XP' : lesson.isChallenge ? 'Start Challenge +60 XP' : lesson.isBonus ? 'Start Bonus +40 XP' : 'Start +20 XP'}
                              </button>
                            </div>
                            {/* Arrow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-aibo-blue-500 rotate-45" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          );
        })
      )}
    </div>
  );
}
