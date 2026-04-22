import { Module } from './content';

export const MATH_CURRICULUM: Module[] = [
  {
    id: 'math-m1',
    title: 'Numbers & Operations',
    description: 'Master the basics of numbers, logic and puzzles.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'math-l1',
        title: 'Number Ninja',
        description: 'Match the numbers to their operations.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-q1',
            type: 'match_pairs',
            question: 'Match the operation with its result.',
            pairs: [
              { left: '2 + 2', right: '4' },
              { left: '3 × 3', right: '9' },
              { left: '10 ÷ 2', right: '5' },
              { left: '7 - 4', right: '3' }
            ],
            explanation: 'Basic arithmetic is the foundation of all math!',
            xpValue: 100
          }
        ]
      },
      {
        id: 'math-l2',
        title: 'Fractions Quest',
        description: 'Understand parts of a whole.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 150,
        isChallenge: true,
        challenges: [
          {
            id: 'm1-q2',
            type: 'fill_in_blank',
            question: 'Solve the fraction!',
            sentence: 'A fraction represents a ___ of a whole.',
            options: ['part', 'piece', 'portion'],
            correctAnswer: 'part',
            explanation: 'Fractions are used to represent smaller pieces of a whole item.',
            xpValue: 150
          },
          {
            id: 'm1-q3',
            type: 'scenario_quest',
            question: 'Pizza Math!',
            scenario: 'You have a pizza cut into 8 equal slices. If you eat 3 slices, what fraction of the pizza is left?',
            studentRole: 'Hungry Mathematician',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '5/8', consequence: 'Exactly! 8 - 3 = 5 slices left.', is_best: true, explanation: 'The whole pizza is 8/8. Eating 3/8 leaves 5/8.' },
              { id: 'opt2', text: '3/8', consequence: 'That is the fraction you ate, not what is left!', is_best: false, explanation: 'Always read the question carefully to see what it asks for.' },
              { id: 'opt3', text: '1/2', consequence: '1/2 would mean 4 slices are left.', is_best: false, explanation: '1/2 is equivalent to 4/8.' }
            ],
            explanation: 'Subtracting fractions with the same denominator is as simple as subtracting the numerators!',
            xpValue: 150
          }
        ]
      }
    ]
  },
  {
    id: 'math-m2',
    title: 'Geometry Explorer',
    description: 'Discover shapes and their properties.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'math-l3',
        title: 'Shape Sorter',
        description: 'Sort shapes by their number of sides.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 150,
        challenges: [
          {
            id: 'm2-q1',
            type: 'drag_and_drop',
            question: 'Drag the shapes to their correct number of sides.',
            buckets: [
              { id: 'b1', label: '3 Sides' },
              { id: 'b2', label: '4 Sides' }
            ],
            items: [
              { id: 'i1', text: 'Triangle', correct_bucket: 'b1' },
              { id: 'i2', text: 'Square', correct_bucket: 'b2' },
              { id: 'i3', text: 'Rectangle', correct_bucket: 'b2' }
            ],
            explanation: 'Different shapes have different properties!',
            xpValue: 150
          }
        ]
      }
    ]
  }
];