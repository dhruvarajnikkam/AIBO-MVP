import { motion } from 'motion/react';
import { Target, CheckCircle2, Star, Zap, Trophy, Flame, MousePointer2 } from 'lucide-react';
import ChestIcon from './ui/ChestIcon';
import { soundManager } from '../lib/sounds';

interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  icon: any;
  color: string;
}

interface QuestsViewProps {
  xp: number;
  streak: number;
  completedCount: number;
  accuracy: number;
  bestAnswerStreak: number;
  dailyChestClaimed: boolean;
  onClaimXp: (amount: number) => void;
}

export default function QuestsView({ 
  xp, 
  streak, 
  completedCount, 
  accuracy, 
  bestAnswerStreak,
  dailyChestClaimed,
  onClaimXp 
}: QuestsViewProps) {
  const quests: Quest[] = [
    {
      id: 'q1',
      title: 'AI Novice',
      description: 'Complete 3 lessons',
      target: 3,
      current: completedCount,
      rewardXp: 50,
      icon: Target,
      color: 'bg-aibo-blue-500'
    },
    {
      id: 'q2',
      title: 'XP Enthusiast',
      description: 'Earn 250 XP total',
      target: 250,
      current: xp,
      rewardXp: 100,
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      id: 'q3',
      title: 'Consistency King',
      description: 'Maintain a 3-day streak',
      target: 3,
      current: streak,
      rewardXp: 75,
      icon: Flame,
      color: 'bg-aibo-red-500'
    },
    {
      id: 'q4',
      title: 'Sharp Mind',
      description: 'Keep accuracy above 90%',
      target: 90,
      current: Math.round(accuracy * 100),
      rewardXp: 60,
      icon: Zap,
      color: 'bg-duo-green'
    },
    {
      id: 'q5',
      title: 'Focus Master',
      description: 'Get a 10-answer streak',
      target: 10,
      current: bestAnswerStreak,
      rewardXp: 80,
      icon: MousePointer2,
      color: 'bg-purple-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="pt-8 px-6 pb-24 space-y-8 max-w-md mx-auto h-full overflow-y-auto scrollbar-hide"
    >
      {/* Daily Reward Section */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl border-b-4 border-amber-900 group cursor-pointer"
      >
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <ChestIcon isCurrent={true} className="w-24 h-24 mb-2 drop-shadow-2xl" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-display font-black leading-tight">Daily Chest</h2>
            <p className="text-amber-100/80 text-sm font-medium">
              {dailyChestClaimed ? "You've claimed your bonus today!" : "Claim your daily learning bonus!"}
            </p>
          </div>
          <button 
            disabled={dailyChestClaimed}
            onClick={() => {
              if (!dailyChestClaimed) {
                onClaimXp(50);
                soundManager.play('complete');
              }
            }}
            className={`px-8 py-3 rounded-2xl font-display font-black text-lg uppercase tracking-wider transition-all w-full select-none ${
              dailyChestClaimed 
                ? 'bg-amber-800/50 text-amber-500 cursor-not-allowed border-2 border-amber-900/50' 
                : 'bg-white text-amber-700 shadow-[0_4px_0_#d1d5db] active:translate-y-1 active:shadow-none'
            }`}
          >
            {dailyChestClaimed ? 'Claimed' : 'Claim 50 XP'}
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -z-0 pointer-events-none animate-pulse" />
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Trophy size={80} />
        </div>
      </motion.div>

      <div className="text-left space-y-1">
        <h3 className="text-xl font-display font-black text-gray-700">Missions</h3>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Real-time Progress</p>
      </div>

      <div className="space-y-4">
        {quests.map((quest, idx) => {
          const isCompleted = quest.current >= quest.target;
          const progress = Math.min(100, (quest.current / quest.target) * 100);
          const Icon = quest.icon;

          return (
            <motion.div 
              layout
              key={quest.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isCompleted ? [1, 1.02, 1] : 1,
                boxShadow: isCompleted ? '0 20px 25px -5px rgba(34, 197, 94, 0.15)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
              transition={{ 
                delay: idx * 0.1,
                scale: { duration: 0.4, ease: "easeOut" }
              }}
              className={`relative overflow-hidden card-3d p-6 flex flex-col gap-4 transition-all duration-500 ${
                isCompleted ? 'bg-white border-duo-green/40' : 'bg-white border-slate-100'
              }`}
            >
              {isCompleted && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 + idx * 0.1 }}
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden"
                >
                  <div className="absolute top-[-10px] right-[-30px] w-[80px] h-[30px] bg-duo-green rotate-45 flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    isCompleted ? 'bg-duo-green text-white' : `${quest.color} text-white`
                  }`}>
                    <Icon size={28} className={isCompleted ? 'animate-bounce' : ''} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-lg text-gray-700 leading-tight">{quest.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{quest.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Star size={14} className="text-aibo-blue-500 fill-aibo-blue-500" />
                    <p className="text-lg font-display font-black text-aibo-blue-500">+{quest.rewardXp}</p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">Reward</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className={`text-xs font-black tracking-tight ${isCompleted ? 'text-duo-green' : 'text-slate-400'}`}>
                    {quest.current} / {quest.target}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] font-black text-duo-green uppercase tracking-[0.1em] animate-pulse">
                      Completed
                    </span>
                  )}
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full border border-slate-200 overflow-hidden shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className={`h-full rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] ${
                      isCompleted ? 'bg-duo-green' : quest.color
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
