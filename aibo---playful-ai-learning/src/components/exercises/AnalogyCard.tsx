import { motion } from 'motion/react';

interface AnalogyCardProps {
  analogy: { text: string; options: string[] };
  correctAnswer: string;
  onSelect: (option: string) => void;
  selectedOption: string | null;
  isChecked: boolean;
  isCorrect: boolean;
}

export default function AnalogyCard({
  analogy,
  correctAnswer,
  onSelect,
  selectedOption,
  isChecked,
  isCorrect
}: AnalogyCardProps) {
  // Split text to insert the selected option or blank
  const parts = analogy.text.split('[BLANK]');

  return (
    <div className="space-y-8">
      <div className="bg-aibo-blue-50 border-2 border-aibo-blue-200 rounded-3xl p-8 text-center shadow-inner">
        <p className="font-display font-bold text-2xl leading-relaxed text-gray-700">
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
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {analogy.options.map((option) => {
          const isThisSelected = option === selectedOption;
          const isThisCorrect = option === correctAnswer;

          let stateClasses = 'hover:bg-gray-50';
          if (isThisSelected) stateClasses = 'card-3d-selected';
          if (isChecked) {
            if (isThisCorrect) {
              stateClasses = 'border-duo-green bg-green-50 shadow-[0_4px_0_#58A700]';
            } else if (isThisSelected && !isCorrect) {
              stateClasses = 'border-aibo-red-500 bg-red-50 shadow-[0_4px_0_#8C1A1A] opacity-50';
            } else {
              stateClasses = 'opacity-30';
            }
          }

          return (
            <motion.button
              key={option}
              disabled={isChecked}
              onClick={() => onSelect(option)}
              whileTap={!isChecked ? { scale: 0.98 } : {}}
              animate={
                isChecked 
                  ? isThisCorrect 
                    ? { scale: [1, 1.02, 1] } 
                    : isThisSelected && !isCorrect 
                      ? { x: [-4, 4, -4, 4, 0] } 
                      : {}
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`card-3d text-center font-display font-bold text-lg p-6 transition-opacity duration-300 ${stateClasses}`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
