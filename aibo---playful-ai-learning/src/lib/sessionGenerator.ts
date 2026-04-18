import { Challenge, ChallengeType, Lesson } from './content';
import { isSupabaseConfigured, supabase } from './supabase';

export interface UserPerformance {
  accuracy: number; // 0 to 1
  averageTimePerChallenge: number; // in seconds
  streak: number;
  completedLessonIds: string[];
}

export interface SessionConfig {
  maxChallenges: number;
  targetDifficulty: 'easy' | 'medium' | 'hard';
}

export interface ProfileStats {
  userId?: string;
  accuracy: number;
  streak: number;
  hearts: number;
}

const TYPE_DIFFICULTY: Record<ChallengeType, 'easy' | 'medium' | 'hard'> = {
  tap_right_answer: 'easy',
  fill_in_blank: 'easy',
  spot_the_ai: 'easy',
  analogy_card: 'medium',
  drag_and_drop: 'medium',
  match_pairs: 'medium',
  sort_sequence: 'medium',
  build_concept: 'medium',
  before_after_exp: 'medium',
  mystery_concept: 'medium',
  step_debugger: 'medium',
  link_builder: 'medium',
  scenario_quest: 'hard',
  rapid_fire: 'hard',
  argument_builder: 'hard',
};

export async function loadProfileStats(
  userId: string | undefined,
  fallback: Pick<ProfileStats, 'accuracy' | 'streak'>,
  fallbackHearts = 5
): Promise<ProfileStats> {
  if (!isSupabaseConfigured) {
    return {
      userId,
      accuracy: fallback.accuracy,
      streak: fallback.streak,
      hearts: fallbackHearts,
    };
  }

  if (!userId) {
    return {
      userId: undefined,
      accuracy: fallback.accuracy,
      streak: fallback.streak,
      hearts: fallbackHearts,
    };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('accuracy, streak, hearts')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      return {
        userId,
        accuracy: Number(data.accuracy ?? fallback.accuracy),
        streak: Number(data.streak ?? fallback.streak),
        hearts: Number(data.hearts ?? fallbackHearts),
      };
    }

    return {
      userId,
      accuracy: fallback.accuracy,
      streak: fallback.streak,
      hearts: fallbackHearts,
    };
  } catch (err) {
    console.error('Failed to load profile stats', err);
    return {
      userId,
      accuracy: fallback.accuracy,
      streak: fallback.streak,
      hearts: fallbackHearts,
    };
  }
}

export async function saveProfileStats(stats: ProfileStats) {
  if (!isSupabaseConfigured) return;

  if (!stats.userId) {
    console.warn('Skipping profile save because no user id was provided');
    return;
  }

  try {
    const { error } = await supabase.from('profiles').upsert(
      {
        id: stats.userId,
        accuracy: stats.accuracy,
        streak: stats.streak,
        hearts: stats.hearts,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.error('Failed to save profile stats', error);
    }
  } catch (err) {
    console.error('Failed to save profile stats', err);
  }
}

/**
 * Adaptive Session Generator
 * Adjusts the exercise mix based on user performance.
 */
export async function generateAdaptiveSession(
  lesson: Lesson,
  performance: UserPerformance,
  userId?: string
): Promise<Challenge[]> {
  try {
    const profile = await loadProfileStats(
      userId,
      { accuracy: performance.accuracy, streak: performance.streak }
    );

    const accuracy = profile.accuracy;
    const streak = profile.streak;

    // 1. Determine target difficulty based on profile performance
    let target: 'easy' | 'medium' | 'hard' = 'medium';

    if (accuracy < 0.6 || streak < 2) {
      target = 'easy'; // Reinforcement Mode
    } else if (accuracy > 0.85 && streak >= 5) {
      target = 'hard'; // Challenge Mode
    }

    // 2. Filter and sort challenges
    // We want to prioritize challenges that match the target difficulty
    // but still keep some variety.

    const shuffled = [...lesson.challenges].sort(() => Math.random() - 0.5);

    const sortedChallenges = shuffled.sort((a, b) => {
      const diffA = TYPE_DIFFICULTY[a.type];
      const diffB = TYPE_DIFFICULTY[b.type];

      if (diffA === target && diffB !== target) return -1;
      if (diffA !== target && diffB === target) return 1;
      return 0;
    });

    // 3. Ensure variety: at least two different challenge types
    const sessionChallenges: Challenge[] = [];
    const isReinforcement = accuracy < 0.6 || streak < 2;
    const isChallenge = accuracy > 0.85 && streak >= 5;

    let maxChallenges = sortedChallenges.length;
    if (isReinforcement) {
      maxChallenges = Math.min(4, sortedChallenges.length);
    }

    if (sortedChallenges.length > 0) {
      // Always take the first one (best match for target)
      sessionChallenges.push(sortedChallenges[0]);

      // Look for a second one with a different type
      let secondChallengeIndex = -1;
      for (let i = 1; i < sortedChallenges.length; i++) {
        if (sortedChallenges[i].type !== sessionChallenges[0].type) {
          secondChallengeIndex = i;
          break;
        }
      }

      if (secondChallengeIndex !== -1) {
        // Add the second unique type
        sessionChallenges.push(sortedChallenges[secondChallengeIndex]);

        // Fill the rest of the session, avoiding duplicates of the first two if possible
        const remaining = sortedChallenges.filter((_, idx) => idx !== 0 && idx !== secondChallengeIndex);
        sessionChallenges.push(...remaining);
      } else {
        // If all challenges are the same type, just return sorted
        sessionChallenges.push(...sortedChallenges.slice(1));
      }
    }

    const finalChallenges = sessionChallenges.slice(0, maxChallenges);

    // If Challenge Mode, append a rapid_fire exercise if one exists in the lesson,
    // making sure not to duplicate it if it's already included.
    if (isChallenge) {
      const hasRapidFire = finalChallenges.some(c => c.type === 'rapid_fire');
      if (!hasRapidFire) {
        const rapidFireChallenge = lesson.challenges.find(c => c.type === 'rapid_fire');
        if (rapidFireChallenge) {
          finalChallenges.push(rapidFireChallenge);
        }
      }
    }

    return finalChallenges;
  } catch (err) {
    console.error('Failed to generate adaptive session', err);
    return lesson.challenges;
}

}

