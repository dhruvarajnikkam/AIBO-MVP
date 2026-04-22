import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Award, Home, BarChart2, User as UserIcon, CheckCircle2, Target } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
import Header from './components/Header';
import LearningPath from './components/LearningPath';
import LessonSession from './components/LessonSession';
import Leaderboard from './components/Leaderboard';
import ErrorBoundary from './components/ErrorBoundary';
import ChestIcon from './components/ui/ChestIcon';
import QuestsView from './components/QuestsView';
import Onboarding from './components/Onboarding';
import { AI_CURRICULUM, Lesson, PRACTICE_LESSON } from './lib/content';
import { MATH_CURRICULUM } from './lib/mathContent';
import { SCIENCE_CURRICULUM } from './lib/scienceContent';
import { UserPerformance } from './lib/sessionGenerator';
import { soundManager } from './lib/sounds';

const MAX_CHARGING = 100;
const CHARGING_REGEN_TIME = 60 * 60 * 1000; // 1 hour for 10 units
const CHARGING_PER_REGEN = 10;
const LESSON_COST = 25;
const STREAK_BONUS = 2;
const MIN_STREAK_FOR_BONUS = 3;

interface Badge {
  id: string;
  name: string;
  requirement: string;
  icon: any;
  color: string;
}

const BADGES: Badge[] = [
  { id: 'b1', name: 'AI Explorer', requirement: 'Complete all Grade 6 lessons', icon: Star, color: 'text-aibo-blue-500' },
  { id: 'b2', name: 'Algorithm Ace', requirement: 'Sort 10 sequences correctly', icon: Award, color: 'text-aibo-red-500' },
  { id: 'b3', name: 'Data Detective', requirement: 'Complete all 4 data unit lessons', icon: BarChart2, color: 'text-aibo-blue-400' },
  { id: 'b4', name: 'Ethics Champion', requirement: 'Complete all Scenario Quests', icon: CheckCircle2, color: 'text-duo-green' },
  { id: 'b5', name: 'AI Master', requirement: 'Complete the Final Assessment', icon: Trophy, color: 'text-yellow-500' }
];

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => localStorage.getItem('onboarding_complete') === 'true');
  const [onboardingData, setOnboardingData] = useState(() => JSON.parse(localStorage.getItem('onboarding_data') || '{}'));
  const [view, setView] = useState<'home' | 'leaderboard' | 'quests' | 'profile'>('home');
  const [activeCurriculumId, setActiveCurriculumId] = useState<'ai' | 'math' | 'science'>('ai');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [charging, setCharging] = useState(100);
  const [lastChargingRefill, setLastChargingRefill] = useState<number>(Date.now());
  const [accuracy, setAccuracy] = useState(1.0); // Default to 100%
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastXpEarned, setLastXpEarned] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [bestAnswerStreak, setBestAnswerStreak] = useState(0);
  const [dailyChestClaimed, setDailyChestClaimed] = useState(false);
  const [chargingAnimation, setChargingAnimation] = useState<{ text: string; id: number } | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthUser(data.session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    soundManager.play('click');

    if (!isSupabaseConfigured) {
      alert('Authentication is currently offline. Please try playing as a guest!');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Google sign-in failed', error);
      alert('Unable to connect to login services at this moment. Please try again later.');
    }
  };

  const handleGuestSignIn = () => {
    soundManager.play('click');
    setAuthUser({
      id: 'guest-user',
      app_metadata: {},
      user_metadata: { name: 'Guest Explorer' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User);
  };

  // Charging Regeneration Logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (charging < MAX_CHARGING) {
        const now = Date.now();
        const timePassed = now - lastChargingRefill;
        
        if (timePassed >= CHARGING_REGEN_TIME) {
          const unitsToAdd = Math.floor(timePassed / CHARGING_REGEN_TIME) * CHARGING_PER_REGEN;
          setCharging(prev => Math.min(MAX_CHARGING, prev + unitsToAdd));
          setLastChargingRefill(now - (timePassed % CHARGING_REGEN_TIME));
        }
      } else {
        setLastChargingRefill(Date.now());
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [charging, lastChargingRefill]);

  const userPerformance: UserPerformance = useMemo(() => ({
    accuracy,
    averageTimePerChallenge: 15,
    streak,
    completedLessonIds: completedLessons
  }), [accuracy, streak, completedLessons]);

  const nextChargingIn = charging < MAX_CHARGING 
    ? Math.max(0, CHARGING_REGEN_TIME - (Date.now() - lastChargingRefill))
    : null;

  const handleToggleBookmark = (lessonId: string) => {
    setBookmarkedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
    soundManager.play('click');
  };

  const currentCurriculum = useMemo(() => {
    if (activeCurriculumId === 'math') return MATH_CURRICULUM;
    if (activeCurriculumId === 'science') return SCIENCE_CURRICULUM;
    return AI_CURRICULUM;
  }, [activeCurriculumId]);

  const handleLessonSelect = (lessonId: string) => {
    if (!authUser) {
      alert('Please sign in first.');
      return;
    }
    soundManager.play('click');
    if (lessonId === 'practice') {
      setActiveLesson(PRACTICE_LESSON);
      return;
    }

    if (charging < LESSON_COST) {
      alert("Your battery is low! Practice to recharge or wait for it to refill.");
      return;
    }

    for (const module of currentCurriculum) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setCharging(prev => Math.max(0, prev - LESSON_COST));
        setActiveLesson(lesson);
        break;
      }
    }
  };

  const handleRestoreCharging = (amount: number, streakCount: number) => {
    setCharging(prev => Math.min(MAX_CHARGING, prev + amount));
    setChargingAnimation({ 
      text: `${streakCount} in a Row! +${amount}% Charge`, 
      id: Date.now() 
    });
    setTimeout(() => setChargingAnimation(null), 3000);
  };

  const handleDeductCharging = (amount: number) => {
    setCharging(prev => Math.max(0, prev - amount));
  };

  const handleLessonComplete = (earnedXp: number, sessionAccuracy: number, finalStreak: number) => {
    if (activeLesson) {
      const isPractice = activeLesson.id === 'practice';
      
      if (isPractice) {
        setCharging(prev => Math.min(MAX_CHARGING, prev + 20));
        setXp(prev => prev + earnedXp);
        setLastXpEarned(earnedXp);
        setActiveLesson(null);
        setShowCelebration(true);
        soundManager.play('complete');
        return;
      }

      // Regular lesson - Cost already deducted at start
      
      const newCompleted = [...new Set([...completedLessons, activeLesson.id])];
      setCompletedLessons(newCompleted);
      setXp(prev => prev + earnedXp);
      setLastXpEarned(earnedXp);
      setStreak(prev => prev + 1);
      setAccuracy(prev => (prev + sessionAccuracy) / 2); // Simple moving average
      setBestAnswerStreak(prev => Math.max(prev, finalStreak));
      setActiveLesson(null);
      setShowCelebration(true);
      soundManager.play('complete');

      // Check for badges
      if (newCompleted.length >= 3 && !earnedBadges.includes('b1')) {
        setEarnedBadges(prev => [...prev, 'b1']);
      }
      if (newCompleted.includes('l_quiz') && !earnedBadges.includes('b5')) {
        setEarnedBadges(prev => [...prev, 'b5']);
      }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <motion.div 
            key="home-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            {/* Curriculum Tabs */}
            <div className="px-4 py-4 bg-white/80 backdrop-blur-md z-[100] border-b border-gray-100 flex justify-center sticky top-0 shadow-sm">
              <div className="flex gap-2 p-1.5 bg-gray-100 rounded-[1.25rem] overflow-x-auto scrollbar-hide shrink-0 ring-1 ring-gray-900/5">
                {(['ai', 'math', 'science'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setActiveCurriculumId(curr)}
                    className={`px-5 py-2.5 rounded-xl font-display font-extrabold uppercase tracking-wide text-[11px] transition-all duration-300 whitespace-nowrap ${
                      activeCurriculumId === curr 
                        ? 'bg-white text-aibo-blue-500 shadow-md transform scale-105' 
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
                    }`}
                  >
                    {curr === 'ai' ? 'AI Magic' : curr === 'math' ? 'Math Quest' : 'Science Pro'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <LearningPath 
                modules={currentCurriculum} 
                onLessonSelect={handleLessonSelect}
                completedLessons={completedLessons}
                bookmarkedLessons={bookmarkedLessons}
                onToggleBookmark={handleToggleBookmark}
                currentLessonId={currentCurriculum[0].lessons.find(l => !completedLessons.includes(l.id))?.id}
                charging={charging}
              />
            </div>
          </motion.div>
        );
      case 'leaderboard':
        return (
          <motion.div 
            key="leaderboard-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full"
          >
            <Leaderboard currentUserXp={xp} />
          </motion.div>
        );
      case 'quests':
        return (
          <QuestsView 
            xp={xp}
            streak={streak}
            completedCount={completedLessons.length}
            accuracy={accuracy}
            bestAnswerStreak={bestAnswerStreak}
            dailyChestClaimed={dailyChestClaimed}
            onClaimXp={(amount) => {
              setXp(prev => prev + amount);
              setDailyChestClaimed(true);
              soundManager.play('complete');
            }}
          />
        );
      case 'profile':
        return (
          <motion.div 
            key="profile-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pt-8 px-6 pb-24 space-y-8 max-w-md mx-auto overflow-y-auto scrollbar-hide"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 bg-aibo-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <UserIcon className="w-12 h-12 text-aibo-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-gray-700">{onboardingData.name || 'AI Explorer'}</h2>
                <p className="text-gray-400 font-medium">Joined April 2026</p>
                {onboardingData.grade && <p className="text-sm font-bold text-aibo-blue-500 mt-1">{onboardingData.grade} Grade • Loves {onboardingData.subject || 'Learning'}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-3d p-4 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total XP</p>
                <p className="text-2xl font-display font-black text-aibo-blue-500">{xp}</p>
              </div>
              <div className="card-3d p-4 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Streak</p>
                <p className="text-2xl font-display font-black text-aibo-red-500">{streak} Days</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-display font-black text-gray-700">Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                {BADGES.map((badge) => {
                  const isEarned = earnedBadges.includes(badge.id);
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className={`card-3d p-4 flex flex-col items-center text-center gap-2 ${!isEarned ? 'opacity-40 grayscale' : ''}`}>
                      <Icon className={`w-8 h-8 ${badge.color}`} />
                      <p className="font-display font-black text-xs">{badge.name}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{badge.requirement}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      default:
        return <div className="pt-24 text-center text-gray-400 font-display font-bold">Coming Soon!</div>;
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full max-w-[430px] h-[100dvh] bg-white overflow-hidden flex flex-col mx-auto shadow-sm">
        {!authUser && !authLoading && (
          <div className="absolute inset-0 z-[700] bg-gradient-to-br from-aibo-blue-50 via-white to-aibo-red-50 flex items-center justify-center p-6">
            <div className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur border border-white shadow-2xl p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>
              <div className="space-y-4 relative z-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-xl overflow-hidden border-4 border-white bg-white"
                >
                  <img src="/M1.jpeg" alt="Welcome Mascot" className="w-full h-full object-cover" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-display font-black text-gray-700">Sign in to continue</h1>
                  <p className="text-sm text-gray-500 font-medium">Use Google to save your progress directly and compete with friends.</p>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-black text-white px-5 py-4 font-black shadow-lg active:scale-[0.99] transition-transform"
              >
                <LogIn className="w-5 h-5" />
                Sign in with Google
              </button>

              <button
                onClick={handleGuestSignIn}
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gray-100 text-gray-700 px-5 py-4 font-black shadow-md mt-4 active:scale-[0.99] transition-transform"
              >
                <UserIcon className="w-5 h-5" />
                Play as Guest
              </button>
            </div>
          </div>
        )}

        {authUser && !isOnboardingComplete && (
          <Onboarding 
            onComplete={(data) => {
              setIsOnboardingComplete(true);
              setOnboardingData(data);
              localStorage.setItem('onboarding_complete', 'true');
              localStorage.setItem('onboarding_data', JSON.stringify(data));
            }}
          />
        )}

        <Header xp={xp} streak={streak} charging={charging} nextChargingIn={nextChargingIn} />

        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </main>

        {/* Lesson Session Overlay */}
        <AnimatePresence>
          {activeLesson && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[400]"
            >
              <LessonSession 
                lesson={activeLesson}
                performance={userPerformance}
                userId={authUser?.id}
                onClose={() => setActiveLesson(null)}
                onComplete={handleLessonComplete}
                onStreakRestore={handleRestoreCharging}
                onWrongAnswer={handleDeductCharging}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Charging Restoration Animation */}
        <AnimatePresence>
          {chargingAnimation && (
            <motion.div
              key={chargingAnimation.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -100, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-32 z-[600] pointer-events-none"
            >
              <div className="bg-pink-500 text-white px-6 py-3 rounded-full font-display font-black shadow-xl border-4 border-white flex items-center gap-2 whitespace-nowrap">
                <Star className="w-5 h-5 fill-current" />
                {chargingAnimation.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Modal */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[500] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 max-w-[320px] w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Mascot M3 for Completion/Celebration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none transition-transform scale-110 translate-x-2 -translate-y-2 mix-blend-multiply">
                  <img src="/M3.jpeg" alt="Great Job!" className="w-full h-full object-contain" />
                </div>

                <div className="space-y-2 relative z-10">
                  <h2 className="text-2xl font-display font-black text-aibo-blue-500 leading-tight">Lesson Complete!</h2>
                  <p className="text-sm text-gray-500 font-medium">You're becoming an AI expert!</p>
                </div>

                <div className="bg-aibo-blue-50 rounded-2xl p-4 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-aibo-blue-400 uppercase tracking-wider">XP Earned</p>
                    <p className="text-xl font-display font-black text-aibo-blue-600">+{lastXpEarned}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-aibo-red-400 uppercase tracking-wider">Streak</p>
                    <p className="text-xl font-display font-black text-aibo-red-500">{streak} Days</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowCelebration(false);
                    soundManager.play('click');
                  }}
                  className="btn-3d btn-3d-blue w-full py-3 text-lg uppercase tracking-wider"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <nav className="relative h-20 bg-white border-t-2 border-gray-100 flex items-center justify-around px-4 z-50">
          <button 
            onClick={() => {
              setView('home');
              soundManager.play('click');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${view === 'home' ? 'text-aibo-blue-500' : 'text-gray-400'}`}
          >
            <div className={`w-12 h-10 rounded-xl flex items-center justify-center transition-colors ${view === 'home' ? 'bg-aibo-blue-50' : ''}`}>
              <Home className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button 
            onClick={() => {
              setView('leaderboard');
              soundManager.play('click');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${view === 'leaderboard' ? 'text-aibo-blue-500' : 'text-gray-400'}`}
          >
            <div className={`w-12 h-10 rounded-xl flex items-center justify-center transition-colors ${view === 'leaderboard' ? 'bg-aibo-blue-50' : ''}`}>
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">Leaderboard</span>
          </button>
          <button 
            onClick={() => {
              setView('quests');
              soundManager.play('click');
            }}
            className={`flex flex-col items-center gap-1 transition-colors relative ${view === 'quests' ? 'text-aibo-blue-500' : 'text-gray-400'}`}
          >
            <div className={`w-12 h-10 rounded-xl flex items-center justify-center transition-colors ${view === 'quests' ? 'bg-aibo-blue-50' : ''}`}>
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">Quests</span>
            
            {/* Notification Badge */}
            {!dailyChestClaimed && view !== 'quests' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-1 w-2.5 h-2.5 bg-pink-500 border-2 border-white rounded-full shadow-sm"
              />
            )}
          </button>
          <button 
            onClick={() => {
              setView('profile');
              soundManager.play('click');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${view === 'profile' ? 'text-aibo-blue-500' : 'text-gray-400'}`}
          >
            <div className={`w-12 h-10 rounded-xl flex items-center justify-center transition-colors ${view === 'profile' ? 'bg-aibo-blue-50' : ''}`}>
              <UserIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </nav>
      </div>
    </ErrorBoundary>
  );
}
