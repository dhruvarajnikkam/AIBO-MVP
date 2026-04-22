import { Module } from './content';

export const SCIENCE_CURRICULUM: Module[] = [
  {
    id: 'sci-m1',
    title: 'Earth & Space',
    description: 'Explore the universe and our home planet.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'sci-l1',
        title: 'Solar System Quest',
        description: 'Match planets and discover their secrets.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-q1',
            type: 'match_pairs',
            question: 'Match the planet to its description.',
            pairs: [
              { left: 'Earth', right: 'Our Home' },
              { left: 'Mars', right: 'The Red Planet' },
              { left: 'Jupiter', right: 'Largest Planet' },
              { left: 'Saturn', right: 'Gas Giant' }
            ],
            explanation: 'The solar system is full of diverse and unique planets.',
            xpValue: 100
          }
        ]
      },
      {
        id: 'sci-l2',
        title: 'Phases of the Moon',
        description: 'Understand the moon\'s cycle.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 150,
        isChallenge: true,
        challenges: [
          {
            id: 's1-q2',
            type: 'fill_in_blank',
            sentence: 'When the moon is completely dark, it is called a ___ moon.',
            options: ['new', 'full', 'crescent'],
            correctAnswer: 'new',
            explanation: 'A new moon occurs when the moon is between Earth and the sun.',
            xpValue: 150
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m2',
    title: 'Life Sciences',
    description: 'Study the wonders of biology.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'sci-l3',
        title: 'Plant Power',
        description: 'Sort the stages of a plant\'s life.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 150,
        challenges: [
          {
            id: 's2-q1',
            type: 'sort_sequence',
            question: 'Order the life cycle of a flowering plant.',
            correctOrder: [
              'Seed',
              'Sprout',
              'Sapling',
              'Adult Plant',
              'Flower'
            ],
            explanation: 'Plants undergo a remarkable process of growth.',
            xpValue: 150
          }
        ]
      }
    ]
  }
];