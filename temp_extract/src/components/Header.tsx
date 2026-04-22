import { Battery, Zap, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  xp: number;
  streak: number;
  charging: number;
  nextChargingIn: number | null;
}

export default function Header({ xp, streak, charging, nextChargingIn }: HeaderProps) {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBatteryColor = () => {
    if (charging < 20) return 'bg-aibo-red-500';
    if (charging > 85) return 'bg-gradient-to-r from-pink-500 to-purple-500';
    return 'bg-pink-500';
  };

  const getTextColor = () => {
    if (charging < 20) return 'text-aibo-red-500';
    if (charging > 85) return 'text-purple-600';
    return 'text-pink-500';
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-[200] flex items-center justify-between px-4 py-3 bg-white border-b-2 border-gray-100">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <Zap className="w-5 h-5 text-aibo-blue-500 fill-aibo-blue-500" />
          <span className="font-display font-extrabold text-aibo-blue-500">{xp}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <Trophy className="w-5 h-5 text-aibo-red-500 fill-aibo-red-500" />
          <span className="font-display font-extrabold text-aibo-red-500">{streak}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group relative">
        <motion.div 
          animate={charging < 20 ? {
            borderColor: ['#D1D5DB', '#EF4444', '#D1D5DB'],
            scale: [1, 1.02, 1],
          } : {
            borderColor: '#D1D5DB',
            scale: 1,
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-10 h-5 border-2 border-gray-300 rounded-md p-0.5 flex items-center bg-gray-50 overflow-hidden"
        >
          <motion.div 
            initial={false}
            animate={{ 
              width: `${Math.max(4, charging)}%`,
              opacity: charging < 20 ? [1, 0.5, 1] : (charging > 90 ? [1, 0.7, 1] : 1)
            }}
            transition={{ 
              width: { duration: 1, ease: "easeOut" },
              opacity: { duration: charging < 20 ? 0.8 : 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`h-full rounded-[1px] relative ${getBatteryColor()}`} 
          >
            {charging > 85 && (
              <motion.div 
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            )}
          </motion.div>
          <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-2.5 bg-gray-300 rounded-r-sm" />
        </motion.div>
        <motion.span 
          animate={charging < 20 ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className={`font-display font-black text-xs min-w-[32px] transition-colors duration-500 ${getTextColor()}`}
        >
          {charging}%
        </motion.span>
        
        {nextChargingIn !== null && (
          <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Recharging: {formatTime(nextChargingIn)}
          </div>
        )}
      </div>
    </header>
  );
}
