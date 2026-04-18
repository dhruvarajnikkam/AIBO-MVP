import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, Lock, Filter, X, Gift, Trophy, Sparkles, Zap, Award, Bookmark } from 'lucide-react';
import ChestIcon from './ui/ChestIcon';
import { Module, Lesson } from '../lib/content';
import { soundManager } from '../lib/sounds';

interface LearningPathProps {
  modules: Module[];
  onLessonSelect: (lessonId: string) => void;
  completedLessons: string[];
  bookmarkedLessons: string[];
  onToggleBookmark: (lessonId: string) => void;
  currentLessonId?: string;
  charging: number;
}

type FilterType = 'All' | 'Easy' | 'Medium' | 'Hard' | 'Bookmarks';

export default function LearningPath({ 
  modules, 
  onLessonSelect, 
  completedLessons, 
  bookmarkedLessons,
  onToggleBookmark,
  currentLessonId, 
  charging 
}: LearningPathProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterType>('All');
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; moduleIdx: number; lessonIdx: number } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const filteredModules = useMemo(() => {
    if (selectedDifficulty === 'All') return modules;
    
    return modules
      .map(module => ({
        ...module,
        lessons: module.lessons.filter(lesson => 
          selectedDifficulty === 'Bookmarks' 
            ? bookmarkedLessons.includes(lesson.id)
            : lesson.difficulty === selectedDifficulty
        )
      }))
      .filter(module => module.lessons.length > 0);
  }, [modules, selectedDifficulty, bookmarkedLessons]);

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
    <div className="flex flex-col items-center gap-6 pb-20 overflow-y-auto scrollbar-hide h-full relative">
      {/* Sticky Header with Filter */}
      <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex flex-col gap-3">
        {/* Practice Card (Compact when scrolled?) */}
        {charging < 50 && (
          <motion.div 
            initial={{ height: 'auto', opacity: 1 }}
            className="w-full max-w-md mx-auto"
          >
            <button 
              onClick={() => onLessonSelect('practice')}
              className="w-full bg-duo-green text-white p-3 rounded-2xl shadow-[0_4px_0_#58A700] flex items-center gap-3 hover:brightness-105 transition-all text-sm"
            >
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-display font-black leading-tight">Recharge Battery</h3>
                <p className="text-[10px] font-medium opacity-90 italic">Practice to gain 20% charge!</p>
              </div>
            </button>
          </motion.div>
        )}

        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-3 bg-gray-50/50 p-1 rounded-2xl border border-gray-100">
            <div className="pl-3 py-2 text-gray-400">
              <Filter size={14} className="opacity-50" />
            </div>
            {(['All', 'Easy', 'Medium', 'Hard', 'Bookmarks'] as const).map((diff) => {
              const bgColors = {
                All: 'bg-aibo-blue-500 text-white',
                Easy: 'bg-duo-green text-white',
                Medium: 'bg-yellow-500 text-white',
                Hard: 'bg-red-500 text-white',
                Bookmarks: 'bg-pink-500 text-white'
              };
              
              const isActive = selectedDifficulty === diff;

              return (
                <motion.button
                  key={diff}
                  onClick={() => {
                    setSelectedDifficulty(diff);
                    soundManager.play('click');
                    setActiveLesson(null);
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-1.5 rounded-xl font-display font-black text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 ${
                    isActive
                      ? `${bgColors[diff]} shadow-lg shadow-black/10`
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {diff === 'Bookmarks' && <Bookmark size={10} className={isActive ? 'fill-current' : ''} />}
                  {diff}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredModules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="relative mb-6">
            <Filter className="w-16 h-16 opacity-10" />
            <X className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-300" />
          </div>
          <p className="font-display font-black text-lg text-gray-500">
            {selectedDifficulty === 'Bookmarks' ? "No bookmarked lessons yet" : `No ${selectedDifficulty.toLowerCase()} lessons here`}
          </p>
          <p className="text-xs font-medium mt-1">
            {selectedDifficulty === 'Bookmarks' ? "Bookmark lessons to find them later" : "Try switching back to 'All'"}
          </p>
          <button 
            onClick={() => setSelectedDifficulty('All')}
            className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        filteredModules.map((module, mIdx) => {
          // A module is locked if its first lesson is locked
          const firstLesson = module.lessons[0];
          const globalIdx = allLessons.findIndex(al => al.id === firstLesson?.id);
          const isModuleLocked = globalIdx > 0 && !completedLessons.includes(allLessons[globalIdx - 1].id);

          return (
            <div key={module.id} className={`w-full max-w-md px-4 transition-all duration-500 ${isModuleLocked ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
              {/* Module Header */}
              <div className={`${isModuleLocked ? 'bg-slate-300 border-slate-400' : 'bg-aibo-blue-500 border-aibo-blue-700'} text-white p-6 rounded-[2rem] mb-12 shadow-lg relative overflow-hidden transition-all duration-500 border-b-4`}>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xs font-display font-black uppercase tracking-[0.2em] ${isModuleLocked ? 'text-slate-500' : 'text-white/80'}`}>
                      Section {mIdx + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isModuleLocked ? (
                        <div className="bg-slate-500/10 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-slate-500/10">
                          <Lock size={10} className="text-slate-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Locked</span>
                        </div>
                      ) : (
                        <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                          <Award size={10} className="text-white" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {module.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className={`text-2xl font-display font-black leading-tight ${isModuleLocked ? 'text-slate-500' : 'text-white'}`}>
                    {module.title}
                  </h2>
                </div>
                {/* Decorative background element */}
                {!isModuleLocked && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -right-4 -bottom-4 w-32 h-32 bg-white rounded-full blur-2xl" 
                  />
                )}
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
                          className={`relative w-20 h-20 flex items-center justify-center shrink-0 transition-all duration-300 ${
                            lesson.isChest
                              ? isLocked
                                ? 'bg-slate-200 rounded-2xl shadow-[0_6px_0_#94a3b8] grayscale cursor-not-allowed'
                                : 'bg-white rounded-2xl shadow-[0_6px_0_#e2e8f0]'
                              : isCompleted 
                                ? lesson.isChallenge ? 'bg-yellow-500 rounded-full shadow-[0_6px_0_#CA8A04]' : 'bg-aibo-blue-500 rounded-full shadow-[0_6px_0_#0077B6]' 
                                : isLocked 
                                  ? 'bg-slate-200 rounded-full shadow-[0_6px_0_#94a3b8] grayscale cursor-not-allowed' 
                                  : lesson.isBonus 
                                    ? 'bg-purple-100 rounded-full border-4 border-purple-500 shadow-[0_6px_0_#7E22CE]'
                                    : 'bg-white rounded-full border-4 border-aibo-blue-500 shadow-[0_6px_0_#0077B6]'
                          }`}
                        >
                          {/* Bookmark Indicator */}
                          {bookmarkedLessons.includes(lesson.id) && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 z-20 w-8 h-8 bg-pink-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg"
                            >
                              <Bookmark size={14} className="text-white fill-current" />
                            </motion.div>
                          )}

                          {lesson.isChest ? (
                            <ChestIcon 
                              isLocked={isLocked}
                              isCurrent={isCurrent}
                              isOpen={isCompleted}
                              className="w-14 h-14"
                            />
                          ) : isCompleted ? (
                            <Check className="w-10 h-10 text-white stroke-[4px]" />
                          ) : isLocked ? (
                            <Lock className="w-8 h-8 text-gray-400" />
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
                            <div className={`flex items-center gap-1 mt-1 ${lIdx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                              <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${isLocked ? 'bg-gray-100' : 'bg-pink-100 shadow-sm border border-pink-200'}`}>
                                <Star size={10} className={`${isLocked ? 'text-gray-300' : 'text-pink-500 fill-pink-500'}`} />
                                <span className={`text-[10px] font-black leading-none ${isLocked ? 'text-gray-300' : 'text-pink-600'}`}>
                                  +{lesson.xpReward} XP
                                </span>
                              </div>
                            </div>
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
                              <p className="text-white/80 font-display font-bold text-xs mb-4">
                                {lesson.isChest 
                                  ? 'Open for a quick bonus round!' 
                                  : lesson.isChallenge
                                    ? 'Master the module for extra XP!'
                                    : lesson.isBonus
                                      ? 'Explore creative AI concepts!'
                                      : `Lesson ${lIdx + 1} of ${module.lessons.length}`}
                              </p>

                              {/* Difficulty & XP Labels */}
                              <div className="flex gap-2 mb-6">
                                <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                                  <Award size={12} className="text-white" />
                                  <span className="text-white font-display font-black text-[10px] uppercase tracking-wider">{lesson.difficulty}</span>
                                </div>
                                <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                                  <Star size={12} className="text-white fill-white" />
                                  <span className="text-white font-display font-black text-[10px] uppercase tracking-wider">
                                    +{lesson.xpReward} XP
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleBookmark(lesson.id);
                                  }}
                                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm border transition-all ${
                                    bookmarkedLessons.includes(lesson.id)
                                      ? 'bg-pink-500 text-white border-pink-400'
                                      : 'bg-white/20 text-white/70 border-white/10 hover:bg-white/30'
                                  }`}
                                >
                                  <Bookmark size={12} className={bookmarkedLessons.includes(lesson.id) ? 'fill-current' : ''} />
                                  <span className="font-display font-black text-[10px] uppercase tracking-wider">
                                    {bookmarkedLessons.includes(lesson.id) ? 'Saved' : 'Save'}
                                  </span>
                                </button>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ 
                                  boxShadow: ["0px 4px 0px #E2E8F0", "0px 8px 16px rgba(255,255,255,0.5)", "0px 4px 0px #E2E8F0"],
                                  scale: [1, 1.02, 1]
                                }}
                                transition={{ 
                                  boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                                }}
                                onClick={() => {
                                  onLessonSelect(lesson.id);
                                  setActiveLesson(null);
                                }}
                                className="w-full bg-white text-aibo-blue-500 py-4 rounded-2xl font-display font-black text-xl uppercase tracking-wider shadow-[0_4px_0_#E2E8F0] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                              >
                                <span className="relative z-10">{lesson.isChest ? 'Open' : 'Start'}</span>
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                  className="relative z-10"
                                >
                                  <Star size={20} className="fill-aibo-blue-500 text-aibo-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-r from-aibo-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                              </motion.button>
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
