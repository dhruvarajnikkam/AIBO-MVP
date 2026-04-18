import { motion } from 'motion/react';

interface ChestIconProps {
  className?: string;
  isLocked?: boolean;
  isCurrent?: boolean;
  isOpen?: boolean;
}

export default function ChestIcon({ className = "w-12 h-12", isLocked = false, isCurrent = false, isOpen = false }: ChestIconProps) {
  return (
    <div className={`relative ${className} perspective-[1000px]`}>
      {/* Platform/Base Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-black/10 rounded-full blur-[2px]" />

      <motion.div
        animate={isCurrent && !isOpen ? {
          rotate: [-1, 1, -1],
          y: [0, -4, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full relative"
      >
        {/* Chest Base (Bottom Half) */}
        <div className={`absolute bottom-0 left-0 right-0 h-[60%] rounded-b-lg border-[3px] border-amber-950 z-10 transition-colors duration-500
          ${isLocked ? 'bg-slate-300 border-slate-500' : 'bg-gradient-to-b from-amber-600 to-amber-800'}`}>
          {/* Base Decor - Vertical Straps */}
          <div className={`absolute top-0 bottom-0 left-[15%] w-[12%] ${isLocked ? 'bg-slate-400' : 'bg-amber-400 border-x border-amber-950/20'}`} />
          <div className={`absolute top-0 bottom-0 right-[15%] w-[12%] ${isLocked ? 'bg-slate-400' : 'bg-amber-400 border-x border-amber-950/20'}`} />
          
          {/* Inner Shadow if open */}
          {isOpen && (
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/40 rounded-t-sm shadow-inner" />
          )}
        </div>

        {/* Chest Lid (Top Half) */}
        <motion.div 
          initial={false}
          animate={{ 
            rotateX: isOpen ? -110 : 0,
            y: isOpen ? -8 : 0,
            originY: "bottom"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className={`absolute bottom-[60%] left-0 right-0 h-[45%] rounded-t-2xl border-[3px] border-amber-950 z-20 origin-bottom transition-colors duration-500
            ${isLocked ? 'bg-slate-400 border-slate-500' : 'bg-gradient-to-b from-amber-400 to-amber-600'}`}
        >
          {/* Lid Decor - Vertical Straps */}
          <div className={`absolute top-0 bottom-0 left-[15%] w-[12%] ${isLocked ? 'bg-slate-500' : 'bg-amber-300 border-x border-amber-950/20'}`} />
          <div className={`absolute top-0 bottom-0 right-[15%] w-[12%] ${isLocked ? 'bg-slate-500' : 'bg-amber-300 border-x border-amber-950/20'}`} />
          
          {/* Lid Decor - Horizontal Strap at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-[20%] ${isLocked ? 'bg-slate-500' : 'bg-amber-500 border-t border-amber-950/20'}`} />

          {/* Keyhole/Handle */}
          <div className={`absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[25%] h-[40%] rounded-md border-2 border-amber-950 flex items-center justify-center z-30 shadow-md transition-colors
            ${isLocked ? 'bg-slate-300' : 'bg-amber-400'}`}>
            <div className={`w-[20%] h-[50%] rounded-full ${isLocked ? 'bg-slate-500' : 'bg-amber-900'}`} />
          </div>
        </motion.div>

        {/* Inside Reward Glow if open */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full blur-xl mix-blend-screen -z-0"
          />
        )}
      </motion.div>
    </div>
  );
}
