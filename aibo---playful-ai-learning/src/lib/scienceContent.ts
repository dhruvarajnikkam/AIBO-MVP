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
            question: 'Sky gazing',
            sentence: 'When the moon is completely dark, it is called a ___ moon.',
            options: ['new', 'full', 'crescent'],
            correctAnswer: 'new',
            explanation: 'A new moon occurs when the moon is between Earth and the sun.',
            xpValue: 150
          },
          {
            id: 's1-q3',
            type: 'scenario_quest',
            question: 'Moonlight Physics',
            scenario: 'Does the moon produce its own light?',
            studentRole: 'Astronomer',
            decisionPrompt: 'Choose the correct fact:',
            scenarioOptions: [
              { id: 'opt1', text: 'No, it reflects the Sun\'s light.', consequence: 'Correct! The moon is like a giant mirror reflecting the sun.', is_best: true, explanation: 'The moon does not emit its own visible light. We see it because sunlight bounces off its surface.' },
              { id: 'opt2', text: 'Yes, it glows from internal heat.', consequence: 'Incorrect. The moon is a cold, rocky body.', is_best: false, explanation: 'Unlike stars, moons and planets do not generate their own light.' },
              { id: 'opt3', text: 'Yes, but only during a Full Moon.', consequence: 'Incorrect. Even a Full Moon is just reflection.', is_best: false, explanation: 'A Full Moon just means the fully illuminated side is facing Earth.' }
            ],
            explanation: 'The moon acts as a reflector in space, bouncing sunlight down to Earth.',
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