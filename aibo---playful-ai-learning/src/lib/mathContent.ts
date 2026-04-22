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
import { Module } from './content';

export const MATH_CURRICULUM: Module[] = [
  {
    id: 'math-m1',
    title: 'Numbers & Place Value',
    description: 'Learn how numbers are built, counted, compared, and grouped into tens and ones.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'math-m1-l1',
        title: 'Counting Crystals',
        description: 'Build number confidence with counting and place value.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l1-c1',
            type: 'match_pairs',
            question: 'Match the number to its value!',
            pairs: [{ left: '3', right: 'Three' }, { left: '14', right: 'Fourteen' }, { left: '20', right: 'Twenty' }],
            explanation: 'Numbers can be read as words to understand their value.',
            xpValue: 30
          },
          {
            id: 'm1-l1-c2',
            type: 'fill_in_blank',
            question: 'Place Value',
            sentence: 'In 47, the digit 4 stands for ___.',
            options: ['40', '4', '400'],
            correctAnswer: '40',
            explanation: 'The 4 is in the tens place, so it means 40.',
            xpValue: 30
          },
          {
            id: 'm1-l1-c3',
            type: 'scenario_quest',
            question: 'Treasure Keeper',
            scenario: 'You are a treasure keeper counting gold coins. A chest has 18 coins, and you need to show the number using tens and ones.',
            studentRole: 'Treasure Keeper',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '1 ten and 8 ones', consequence: 'Great! You broke 18 into place values correctly. 🪙', is_best: true, explanation: 'Place value tells us what each digit really means.' },
              { id: 'opt2', text: '8 tens and 1 one', consequence: 'Not quite. That would make 81, not 18.', is_best: false, explanation: 'Place value tells us what each digit really means.' },
              { id: 'opt3', text: '10 tens and 8 ones', consequence: 'Too big! That would be 108.', is_best: false, explanation: 'Place value tells us what each digit really means.' }
            ],
            explanation: 'Place value tells us what each digit really means.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m1-l2',
        title: 'Number Compare Cave',
        description: 'Compare numbers using greater than, less than, and equal to.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l2-c1',
            type: 'sort_sequence',
            question: 'Put these numbers in order from smallest to biggest.',
            correctOrder: ['2', '7', '9', '15'],
            steps: [{id: 's1', text: '9'}, {id: 's2', text: '2'}, {id: 's3', text: '15'}, {id: 's4', text: '7'}],
            explanation: 'Ordering numbers helps us compare size correctly.',
            xpValue: 30
          },
          {
            id: 'm1-l2-c2',
            type: 'drag_and_drop',
            question: 'Sort the numbers into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Greater than 10' }, { id: 'b2', label: '10 or less' }],
            items: [
              { id: 'i1', text: '4', correct_bucket: 'b2' },
              { id: 'i2', text: '11', correct_bucket: 'b1' },
              { id: 'i3', text: '20', correct_bucket: 'b1' },
              { id: 'i4', text: '10', correct_bucket: 'b2' }
            ],
            explanation: 'Comparing numbers helps us group them by size.',
            xpValue: 30
          },
          {
            id: 'm1-l2-c3',
            type: 'scenario_quest',
            question: 'Robot Race',
            scenario: 'You and a robot are racing to find the bigger number. The robot says 13 is bigger than 31.',
            studentRole: 'Number Detective',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'The robot is wrong because 31 is bigger.', consequence: 'Correct! The tens digit makes 31 larger.', is_best: true, explanation: 'Compare tens first, then ones.' },
              { id: 'opt2', text: 'The robot is correct because 13 has two digits.', consequence: 'Two digits does not mean bigger.', is_best: false, explanation: 'Compare tens first, then ones.' },
              { id: 'opt3', text: 'They are equal.', consequence: 'Not equal at all.', is_best: false, explanation: 'Compare tens first, then ones.' }
            ],
            explanation: 'Compare tens first, then ones.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m1-l3',
        title: 'Tens Town Builder',
        description: 'Practice grouping numbers into tens and ones.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm1-l3-c1',
            type: 'match_pairs',
            question: 'Match the bundle to the number.',
            pairs: [{ left: '2 tens and 3 ones', right: '23' }, { left: '1 ten and 0 ones', right: '10' }, { left: '4 tens and 6 ones', right: '46' }],
            explanation: 'Tens and ones together create a whole number.',
            xpValue: 30
          },
          {
            id: 'm1-l3-c2',
            type: 'fill_in_blank',
            question: 'Next Number',
            sentence: 'The number after 29 is ___.',
            options: ['30', '28', '39'],
            correctAnswer: '30',
            explanation: 'Counting forward by 1 after 29 gives 30.',
            xpValue: 30
          },
          {
            id: 'm1-l3-c3',
            type: 'sort_sequence',
            question: 'Arrange the counting steps correctly.',
            correctOrder: ['Count 1', 'Count 2', 'Count 3', 'Count 4'],
            steps: [{id: 's1', text: 'Count 4'}, {id: 's2', text: 'Count 1'}, {id: 's3', text: 'Count 3'}, {id: 's4', text: 'Count 2'}],
            explanation: 'Counting must follow a fixed order.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'math-m2',
    title: 'Addition & Subtraction',
    description: 'Solve simple sums and differences using smart thinking and number tricks.',
    difficulty: 'Easy',
    lessons: [
      {
        id: 'math-m2-l1',
        title: 'Sum Sprint',
        description: 'Add small numbers quickly and confidently.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm2-l1-c1',
            type: 'fill_in_blank',
            question: 'Quick Addition',
            sentence: '5 + 2 = ___.',
            options: ['7', '6', '8'],
            correctAnswer: '7',
            explanation: 'Adding means combining amounts.',
            xpValue: 30
          },
          {
            id: 'm2-l1-c2',
            type: 'match_pairs',
            question: 'Match the equation to the answer!',
            pairs: [{ left: '1 + 3', right: '4' }, { left: '2 + 5', right: '7' }, { left: '6 + 1', right: '7' }],
            explanation: 'Every addition problem has one correct total.',
            xpValue: 30
          },
          {
            id: 'm2-l1-c3',
            type: 'scenario_quest',
            question: 'Fruit Counter',
            scenario: 'You found 4 apples and picked 3 more. Now you want to know how many apples you have.',
            studentRole: 'Fruit Counter',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '7 apples', consequence: 'Nice! You combined both groups correctly. 🍎', is_best: true, explanation: 'Addition joins groups together.' },
              { id: 'opt2', text: '1 apple', consequence: 'That is too small.', is_best: false, explanation: 'Addition joins groups together.' },
              { id: 'opt3', text: '12 apples', consequence: 'That is too large.', is_best: false, explanation: 'Addition joins groups together.' }
            ],
            explanation: 'Addition joins groups together.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m2-l2',
        title: 'Subtract Shop',
        description: 'Learn how to take away and find what remains.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm2-l2-c1',
            type: 'sort_sequence',
            question: 'Put the subtraction steps in order.',
            correctOrder: ['Start with the total', 'Take away items', 'Count what remains', 'Check the answer'],
            steps: [{id: 's1', text: 'Count what remains'}, {id: 's2', text: 'Start with the total'}, {id: 's3', text: 'Check the answer'}, {id: 's4', text: 'Take away items'}],
            explanation: 'Subtraction follows a clear process.',
            xpValue: 30
          },
          {
            id: 'm2-l2-c2',
            type: 'fill_in_blank',
            question: 'Quick Subtraction',
            sentence: '9 - 4 = ___.',
            options: ['5', '6', '4'],
            correctAnswer: '5',
            explanation: 'Taking 4 away from 9 leaves 5.',
            xpValue: 30
          },
          {
            id: 'm2-l2-c3',
            type: 'drag_and_drop',
            question: 'Sort the numbers into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Answer to 8 - 3' }, { id: 'b2', label: 'Answer to 10 - 2' }],
            items: [
              { id: 'i1', text: '5', correct_bucket: 'b1' },
              { id: 'i2', text: '8', correct_bucket: 'b2' },
              { id: 'i3', text: '6', correct_bucket: 'none' },
              { id: 'i4', text: '4', correct_bucket: 'none' }
            ],
            explanation: 'Each subtraction problem has a matching result.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m2-l3',
        title: 'Balance Battle',
        description: 'Compare addition and subtraction in small stories.',
        type: 'concept',
        difficulty: 'Easy',
        xpReward: 100,
        challenges: [
          {
            id: 'm2-l3-c1',
            type: 'match_pairs',
            question: 'Match the story to the equation.',
            pairs: [{ left: '2 birds join 3 birds', right: '2 + 3 = 5' }, { left: '6 cookies shared, 2 eaten', right: '6 - 2 = 4' }, { left: '4 stars and 1 more', right: '4 + 1 = 5' }],
            explanation: 'Word problems can be turned into equations.',
            xpValue: 30
          },
          {
            id: 'm2-l3-c2',
            type: 'scenario_quest',
            question: 'Score Keeper',
            scenario: 'A game gives you 10 points. You lose 3 points after a mistake.',
            studentRole: 'Score Keeper',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '7 points left', consequence: 'Correct! You subtracted properly. 🎯', is_best: true, explanation: 'Subtraction shows how much is left after taking away.' },
              { id: 'opt2', text: '13 points left', consequence: 'That would be adding, not subtracting.', is_best: false, explanation: 'Subtraction shows how much is left after taking away.' },
              { id: 'opt3', text: '3 points left', consequence: 'Too low.', is_best: false, explanation: 'Subtraction shows how much is left after taking away.' }
            ],
            explanation: 'Subtraction shows how much is left after taking away.',
            xpValue: 40
          },
          {
            id: 'm2-l3-c3',
            type: 'fill_in_blank',
            question: 'Zero Property',
            sentence: 'If you add 0 to a number, the number stays ___.',
            options: ['the same', 'bigger', 'smaller'],
            correctAnswer: 'the same',
            explanation: 'Zero does not change a number when added.',
            xpValue: 30
          }
        ]
      }
    ]
  },
  {
    id: 'math-m3',
    title: 'Multiplication & Division',
    description: 'Explore equal groups, sharing, and repeated addition.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'math-m3-l1',
        title: 'Equal Groups Grove',
        description: 'Understand multiplication as repeated addition.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 'm3-l1-c1',
            type: 'match_pairs',
            question: 'Match the group story to the multiplication equation!',
            pairs: [{ left: '3 groups of 2', right: '3 × 2' }, { left: '4 groups of 5', right: '4 × 5' }, { left: '2 groups of 3', right: '2 × 3' }],
            explanation: 'Multiplication tells us how many in equal groups.',
            xpValue: 40
          },
          {
            id: 'm3-l1-c2',
            type: 'fill_in_blank',
            question: 'Multiplication',
            sentence: '3 × 4 = ___.',
            options: ['12', '7', '10'],
            correctAnswer: '12',
            explanation: '3 groups of 4 make 12.',
            xpValue: 40
          },
          {
            id: 'm3-l1-c3',
            type: 'scenario_quest',
            question: 'Bakery Helper',
            scenario: 'A bakery packs cupcakes into boxes. Each box has 2 cupcakes, and there are 5 boxes.',
            studentRole: 'Bakery Helper',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '10 cupcakes total', consequence: 'Great! You counted equal groups correctly. 🧁', is_best: true, explanation: 'Multiplication is quick counting of equal groups.' },
              { id: 'opt2', text: '7 cupcakes total', consequence: 'Too few.', is_best: false, explanation: 'Multiplication is quick counting of equal groups.' },
              { id: 'opt3', text: '25 cupcakes total', consequence: 'Too many.', is_best: false, explanation: 'Multiplication is quick counting of equal groups.' }
            ],
            explanation: 'Multiplication is quick counting of equal groups.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m3-l2',
        title: 'Sharing Station',
        description: 'Learn division as sharing equally.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 'm3-l2-c1',
            type: 'sort_sequence',
            question: 'Put the sharing steps in order.',
            correctOrder: ['Count items', 'Split into equal groups', 'Check each group', 'See what is left'],
            steps: [{id: 's1', text: 'Check each group'}, {id: 's2', text: 'See what is left'}, {id: 's3', text: 'Count items'}, {id: 's4', text: 'Split into equal groups'}],
            explanation: 'Division helps us share fairly.',
            xpValue: 40
          },
          {
            id: 'm3-l2-c2',
            type: 'fill_in_blank',
            question: 'Division',
            sentence: '12 ÷ 3 = ___.',
            options: ['4', '3', '6'],
            correctAnswer: '4',
            explanation: '12 shared into 3 equal groups gives 4 in each group.',
            xpValue: 40
          },
          {
            id: 'm3-l2-c3',
            type: 'drag_and_drop',
            question: 'Sort the problems into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Multiplication' }, { id: 'b2', label: 'Division' }],
            items: [
              { id: 'i1', text: '4 × 2', correct_bucket: 'b1' },
              { id: 'i2', text: '8 ÷ 2', correct_bucket: 'b2' },
              { id: 'i3', text: '3 × 5', correct_bucket: 'b1' },
              { id: 'i4', text: '9 ÷ 3', correct_bucket: 'b2' }
            ],
            explanation: 'Multiplication makes groups, division splits groups.',
            xpValue: 40
          }
        ]
      },
      {
        id: 'math-m3-l3',
        title: 'Pattern Power',
        description: 'Use number patterns to solve multiplication and division faster.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 120,
        challenges: [
          {
            id: 'm3-l3-c1',
            type: 'scenario_quest',
            question: 'Pattern Finder',
            scenario: 'You notice that 2, 4, 6, 8 is a pattern. You want to predict the next number.',
            studentRole: 'Pattern Finder',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '10', consequence: 'Yes! The pattern adds 2 each time. 🔢', is_best: true, explanation: 'Patterns help us see multiplication by 2.' },
              { id: 'opt2', text: '9', consequence: 'Close, but not the pattern.', is_best: false, explanation: 'Patterns help us see multiplication by 2.' },
              { id: 'opt3', text: '12', consequence: 'That skips the next step.', is_best: false, explanation: 'Patterns help us see multiplication by 2.' }
            ],
            explanation: 'Patterns help us see multiplication by 2.',
            xpValue: 40
          },
          {
            id: 'm3-l3-c2',
            type: 'match_pairs',
            question: 'Match the repeated addition to the multiplication fact.',
            pairs: [{ left: '2 + 2 + 2', right: '3 × 2' }, { left: '5 + 5', right: '2 × 5' }, { left: '4 + 4 + 4 + 4', right: '4 × 4' }],
            explanation: 'Repeated addition and multiplication are connected.',
            xpValue: 40
          },
          {
            id: 'm3-l3-c3',
            type: 'fill_in_blank',
            question: 'Cookies',
            sentence: 'If 6 cookies are shared equally among 2 kids, each kid gets ___.',
            options: ['3', '2', '4'],
            correctAnswer: '3',
            explanation: '6 ÷ 2 = 3.',
            xpValue: 40
          }
        ]
      }
    ]
  },
  {
    id: 'math-m4',
    title: 'Fractions & Decimals',
    description: 'Learn to split wholes and read numbers between whole numbers.',
    difficulty: 'Medium',
    lessons: [
      {
        id: 'math-m4-l1',
        title: 'Fraction Forest',
        description: 'Understand parts of a whole.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 'm4-l1-c1',
            type: 'match_pairs',
            question: 'Match the fraction to its meaning!',
            pairs: [{ left: '1/2', right: 'One out of two equal parts' }, { left: '1/4', right: 'One out of four equal parts' }, { left: '3/4', right: 'Three out of four equal parts' }],
            explanation: 'The top number tells parts taken, and the bottom tells total equal parts.',
            xpValue: 43
          },
          {
            id: 'm4-l1-c2',
            type: 'fill_in_blank',
            question: 'Pizza Leftovers',
            sentence: 'If a pizza is cut into 4 equal slices and you eat 1 slice, you ate ___.',
            options: ['1/4', '1/2', '3/4'],
            correctAnswer: '1/4',
            explanation: 'One slice out of four equal slices is one-fourth.',
            xpValue: 43
          },
          {
            id: 'm4-l1-c3',
            type: 'scenario_quest',
            question: 'Sharing Friend',
            scenario: 'You are sharing a chocolate bar with 2 friends. The bar is divided into 3 equal parts, and you take 1 part.',
            studentRole: 'Sharing Friend',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: '1/3', consequence: 'Correct! You took one out of three equal parts. 🍫', is_best: true, explanation: 'Fractions show equal parts of a whole.' },
              { id: 'opt2', text: '1/2', consequence: 'That would mean two equal parts total.', is_best: false, explanation: 'Fractions show equal parts of a whole.' },
              { id: 'opt3', text: '2/3', consequence: 'That is more than you took.', is_best: false, explanation: 'Fractions show equal parts of a whole.' }
            ],
            explanation: 'Fractions show equal parts of a whole.',
            xpValue: 44
          }
        ]
      },
      {
        id: 'math-m4-l2',
        title: 'Decimal Dock',
        description: 'Read decimals as tenths and hundredths.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 'm4-l2-c1',
            type: 'sort_sequence',
            question: 'Put these numbers in order from smallest to biggest.',
            correctOrder: ['0.2', '0.5', '0.7', '1.0'],
            steps: [{id: 's1', text: '0.7'}, {id: 's2', text: '0.2'}, {id: 's3', text: '1.0'}, {id: 's4', text: '0.5'}],
            explanation: 'Decimals can be compared just like whole numbers.',
            xpValue: 43
          },
          {
            id: 'm4-l2-c2',
            type: 'fill_in_blank',
            question: 'Decimals',
            sentence: '0.5 is the same as ___.',
            options: ['1/2', '1/4', '1/5'],
            correctAnswer: '1/2',
            explanation: 'Half can be written as 0.5.',
            xpValue: 43
          },
          {
            id: 'm4-l2-c3',
            type: 'drag_and_drop',
            question: 'Sort the numbers into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Less than 1' }, { id: 'b2', label: 'Equal to 1' }],
            items: [
              { id: 'i1', text: '0.3', correct_bucket: 'b1' },
              { id: 'i2', text: '0.9', correct_bucket: 'b1' },
              { id: 'i3', text: '1.0', correct_bucket: 'b2' },
              { id: 'i4', text: '0.7', correct_bucket: 'b1' }
            ],
            explanation: 'Decimals help us measure amounts between whole numbers.',
            xpValue: 44
          }
        ]
      },
      {
        id: 'math-m4-l3',
        title: 'Fraction Fusion',
        description: 'Compare simple fractions and decimals.',
        type: 'concept',
        difficulty: 'Medium',
        xpReward: 130,
        challenges: [
          {
            id: 'm4-l3-c1',
            type: 'match_pairs',
            question: 'Match the equivalent values.',
            pairs: [{ left: '1/2', right: '0.5' }, { left: '1/4', right: '0.25' }, { left: '3/4', right: '0.75' }],
            explanation: 'Fractions and decimals can show the same value.',
            xpValue: 43
          },
          {
            id: 'm4-l3-c2',
            type: 'scenario_quest',
            question: 'Bottle Checker',
            scenario: 'A juice bottle is 1/2 full. Your friend says it is 0.25 full.',
            studentRole: 'Bottle Checker',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'That is wrong because 1/2 = 0.5', consequence: 'Correct! Half means 0.5. 🧃', is_best: true, explanation: 'Learning equivalence makes fractions easier.' },
              { id: 'opt2', text: 'That is correct', consequence: 'No, 0.25 means one-fourth.', is_best: false, explanation: 'Learning equivalence makes fractions easier.' },
              { id: 'opt3', text: 'Both are equal', consequence: 'They are not equal.', is_best: false, explanation: 'Learning equivalence makes fractions easier.' }
            ],
            explanation: 'Learning equivalence makes fractions easier.',
            xpValue: 43
          },
          {
            id: 'm4-l3-c3',
            type: 'fill_in_blank',
            question: 'Comparing',
            sentence: '3/4 is greater than 1/4 because it has ___ parts out of the same whole.',
            options: ['more', 'fewer', 'zero'],
            correctAnswer: 'more',
            explanation: 'When the bottom number is the same, the larger top number is bigger.',
            xpValue: 44
          }
        ]
      }
    ]
  },
  {
    id: 'math-m5',
    title: 'Basic Geometry',
    description: 'Discover shapes, angles, lines, and simple spatial ideas.',
    difficulty: 'Hard',
    lessons: [
      {
        id: 'math-m5-l1',
        title: 'Shape Safari',
        description: 'Identify common 2D shapes by their sides and corners.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 'm5-l1-c1',
            type: 'match_pairs',
            question: 'Match the shape to its description!',
            pairs: [{ left: 'Triangle', right: '3 sides' }, { left: 'Square', right: '4 equal sides' }, { left: 'Circle', right: 'No sides' }],
            explanation: 'Shapes are recognized by sides and corners.',
            xpValue: 50
          },
          {
            id: 'm5-l1-c2',
            type: 'fill_in_blank',
            question: 'Squares',
            sentence: 'A square has ___ sides.',
            options: ['4', '3', '5'],
            correctAnswer: '4',
            explanation: 'Squares always have 4 equal sides.',
            xpValue: 50
          },
          {
            id: 'm5-l1-c3',
            type: 'scenario_quest',
            question: 'Shape Builder',
            scenario: 'You are building a sign for a park. The sign has 3 sides and 3 corners.',
            studentRole: 'Shape Builder',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'Triangle', consequence: 'Yes! That shape has 3 sides and 3 corners. ✨', is_best: true, explanation: 'Shapes can be identified by their features.' },
              { id: 'opt2', text: 'Square', consequence: 'A square has 4 sides.', is_best: false, explanation: 'Shapes can be identified by their features.' },
              { id: 'opt3', text: 'Circle', consequence: 'A circle has no corners.', is_best: false, explanation: 'Shapes can be identified by their features.' }
            ],
            explanation: 'Shapes can be identified by their features.',
            xpValue: 50
          }
        ]
      },
      {
        id: 'math-m5-l2',
        title: 'Line Land',
        description: 'Learn about lines, corners, and simple angles.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 'm5-l2-c1',
            type: 'sort_sequence',
            question: 'Arrange the angle sizes from smallest to biggest.',
            correctOrder: ['Acute', 'Right', 'Obtuse', 'Straight'],
            steps: [{id: 's1', text: 'Straight'}, {id: 's2', text: 'Right'}, {id: 's3', text: 'Acute'}, {id: 's4', text: 'Obtuse'}],
            explanation: 'Angles can be compared by their opening size.',
            xpValue: 50
          },
          {
            id: 'm5-l2-c2',
            type: 'drag_and_drop',
            question: 'Sort the items into the correct bucket.',
            buckets: [{ id: 'b1', label: 'Curved' }, { id: 'b2', label: 'Straight' }],
            items: [
              { id: 'i1', text: 'Circle edge', correct_bucket: 'b1' },
              { id: 'i2', text: 'Line segment', correct_bucket: 'b2' },
              { id: 'i3', text: 'Square side', correct_bucket: 'b2' },
              { id: 'i4', text: 'Arc', correct_bucket: 'b1' }
            ],
            explanation: 'Geometry includes both curved and straight parts.',
            xpValue: 50
          },
          {
            id: 'm5-l2-c3',
            type: 'fill_in_blank',
            question: 'Angles',
            sentence: 'A right angle looks like the corner of a ___.',
            options: ['book', 'circle', 'oval'],
            correctAnswer: 'book',
            explanation: 'A book corner makes a right angle shape.',
            xpValue: 50
          }
        ]
      },
      {
        id: 'math-m5-l3',
        title: 'Space & Shape Quest',
        description: 'Use geometry to understand position and movement.',
        type: 'concept',
        difficulty: 'Hard',
        xpReward: 150,
        challenges: [
          {
            id: 'm5-l3-c1',
            type: 'scenario_quest',
            question: 'Robot Navigator',
            scenario: 'A robot moves one step forward, then turns right, then moves again.',
            studentRole: 'Robot Navigator',
            decisionPrompt: 'Select your answer:',
            scenarioOptions: [
              { id: 'opt1', text: 'The robot changed direction using turns', consequence: 'Great! You understood movement and direction. 🤖', is_best: true, explanation: 'Geometry also helps us understand turns and direction.' },
              { id: 'opt2', text: 'The robot stayed in one place', consequence: 'It moved!', is_best: false, explanation: 'Geometry also helps us understand turns and direction.' },
              { id: 'opt3', text: 'The robot became a circle', consequence: 'That is not about movement.', is_best: false, explanation: 'Geometry also helps us understand turns and direction.' }
            ],
            explanation: 'Geometry also helps us understand turns and direction.',
            xpValue: 50
          },
          {
            id: 'm5-l3-c2',
            type: 'match_pairs',
            question: 'Match the object to the shape it looks like.',
            pairs: [{ left: 'Clock', right: 'Circle' }, { left: 'Window', right: 'Rectangle' }, { left: 'Dice face', right: 'Square' }],
            explanation: 'Real objects often match simple geometric shapes.',
            xpValue: 50
          },
          {
            id: 'm5-l3-c3',
            type: 'fill_in_blank',
            question: 'Basic Shapes',
            sentence: 'A shape with 4 equal sides and 4 corners is a ___.',
            options: ['square', 'triangle', 'circle'],
            correctAnswer: 'square',
            explanation: 'A square has equal sides and corners.',
            xpValue: 50
          }
        ]
      }
    ]
  }
];
