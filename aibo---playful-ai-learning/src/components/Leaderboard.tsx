import { motion } from 'motion/react';
import { Trophy, Medal, Crown, Star, Flame, Hexagon, Shield, Feather, Zap } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
  avatarBadge?: any;
}

interface LeaderboardProps {
  currentUserXp: number;
}

const OTHER_USERS: Omit<LeaderboardEntry, 'rank'>[] = [
  { id: '1', name: 'Daniel', xp: 30000, avatarBadge: Trophy },
  { id: '2', name: 'Consciência G', xp: 11003, avatarBadge: Star },
  { id: '3', name: 'Yessica Lovera', xp: 7425, avatarBadge: Zap },
  { id: '4', name: 'Germanlearner', xp: 3342, avatarBadge: Shield },
  { id: '5', name: 'Tiago Queiroz', xp: 2676, avatarBadge: Shield },
  { id: '6', name: 'Noêmia F Mesquita', xp: 2621, avatarBadge: Star },
  { id: '7', name: 'Aroni', xp: 2088 },
  { id: '9', name: 'Rafael E. Rivas A.', xp: 1950, avatarBadge: Shield },
  { id: '10', name: 'CloudSurfer', xp: 1800 },
  { id: '11', name: 'PromptPro', xp: 1500 },
];

const LEAGUE_BADGES = [
  { color: 'text-red-500', fill: 'fill-red-500' },
  { color: 'text-lime-500', fill: 'fill-lime-500' },
  { color: 'text-purple-500', fill: 'fill-purple-500' },
  { color: 'text-pink-400', fill: 'fill-pink-400' },
  { color: 'text-slate-600', fill: 'fill-slate-600' },
];

export default function Leaderboard({ currentUserXp }: LeaderboardProps) {
  const leaderboardData = [
    ...OTHER_USERS,
    { id: 'me', name: 'AI Explorer', xp: currentUserXp, isCurrentUser: true }
  ]
  .sort((a, b) => b.xp - a.xp)
  .map((user, index) => ({
    ...user,
    rank: index + 1
  }));

  return (
    <div className="flex flex-col h-full bg-[#131f24] text-white">
      {/* League Header Section */}
      <div className="pt-6 pb-6 px-4 bg-[#131f24] border-b border-gray-800">
        {/* League Nav */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex gap-2.5">
            {LEAGUE_BADGES.map((badge, i) => (
              <Hexagon key={i} size={32} className={`${badge.color} ${badge.fill}`} />
            ))}
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center p-2 shadow-[0_0_20px_rgba(165,243,252,0.3)]">
              <div className="w-full h-full bg-cyan-200 rounded-xl flex items-center justify-center border-2 border-cyan-400/30">
                <Feather className="text-cyan-600 w-8 h-8 -rotate-45" />
              </div>
            </div>
            {/* Active Indicator Shield shape simulated with container */}
            <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-2xl pointer-events-none" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-display font-black tracking-wide">Diamond League</h2>
          <p className="text-yellow-400 text-sm font-black uppercase tracking-widest">1 Day Remaining</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="divide-y divide-gray-800/50">
          {leaderboardData.map((entry, idx) => {
            const isTop3 = entry.rank <= 3;
            const BadgeIcon = entry.avatarBadge;

            return (
              <motion.div
                layout
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                  entry.isCurrentUser ? 'bg-cyan-900/20' : 'hover:bg-white/5'
                }`}
              >
                {/* Rank indicator */}
                <div className="w-8 flex justify-center">
                  {entry.rank === 1 ? (
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="absolute inset-0 bg-yellow-500 rounded-lg rotate-45" />
                      <span className="relative font-black text-black z-10 text-xs">1</span>
                    </div>
                  ) : entry.rank === 2 ? (
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="absolute inset-0 bg-slate-300 rounded-lg rotate-45" />
                      <span className="relative font-black text-slate-800 z-10 text-xs">2</span>
                    </div>
                  ) : entry.rank === 3 ? (
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <div className="absolute inset-0 bg-amber-600 rounded-lg rotate-45" />
                      <span className="relative font-black text-amber-950 z-10 text-xs">3</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 font-display font-black text-sm">{entry.rank}</span>
                  )}
                </div>
                
                {/* Avatar with Badge */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-inner ${entry.isCurrentUser ? 'border-cyan-400' : 'border-gray-800'}`}>
                    <img 
                      src={`https://picsum.photos/seed/${entry.id}/100/100`} 
                      alt={entry.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {BadgeIcon && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-[#131f24] flex items-center justify-center shadow-lg">
                      <BadgeIcon size={12} className="text-cyan-500 fill-cyan-500" />
                    </div>
                  )}
                </div>

                {/* Name & Subtitle */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-display font-black text-sm truncate ${entry.isCurrentUser ? 'text-cyan-300' : 'text-white'}`}>
                    {entry.name}
                    {entry.isCurrentUser && <span className="ml-2 text-[8px] bg-cyan-500 text-white px-1.5 py-0.5 rounded-full uppercase">You</span>}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Flame size={10} className="text-orange-500 fill-orange-500" />
                    <span className="text-[10px] font-bold text-gray-400">Learning for 1yr+</span>
                  </div>
                </div>

                {/* XP Earned */}
                <div className="text-right shrink-0">
                  <span className="font-display font-black text-sm text-gray-300 uppercase letter-spacing-tight">
                    {entry.xp} EXP
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
