import { Module } from './content';

export const SCIENCE_CURRICULUM: Module[] = [
  {
    id: 'sci-m1',
    title: 'Living & Non-Living Things',
    description: 'Learn how to tell living things from things that do not grow or breathe.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'sci-m1-l1',
        title: 'Life Detectives',
        description: 'Spot the signs of life.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l1-c1',
            type: 'match_pairs',
            question: 'Match the living thing to a life sign!',
            pairs: [{ left: 'Plant', right: 'Grows' }, { left: 'Dog', right: 'Breathes' }, { left: 'Bird', right: 'Moves' }],
            explanation: 'Living things grow, move, and need air or food.',
            xpValue: 30
          },
          {
            id: 's1-l1-c2',
            type: 'fill_in_blank',
            question: 'Living Things',
            sentence: 'A plant is a ___ thing.',
            options: ['living', 'non-living', 'plastic'],
            correctAnswer: 'living',
            explanation: 'Plants grow and need water and air.',
            xpValue: 30
          },
          {
            id: 's1-l1-c3',
            type: 'scenario_quest',
            question: 'Nature Detective',
            scenario: 'You see a toy car and a real cat. Which one is living?',
            studentRole: 'Nature Detective',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Cat', consequence: 'Correct! A cat grows, breathes, and needs food. 🐱', is_best: true, explanation: 'Living things need basic life processes.' },
              { id: 'opt2', text: 'Toy car', consequence: 'A toy car does not live.', is_best: false, explanation: 'Living things need basic life processes.' },
              { id: 'opt3', text: 'Both', consequence: 'Only the cat is living.', is_best: false, explanation: 'Living things need basic life processes.' }
            ],
            explanation: 'Living things need basic life processes.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'sci-m1-l2',
        title: 'Living Needs Lab',
        description: 'Learn what living things need to survive.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l2-c1',
            type: 'sort_sequence',
            question: 'Put the needs of a plant in order.',
            correctOrder: ['Water', 'Sunlight', 'Air', 'Soil'],
            steps: [{id: 'st1', text: 'Air'}, {id: 'st2', text: 'Water'}, {id: 'st3', text: 'Soil'}, {id: 'st4', text: 'Sunlight'}],
            explanation: 'Living things need the right conditions to stay healthy.',
            xpValue: 30
          },
          {
            id: 's1-l2-c2',
            type: 'drag_and_drop',
            question: 'Sort the items into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Living' }, { id: 'b2', label: 'Non-living' }],
            items: [
              { id: 'i1', text: 'Tree', correct_bucket: 'b1' },
              { id: 'i2', text: 'Rock', correct_bucket: 'b2' },
              { id: 'i3', text: 'Fish', correct_bucket: 'b1' },
              { id: 'i4', text: 'Chair', correct_bucket: 'b2' }
            ],
            explanation: 'Living things grow and change, non-living things do not.',
            xpValue: 30
          },
          {
            id: 's1-l2-c3',
            type: 'fill_in_blank',
            question: 'Breathing',
            sentence: 'A fish needs ___ to breathe.',
            options: ['water', 'sand', 'fire'],
            correctAnswer: 'water',
            explanation: 'Fish live in water and use it to breathe.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'sci-m1-l3',
        title: 'Life or Not?',
        description: 'Practice identifying living and non-living examples in real life.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l3-c1',
            type: 'scenario_quest',
            question: 'Park Observer',
            scenario: 'In the park, you see a flower, a bench, and a dog.',
            studentRole: 'Park Observer',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Flower and dog are living; bench is non-living', consequence: 'Excellent! You sorted them correctly. 🌼', is_best: true, explanation: 'Living and non-living things are all around us.' },
              { id: 'opt2', text: 'Bench is living', consequence: 'A bench does not grow or breathe.', is_best: false, explanation: 'Living and non-living things are all around us.' },
              { id: 'opt3', text: 'All are living', consequence: 'Not all objects are alive.', is_best: false, explanation: 'Living and non-living things are all around us.' }
            ],
            explanation: 'Living and non-living things are all around us.',
            xpValue: 40
          },
          {
            id: 's1-l3-c2',
            type: 'match_pairs',
            question: 'Match the object to its type.',
            pairs: [{ left: 'Stone', right: 'Non-living' }, { left: 'Child', right: 'Living' }, { left: 'Mushroom', right: 'Living' }],
            explanation: 'Living things can grow and reproduce.',
            xpValue: 30
          },
          {
            id: 's1-l3-c3',
            type: 'fill_in_blank',
            question: 'Robots',
            sentence: 'A robot is usually ___.',
            options: ['non-living', 'living', 'breathing'],
            correctAnswer: 'non-living',
            explanation: 'Robots may move, but they do not grow or breathe on their own.',
            xpValue: 30
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m2',
    title: 'Plants & Photosynthesis',
    description: 'Discover how plants make food and why sunlight matters.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'sci-m2-l1',
        title: 'Plant Parts Patrol',
        description: 'Learn the main parts of a plant.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 110,
        challenges: [
          {
            id: 's2-l1-c1',
            type: 'match_pairs',
            question: 'Match the plant part to its job!',
            pairs: [{ left: 'Root', right: 'Takes in water' }, { left: 'Stem', right: 'Supports plant' }, { left: 'Leaf', right: 'Makes food' }],
            explanation: 'Each plant part has a special role.',
            xpValue: 30
          },
          {
            id: 's2-l1-c2',
            type: 'fill_in_blank',
            question: 'Leaves',
            sentence: 'Leaves help plants make ___.',
            options: ['food', 'stones', 'shoes'],
            correctAnswer: 'food',
            explanation: 'Leaves use sunlight to make food.',
            xpValue: 30
          },
          {
            id: 's2-l1-c3',
            type: 'scenario_quest',
            question: 'Garden Helper',
            scenario: 'A gardener wants to know which part drinks water from the soil.',
            studentRole: 'Garden Helper',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Roots', consequence: 'Correct! Roots absorb water from the soil. 🌱', is_best: true, explanation: 'Roots, stems, and leaves do different jobs.' },
              { id: 'opt2', text: 'Flowers', consequence: 'Flowers help with reproduction, not water intake.', is_best: false, explanation: 'Roots, stems, and leaves do different jobs.' },
              { id: 'opt3', text: 'Fruit', consequence: 'Fruit stores seeds, not water.', is_best: false, explanation: 'Roots, stems, and leaves do different jobs.' }
            ],
            explanation: 'Roots, stems, and leaves do different jobs.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m3',
    title: 'Human Body Systems',
    description: 'Learn how body systems work together to keep us alive and active.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'sci-m3-l1',
        title: 'Body Basics',
        description: 'Identify major body parts and their jobs.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 's3-l1-c1',
            type: 'match_pairs',
            question: 'Match the body part to its job!',
            pairs: [{ left: 'Heart', right: 'Pumps blood' }, { left: 'Lungs', right: 'Help you breathe' }, { left: 'Brain', right: 'Controls body' }],
            explanation: 'Different body parts have different important jobs.',
            xpValue: 40
          },
          {
            id: 's3-l1-c2',
            type: 'fill_in_blank',
            question: 'Brain Power',
            sentence: 'The brain helps control the ___.',
            options: ['body', 'shoes', 'table'],
            correctAnswer: 'body',
            explanation: 'The brain sends signals to the rest of the body.',
            xpValue: 40
          },
          {
            id: 's3-l1-c3',
            type: 'scenario_quest',
            question: 'Body Scientist',
            scenario: 'You run fast and your heart beats quicker.',
            studentRole: 'Body Scientist',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'The heart is working harder to pump blood', consequence: 'Correct! Exercise makes the heart work more. ❤️', is_best: true, explanation: 'Body systems respond when we move.' },
              { id: 'opt2', text: 'The heart has stopped', consequence: 'No, it is pumping faster.', is_best: false, explanation: 'Body systems respond when we move.' },
              { id: 'opt3', text: 'The lungs are becoming shoes', consequence: 'That does not happen.', is_best: false, explanation: 'Body systems respond when we move.' }
            ],
            explanation: 'Body systems respond when we move.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m4',
    title: 'Force, Motion & Energy',
    description: 'Explore how things move, stop, and change using different kinds of energy.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'sci-m4-l1',
        title: 'Motion Mission',
        description: 'Learn the basics of push, pull, and movement.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 's4-l1-c1',
            type: 'match_pairs',
            question: 'Match the force to the action!',
            pairs: [{ left: 'Push', right: 'Moves away' }, { left: 'Pull', right: 'Moves closer' }, { left: 'Gravity', right: 'Pulls down' }],
            explanation: 'Forces can change how objects move.',
            xpValue: 40
          },
          {
            id: 's4-l1-c2',
            type: 'fill_in_blank',
            question: 'Forces',
            sentence: 'A force can make an object ___.',
            options: ['move', 'sing', 'grow'],
            correctAnswer: 'move',
            explanation: 'Forces can start or stop motion.',
            xpValue: 40
          },
          {
            id: 's4-l1-c3',
            type: 'scenario_quest',
            question: 'Force Tester',
            scenario: 'You slide a box across the floor by pushing it.',
            studentRole: 'Force Tester',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'You used a push force', consequence: 'Correct! A push moves the box away from you. 📦', is_best: true, explanation: 'Pushes and pulls are types of forces.' },
              { id: 'opt2', text: 'You used gravity only', consequence: 'Gravity is always there, but you pushed the box.', is_best: false, explanation: 'Pushes and pulls are types of forces.' },
              { id: 'opt3', text: 'You turned the box into water', consequence: 'That is not related to force.', is_best: false, explanation: 'Pushes and pulls are types of forces.' }
            ],
            explanation: 'Pushes and pulls are types of forces.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m5',
    title: 'Solar System & Space',
    description: 'Travel through planets, stars, and the amazing space around Earth.',
    difficulty: 'Hard',
    lessons: [
      {
        id: 'sci-m5-l1',
        title: 'Planet Parade',
        description: 'Learn the planets in our solar system.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 's5-l1-c1',
            type: 'match_pairs',
            question: 'Match the planet to a simple fact!',
            pairs: [{ left: 'Earth', right: 'Our home planet' }, { left: 'Mars', right: 'Red planet' }, { left: 'Jupiter', right: 'Largest planet' }],
            explanation: 'Each planet has special features.',
            xpValue: 50
          },
          {
            id: 's5-l1-c2',
            type: 'fill_in_blank',
            question: 'Home Planet',
            sentence: 'The planet we live on is ___.',
            options: ['Earth', 'Mars', 'Venus'],
            correctAnswer: 'Earth',
            explanation: 'Earth is the planet where humans live.',
            xpValue: 50
          },
          {
            id: 's5-l1-c3',
            type: 'scenario_quest',
            question: 'Space Guide',
            scenario: 'You are planning a space tour and want to visit the red planet.',
            studentRole: 'Space Guide',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Mars', consequence: 'Correct! Mars is known as the red planet. 🚀', is_best: true, explanation: 'Planets orbit the Sun, and each one is unique.' },
              { id: 'opt2', text: 'Earth', consequence: 'Earth is our home planet.', is_best: false, explanation: 'Planets orbit the Sun, and each one is unique.' },
              { id: 'opt3', text: 'Moon', consequence: 'The Moon is not a planet.', is_best: false, explanation: 'Planets orbit the Sun, and each one is unique.' }
            ],
            explanation: 'Planets orbit the Sun, and each one is unique.',
            xpValue: 50
          }
        ]
      }
    ]
  }
];
import { Module } from './content';

