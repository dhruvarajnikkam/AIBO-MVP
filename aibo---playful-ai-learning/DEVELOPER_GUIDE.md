# AIbo Developer Implementation Guide

This guide outlines the core algorithms and systems powering the AIbo learning platform.

## 1. Adaptive Session Generator (Algorithm)

The Session Generator is responsible for dynamically tailoring the lesson experience to each student's current proficiency level.

### Logic Flow:
1.  **Performance Analysis**: The system analyzes the `accuracy` and `streak` from the student's last 3 sessions.
2.  **Difficulty Mapping**:
    *   **Low Accuracy (<60%)**: Triggers "Reinforcement Mode". Prioritizes `easy` exercise types (MCQ, True/False) and reduces session length to 4 challenges.
    *   **High Accuracy (>85%)**: Triggers "Challenge Mode". Prioritizes `hard` exercise types (Scenario Quests, Slider Judgment) and adds a `rapid_fire` bonus round.
    *   **Standard (60-85%)**: Uses the default curriculum mix.
3.  **Content Selection**: Challenges are sorted based on their difficulty weight to ensure the student sees the most appropriate content first.

### Implementation:
See `src/lib/sessionGenerator.ts` for the `generateAdaptiveSession` function.

## 2. Feedback Engine (5-Strike System)

AIbo uses a "Hearts" system to manage engagement and frustration.

*   **Strike Logic**: Every incorrect answer removes 1 heart.
*   **Recovery**: Hearts regenerate over time or can be "earned" back by completing practice sessions.
*   **Mascot Empathy**: The mascot's expression and message change based on the remaining hearts to provide emotional support during difficult lessons.

## 3. Component Router

The `LessonSession` component uses a dynamic router to render the 12 interactive exercise types.

```typescript
const renderExercise = () => {
  switch (currentChallenge.type) {
    case 'tap_right_answer': return <TapRightAnswer ... />;
    case 'scenario_quest': return <ScenarioQuest ... />;
    // ... other 10 types
  }
}
```

## 4. Content Quality Checklist

Before adding a new lesson to `AI_CURRICULUM`, ensure it meets these criteria:
- [ ] **Active Start**: Does it start with a "Do" (Interactive) rather than just "Read"?
- [ ] **Mascot Presence**: Does every challenge have a specific `mascotExpression`?
- [ ] **Clear Feedback**: Is the `explanation` field helpful for *why* an answer was wrong?
- [ ] **XP Balance**: Is the `xpValue` proportional to the difficulty? (Easy: 10, Medium: 15, Hard: 25).
