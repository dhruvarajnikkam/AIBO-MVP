import { Module } from './content';

export const MATH_CURRICULUM: Module[] = [
  {
    id: 'math-m1',
    title: 'Number Sense & Counting',
    description: 'Learn the basics of counting, numbers, and early math ideas!',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'math-m1-l1',
        title: 'Counting to 10',
        description: 'Practice counting objects up to 10.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l1-c1',
            type: 'match_pairs',
            question: 'Match the numbers to the words!',
            pairs: [{ left: '1', right: 'One' }, { left: '2', right: 'Two' }, { left: '3', right: 'Three' }],
            explanation: 'Numbers can be written as digits or words.',
            xpValue: 30
          },
          {
            id: 'm1-l1-c2',
            type: 'fill_in_blank',
            question: 'Counting Objects',
            sentence: 'I have 5 apples. If I get 1 more, I have ___ apples.',
            options: ['4', '5', '6'],
            correctAnswer: '6',
            explanation: '5 + 1 = 6',
            xpValue: 30
          },
          {
            id: 'm1-l1-c3',
            type: 'scenario_quest',
            question: 'The Counting Game',
            scenario: 'You are counting your toys. You count 1, 2, 3...',
            studentRole: 'Counter',
            decisionPrompt: 'What comes next?',
            scenarioOptions: [
              { id: 'opt1', text: '4', consequence: 'Correct! 4 comes after 3. 🎈', is_best: true, explanation: 'Numbers follow a set order.' },
              { id: 'opt2', text: '5', consequence: 'Not quite. 4 comes next.', is_best: false, explanation: 'Numbers follow a set order.' },
              { id: 'opt3', text: '1', consequence: 'We are going up!', is_best: false, explanation: 'Numbers follow a set order.' }
            ],
            explanation: 'Numbers follow a set order.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m1-l2',
        title: 'Bigger and Smaller',
        description: 'Understand which numbers represent more and which represent less.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l2-c1',
            type: 'drag_and_drop',
            question: 'Sort the items by size!',
            buckets: [{ id: 'b1', label: 'Big' }, { id: 'b2', label: 'Small' }],
            items: [
              { id: 'i1', text: 'Elephant', correct_bucket: 'b1' },
              { id: 'i2', text: 'Mouse', correct_bucket: 'b2' },
              { id: 'i3', text: 'House', correct_bucket: 'b1' },
              { id: 'i4', text: 'Ant', correct_bucket: 'b2' }
            ],
            explanation: 'We can group things by comparing sizes.',
            xpValue: 30
          },
          {
            id: 'm1-l2-c2',
            type: 'sort_sequence',
            question: 'Put these numbers in order from smallest to biggest.',
            correctOrder: ['1', '3', '5', '8'],
            steps: [{id: 's1', text: '5'}, {id: 's2', text: '1'}, {id: 's3', text: '8'}, {id: 's4', text: '3'}],
            explanation: 'Number lines help us see size order.',
            xpValue: 30
          },
          {
            id: 'm1-l2-c3',
            type: 'fill_in_blank',
            question: 'Comparing',
            sentence: '10 is ___ than 5.',
            options: ['more', 'less', 'same'],
            correctAnswer: 'more',
            explanation: '10 items are a larger quantity than 5 items.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m1-l3',
        title: 'Basic Shapes',
        description: 'Learn simple shapes like circles, squares, and triangles.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l3-c1',
            type: 'match_pairs',
            question: 'Match the shape to the number of sides.',
            pairs: [{ left: 'Triangle', right: '3' }, { left: 'Square', right: '4' }, { left: 'Circle', right: '0' }],
            explanation: 'Shapes are defined by their edges.',
            xpValue: 30
          },
          {
            id: 'm1-l3-c2',
            type: 'fill_in_blank',
            question: 'Shape Hunt',
            sentence: 'A pizza slice is usually shaped like a ___.',
            options: ['triangle', 'square', 'circle'],
            correctAnswer: 'triangle',
            explanation: 'A slice cut from a round pizza forms a triangle-like shape.',
            xpValue: 30
          },
          {
            id: 'm1-l3-c3',
            type: 'scenario_quest',
            question: 'The Building Block',
            scenario: 'You are building a house. You need a shape with 4 equal sides for a window.',
            studentRole: 'Builder',
            decisionPrompt: 'Select your shape:',
            scenarioOptions: [
              { id: 'opt1', text: 'Square', consequence: 'Perfect! A square has 4 equal sides. 🔲', is_best: true, explanation: 'Squares are common in building shapes.' },
              { id: 'opt2', text: 'Triangle', consequence: 'A triangle only has 3 sides.', is_best: false, explanation: 'Squares are common in building shapes.' },
              { id: 'opt3', text: 'Circle', consequence: 'A circle is round with no sides.', is_best: false, explanation: 'Squares are common in building shapes.' }
            ],
            explanation: 'Squares are common in building shapes.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'math-m2',
    title: 'Addition & Subtraction',
    description: 'Learn to put numbers together and take them apart.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'math-m2-l1',
        title: 'Simple Adding',
        description: 'Learn how to add single digit numbers.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 110,
        challenges: [
          {
            id: 'm2-l1-c1',
            type: 'match_pairs',
            question: 'Match the math problem to its answer!',
            pairs: [{ left: '2 + 2', right: '4' }, { left: '3 + 1', right: '4' }, { left: '1 + 2', right: '3' }],
            explanation: 'Adding means putting amounts together.',
            xpValue: 30
          },
          {
            id: 'm2-l1-c2',
            type: 'fill_in_blank',
            question: 'Adding items',
            sentence: '2 cats plus 3 cats equals ___ cats.',
            options: ['4', '5', '6'],
            correctAnswer: '5',
            explanation: '2 + 3 = 5',
            xpValue: 30
          },
          {
            id: 'm2-l1-c3',
            type: 'scenario_quest',
            question: 'The Bakery Add',
            scenario: 'You have 4 cupcakes. Your friend gives you 2 more.',
            studentRole: 'Baker',
            decisionPrompt: 'How many cupcakes do you have now?',
            scenarioOptions: [
              { id: 'opt1', text: '6', consequence: 'Great math! 4 + 2 = 6. 🧁', is_best: true, explanation: 'Addition combines sets.' },
              { id: 'opt2', text: '5', consequence: 'Count one more!', is_best: false, explanation: 'Addition combines sets.' },
              { id: 'opt3', text: '2', consequence: 'You wouldn\'t have less!', is_best: false, explanation: 'Addition combines sets.' }
            ],
            explanation: 'Addition combines sets.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'math-m3',
    title: 'Introducing Multiplication',
    description: 'Learn fast adding with groups of objects!',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'math-m3-l1',
        title: 'Groups of Things',
        description: 'Understand that multiplication is like adding groups.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 'm3-l1-c1',
            type: 'match_pairs',
            question: 'Match the addition to the multiplication!',
            pairs: [{ left: '2 + 2 + 2', right: '2 x 3' }, { left: '5 + 5', right: '5 x 2' }, { left: '3 + 3', right: '3 x 2' }],
            explanation: 'Multiplication is repeated addition.',
            xpValue: 40
          },
          {
            id: 'm3-l1-c2',
            type: 'fill_in_blank',
            question: 'Multiplying items',
            sentence: '3 groups of 2 cookies is ___ cookies total.',
            options: ['5', '6', '8'],
            correctAnswer: '6',
            explanation: '3 x 2 = 6',
            xpValue: 40
          },
          {
            id: 'm3-l1-c3',
            type: 'scenario_quest',
            question: 'The Toy Store',
            scenario: 'You want to buy 3 cars, and each car costs 3 coins.',
            studentRole: 'Shopper',
            decisionPrompt: 'How many coins do you need?',
            scenarioOptions: [
              { id: 'opt1', text: '9 coins', consequence: 'Perfect! 3x3=9. 🪙', is_best: true, explanation: 'Multiplication solves grouped amounts fast.' },
              { id: 'opt2', text: '6 coins', consequence: 'That would be 2 cars.', is_best: false, explanation: 'Multiplication solves grouped amounts fast.' },
              { id: 'opt3', text: '3 coins', consequence: 'That is just for 1 car.', is_best: false, explanation: 'Multiplication solves grouped amounts fast.' }
            ],
            explanation: 'Multiplication solves grouped amounts fast.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'math-m4',
    title: 'Fractions Basic',
    description: 'Learn about halves and parts of a whole.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'math-m4-l1',
        title: 'Half of a Whole',
        description: 'Understand how to divide an object into 2 equal parts.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 'm4-l1-c1',
            type: 'match_pairs',
            question: 'Match the fraction to the image text!',
            pairs: [{ left: '1/2', right: 'Half' }, { left: '1 whole', right: 'Full' }, { left: '1/4', right: 'Quarter' }],
            explanation: 'Fractions name parts of a whole.',
            xpValue: 40
          },
          {
            id: 'm4-l1-c2',
            type: 'fill_in_blank',
            question: 'Cutting a pizza',
            sentence: 'If I cut a pizza into 2 equal pieces, each piece is one ___.',
            options: ['half', 'quarter', 'whole'],
            correctAnswer: 'half',
            explanation: 'Two halves make a whole.',
            xpValue: 40
          },
          {
            id: 'm4-l1-c3',
            type: 'scenario_quest',
            question: 'Sharing Bread',
            scenario: 'You have one loaf of bread to share equally with a friend.',
            studentRole: 'Sharer',
            decisionPrompt: 'How much bread do you each get?',
            scenarioOptions: [
              { id: 'opt1', text: 'One half', consequence: 'Great sharing! 🍞', is_best: true, explanation: 'Equal parts are fractions.' },
              { id: 'opt2', text: 'One whole', consequence: 'Then there is none for your friend.', is_best: false, explanation: 'Equal parts are fractions.' },
              { id: 'opt3', text: 'One slice', consequence: 'But equal sharing means half the loaf.', is_best: false, explanation: 'Equal parts are fractions.' }
            ],
            explanation: 'Equal parts are fractions.',
            xpValue: 50
          }
        ]
      }
    ]
  },
  {
    id: 'math-m5',
    title: 'Geometry & Measurement',
    description: 'Explore shapes in 3D and learn how to measure length and time.',
    difficulty: 'Hard',
    lessons: [
      {
        id: 'math-m5-l1',
        title: 'Telling Time',
        description: 'Learn the basics of reading a clock.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 'm5-l1-c1',
            type: 'match_pairs',
            question: 'Match time terms!',
            pairs: [{ left: '60 minutes', right: '1 hour' }, { left: '24 hours', right: '1 day' }, { left: '30 minutes', right: 'Half hour' }],
            explanation: 'Time is divided into set units.',
            xpValue: 50
          },
          {
            id: 'm5-l1-c2',
            type: 'fill_in_blank',
            question: 'Clocks',
            sentence: 'The short hand on a clock tells the ___.',
            options: ['hour', 'minute', 'second'],
            correctAnswer: 'hour',
            explanation: 'The long hand tells minutes, short hand tells hours.',
            xpValue: 50
          },
          {
            id: 'm5-l1-c3',
            type: 'scenario_quest',
            question: 'School Schedule',
            scenario: 'School starts at 8:00. It is 1 hour later.',
            studentRole: 'Student',
            decisionPrompt: 'What time is it?',
            scenarioOptions: [
              { id: 'opt1', text: '9:00', consequence: 'Correct! 8+1=9. ⏰', is_best: true, explanation: 'Time moves forward linearly.' },
              { id: 'opt2', text: '7:00', consequence: 'That is backwards!', is_best: false, explanation: 'Time moves forward linearly.' },
              { id: 'opt3', text: '8:30', consequence: 'That is only a half hour.', is_best: false, explanation: 'Time moves forward linearly.' }
            ],
            explanation: 'Time moves forward linearly.',
            xpValue: 50
          }
        ]
      }
    ]
  }
];
