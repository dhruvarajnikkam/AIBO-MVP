import { Challenge, ChallengeType, Lesson } from './content';

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

/**
 * Adaptive Session Generator
 * Adjusts the exercise mix based on user performance.
 */
export function generateAdaptiveSession(
  lesson: Lesson,
  performance: UserPerformance
): Challenge[] {
  // 1. Determine target difficulty based on accuracy
  let target: 'easy' | 'medium' | 'hard' = 'medium';
  
  if (performance.accuracy < 0.6) {
    target = 'easy';
  } else if (performance.accuracy > 0.85) {
    target = 'hard';
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
  const sessionLength = performance.accuracy < 0.5 ? Math.min(4, sortedChallenges.length) : sortedChallenges.length;
  
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

  return sessionChallenges.slice(0, sessionLength);
}
