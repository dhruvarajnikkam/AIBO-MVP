import { motion } from 'motion/react';

interface FillInBlankProps {
  sentence: string;
  options: string[];
  correctAnswer: string;
  onSelect: (option: string) => void;
  selectedOption: string | null;
  isChecked: boolean;
  isCorrect: boolean;
}

export default function FillInBlank({
  sentence,
  options,
  correctAnswer,
  onSelect,
  selectedOption,
  isChecked,
  isCorrect
}: FillInBlankProps) {
  const parts = sentence.split('[BLANK]');

  return (
    <div className="space-y-12">
      <div className="text-2xl font-display font-bold leading-relaxed text-gray-700 text-center px-4">
        {parts[0]}
        <span className={`inline-block px-4 py-1 mx-2 border-b-4 min-w-[120px] transition-all duration-300 ${
          isChecked 
            ? isCorrect 
              ? 'text-duo-green border-duo-green' 
              : 'text-aibo-red-500 border-aibo-red-500'
            : selectedOption 
              ? 'text-aibo-blue-500 border-aibo-blue-500' 
              : 'text-gray-300 border-gray-200'
        }`}>
          {typeof selectedOption === 'string' ? selectedOption : '_______'}
        </span>
        {parts[1]}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {options.map((option) => {
          const isThisSelected = option === selectedOption;
          const isThisCorrect = option === correctAnswer;

          let stateClasses = isThisSelected 
            ? 'bg-aibo-blue-500 text-white shadow-[0_4px_0_#0077B6]' 
            : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 shadow-[0_4px_0_#E5E7EB]';

          if (isChecked) {
            if (isThisCorrect) {
              stateClasses = 'bg-green-500 text-white border-green-600 shadow-[0_4px_0_#58A700]';
            } else if (isThisSelected && !isCorrect) {
              stateClasses = 'bg-aibo-red-500 text-white border-aibo-red-600 shadow-[0_4px_0_#8C1A1A] opacity-50';
            } else {
              stateClasses = 'opacity-30 bg-white border-2 border-gray-200 text-gray-700';
            }
          }

          return (
            <motion.button
              key={option}
              disabled={isChecked}
              onClick={() => onSelect(option)}
              whileTap={!isChecked ? { scale: 0.95 } : {}}
              animate={
                isChecked 
                  ? isThisCorrect 
                    ? { scale: [1, 1.05, 1] } 
                    : isThisSelected && !isCorrect 
                      ? { x: [-4, 4, -4, 4, 0] } 
                      : {}
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`px-6 py-3 rounded-2xl font-display font-bold text-lg shadow-sm transition-all duration-300 ${stateClasses}`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