export const SCIENCE_CURRICULUM: Module[] = [
  {
    id: 'sci-m1',
    title: 'Living & Non-Living Things',
    description: 'Learn how to tell living things from things that do not grow or breathe.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'sci-m1-l1',
        title: 'Life Detectives',
        description: 'Spot the signs of life.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l1-c1',
            type: 'match_pairs',
            question: 'Match the living thing to a life sign!',
            pairs: [{ left: 'Plant', right: 'Grows' }, { left: 'Dog', right: 'Breathes' }, { left: 'Bird', right: 'Moves' }],
            explanation: 'Living things grow, move, and need air or food.',
            xpValue: 30
          },
          {
            id: 's1-l1-c2',
            type: 'fill_in_blank',
            question: 'Living Things',
            sentence: 'A plant is a ___ thing.',
            options: ['living', 'non-living', 'plastic'],
            correctAnswer: 'living',
            explanation: 'Plants grow and need water and air.',
            xpValue: 30
          },
          {
            id: 's1-l1-c3',
            type: 'scenario_quest',
            question: 'Nature Detective',
            scenario: 'You see a toy car and a real cat. Which one is living?',
            studentRole: 'Nature Detective',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Cat', consequence: 'Correct! A cat grows, breathes, and needs food. 🐱', is_best: true, explanation: 'Living things need basic life processes.' },
              { id: 'opt2', text: 'Toy car', consequence: 'A toy car does not live.', is_best: false, explanation: 'Living things need basic life processes.' },
              { id: 'opt3', text: 'Both', consequence: 'Only the cat is living.', is_best: false, explanation: 'Living things need basic life processes.' }
            ],
            explanation: 'Living things need basic life processes.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'sci-m1-l2',
        title: 'Living Needs Lab',
        description: 'Learn what living things need to survive.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l2-c1',
            type: 'sort_sequence',
            question: 'Put the needs of a plant in order.',
            correctOrder: ['Water', 'Sunlight', 'Air', 'Soil'],
            steps: [{id: 'st1', text: 'Air'}, {id: 'st2', text: 'Water'}, {id: 'st3', text: 'Soil'}, {id: 'st4', text: 'Sunlight'}],
            explanation: 'Living things need the right conditions to stay healthy.',
            xpValue: 30
          },
          {
            id: 's1-l2-c2',
            type: 'drag_and_drop',
            question: 'Sort the items into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Living' }, { id: 'b2', label: 'Non-living' }],
            items: [
              { id: 'i1', text: 'Tree', correct_bucket: 'b1' },
              { id: 'i2', text: 'Rock', correct_bucket: 'b2' },
              { id: 'i3', text: 'Fish', correct_bucket: 'b1' },
              { id: 'i4', text: 'Chair', correct_bucket: 'b2' }
            ],
            explanation: 'Living things grow and change, non-living things do not.',
            xpValue: 30
          },
          {
            id: 's1-l2-c3',
            type: 'fill_in_blank',
            question: 'Breathing',
            sentence: 'A fish needs ___ to breathe.',
            options: ['water', 'sand', 'fire'],
            correctAnswer: 'water',
            explanation: 'Fish live in water and use it to breathe.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'sci-m1-l3',
        title: 'Life or Not?',
        description: 'Practice identifying living and non-living examples in real life.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 's1-l3-c1',
            type: 'scenario_quest',
            question: 'Park Observer',
            scenario: 'In the park, you see a flower, a bench, and a dog.',
            studentRole: 'Park Observer',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Flower and dog are living; bench is non-living', consequence: 'Excellent! You sorted them correctly. 🌼', is_best: true, explanation: 'Living and non-living things are all around us.' },
              { id: 'opt2', text: 'Bench is living', consequence: 'A bench does not grow or breathe.', is_best: false, explanation: 'Living and non-living things are all around us.' },
              { id: 'opt3', text: 'All are living', consequence: 'Not all objects are alive.', is_best: false, explanation: 'Living and non-living things are all around us.' }
            ],
            explanation: 'Living and non-living things are all around us.',
            xpValue: 40
          },
          {
            id: 's1-l3-c2',
            type: 'match_pairs',
            question: 'Match the object to its type.',
            pairs: [{ left: 'Stone', right: 'Non-living' }, { left: 'Child', right: 'Living' }, { left: 'Mushroom', right: 'Living' }],
            explanation: 'Living things can grow and reproduce.',
            xpValue: 30
          },
          {
            id: 's1-l3-c3',
            type: 'fill_in_blank',
            question: 'Robots',
            sentence: 'A robot is usually ___.',
            options: ['non-living', 'living', 'breathing'],
            correctAnswer: 'non-living',
            explanation: 'Robots may move, but they do not grow or breathe on their own.',
            xpValue: 30
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m2',
    title: 'Plants & Photosynthesis',
    description: 'Discover how plants make food and why sunlight matters.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'sci-m2-l1',
        title: 'Plant Parts Patrol',
        description: 'Learn the main parts of a plant.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 110,
        challenges: [
          {
            id: 's2-l1-c1',
            type: 'match_pairs',
            question: 'Match the plant part to its job!',
            pairs: [{ left: 'Root', right: 'Takes in water' }, { left: 'Stem', right: 'Supports plant' }, { left: 'Leaf', right: 'Makes food' }],
            explanation: 'Each plant part has a special role.',
            xpValue: 30
          },
          {
            id: 's2-l1-c2',
            type: 'fill_in_blank',
            question: 'Leaves',
            sentence: 'Leaves help plants make ___.',
            options: ['food', 'stones', 'shoes'],
            correctAnswer: 'food',
            explanation: 'Leaves use sunlight to make food.',
            xpValue: 30
          },
          {
            id: 's2-l1-c3',
            type: 'scenario_quest',
            question: 'Garden Helper',
            scenario: 'A gardener wants to know which part drinks water from the soil.',
            studentRole: 'Garden Helper',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Roots', consequence: 'Correct! Roots absorb water from the soil. 🌱', is_best: true, explanation: 'Roots, stems, and leaves do different jobs.' },
              { id: 'opt2', text: 'Flowers', consequence: 'Flowers help with reproduction, not water intake.', is_best: false, explanation: 'Roots, stems, and leaves do different jobs.' },
              { id: 'opt3', text: 'Fruit', consequence: 'Fruit stores seeds, not water.', is_best: false, explanation: 'Roots, stems, and leaves do different jobs.' }
            ],
            explanation: 'Roots, stems, and leaves do different jobs.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m3',
    title: 'Human Body Systems',
    description: 'Learn how body systems work together to keep us alive and active.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'sci-m3-l1',
        title: 'Body Basics',
        description: 'Identify major body parts and their jobs.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 's3-l1-c1',
            type: 'match_pairs',
            question: 'Match the body part to its job!',
            pairs: [{ left: 'Heart', right: 'Pumps blood' }, { left: 'Lungs', right: 'Help you breathe' }, { left: 'Brain', right: 'Controls body' }],
            explanation: 'Different body parts have different important jobs.',
            xpValue: 40
          },
          {
            id: 's3-l1-c2',
            type: 'fill_in_blank',
            question: 'Brain Power',
            sentence: 'The brain helps control the ___.',
            options: ['body', 'shoes', 'table'],
            correctAnswer: 'body',
            explanation: 'The brain sends signals to the rest of the body.',
            xpValue: 40
          },
          {
            id: 's3-l1-c3',
            type: 'scenario_quest',
            question: 'Body Scientist',
            scenario: 'You run fast and your heart beats quicker.',
            studentRole: 'Body Scientist',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'The heart is working harder to pump blood', consequence: 'Correct! Exercise makes the heart work more. ❤️', is_best: true, explanation: 'Body systems respond when we move.' },
              { id: 'opt2', text: 'The heart has stopped', consequence: 'No, it is pumping faster.', is_best: false, explanation: 'Body systems respond when we move.' },
              { id: 'opt3', text: 'The lungs are becoming shoes', consequence: 'That does not happen.', is_best: false, explanation: 'Body systems respond when we move.' }
            ],
            explanation: 'Body systems respond when we move.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m4',
    title: 'Force, Motion & Energy',
    description: 'Explore how things move, stop, and change using different kinds of energy.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'sci-m4-l1',
        title: 'Motion Mission',
        description: 'Learn the basics of push, pull, and movement.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 's4-l1-c1',
            type: 'match_pairs',
            question: 'Match the force to the action!',
            pairs: [{ left: 'Push', right: 'Moves away' }, { left: 'Pull', right: 'Moves closer' }, { left: 'Gravity', right: 'Pulls down' }],
            explanation: 'Forces can change how objects move.',
            xpValue: 40
          },
          {
            id: 's4-l1-c2',
            type: 'fill_in_blank',
            question: 'Forces',
            sentence: 'A force can make an object ___.',
            options: ['move', 'sing', 'grow'],
            correctAnswer: 'move',
            explanation: 'Forces can start or stop motion.',
            xpValue: 40
          },
          {
            id: 's4-l1-c3',
            type: 'scenario_quest',
            question: 'Force Tester',
            scenario: 'You slide a box across the floor by pushing it.',
            studentRole: 'Force Tester',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'You used a push force', consequence: 'Correct! A push moves the box away from you. 📦', is_best: true, explanation: 'Pushes and pulls are types of forces.' },
              { id: 'opt2', text: 'You used gravity only', consequence: 'Gravity is always there, but you pushed the box.', is_best: false, explanation: 'Pushes and pulls are types of forces.' },
              { id: 'opt3', text: 'You turned the box into water', consequence: 'That is not related to force.', is_best: false, explanation: 'Pushes and pulls are types of forces.' }
            ],
            explanation: 'Pushes and pulls are types of forces.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'sci-m5',
    title: 'Solar System & Space',
    description: 'Travel through planets, stars, and the amazing space around Earth.',
    difficulty: 'Hard',
    lessons: [
      {
        id: 'sci-m5-l1',
        title: 'Planet Parade',
        description: 'Learn the planets in our solar system.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 's5-l1-c1',
            type: 'match_pairs',
            question: 'Match the planet to a simple fact!',
            pairs: [{ left: 'Earth', right: 'Our home planet' }, { left: 'Mars', right: 'Red planet' }, { left: 'Jupiter', right: 'Largest planet' }],
            explanation: 'Each planet has special features.',
            xpValue: 50
          },
          {
            id: 's5-l1-c2',
            type: 'fill_in_blank',
            question: 'Home Planet',
            sentence: 'The planet we live on is ___.',
            options: ['Earth', 'Mars', 'Venus'],
            correctAnswer: 'Earth',
            explanation: 'Earth is the planet where humans live.',
            xpValue: 50
          },
          {
            id: 's5-l1-c3',
            type: 'scenario_quest',
            question: 'Space Guide',
            scenario: 'You are planning a space tour and want to visit the red planet.',
            studentRole: 'Space Guide',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Mars', consequence: 'Correct! Mars is known as the red planet. 🚀', is_best: true, explanation: 'Planets orbit the Sun, and each one is unique.' },
              { id: 'opt2', text: 'Earth', consequence: 'Earth is our home planet.', is_best: false, explanation: 'Planets orbit the Sun, and each one is unique.' },
              { id: 'opt3', text: 'Moon', consequence: 'The Moon is not a planet.', is_best: false, explanation: 'Planets orbit the Sun, and each one is unique.' }
            ],
            explanation: 'Planets orbit the Sun, and each one is unique.',
            xpValue: 50
          }
        ]
      }
    ]
  }
];
