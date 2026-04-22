import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  id: string;
  text: string;
  consequence: string;
  is_best: boolean;
  explanation: string;
}

interface ScenarioQuestProps {
  scenario: string;
  studentRole: string;
  decisionPrompt: string;
  options: Option[];
  onSelect: (option: Option) => void;
  selectedOption: Option | null;
  isChecked: boolean;
}

export default function ScenarioQuest({
  scenario,
  studentRole,
  decisionPrompt,
  options,
  onSelect,
  selectedOption,
  isChecked
}: ScenarioQuestProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="inline-block px-3 py-1 bg-aibo-blue-100 text-aibo-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          Role: {studentRole}
        </div>
        <p className="font-display font-bold text-gray-700 leading-relaxed mb-4">
          {scenario}
        </p>
        <div className="h-0.5 bg-gray-50 w-full mb-4" />
        <p className="font-display font-black text-aibo-blue-500 italic">
          {decisionPrompt}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const isThisSelected = selectedOption?.id === option.id;

          return (
            <motion.button
              key={option.id}
              disabled={isChecked}
              onClick={() => onSelect(option)}
              whileTap={!isChecked ? { scale: 0.98 } : {}}
              animate={
                isChecked 
                  ? option.is_best 
                    ? { scale: [1, 1.02, 1] } 
                    : isThisSelected && !option.is_best 
                      ? { x: [-4, 4, -4, 4, 0] } 
                      : {}
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`card-3d text-left p-6 transition-opacity duration-300 ${
                isThisSelected ? 'card-3d-selected' : ''
              } ${isChecked ? (option.is_best ? 'border-duo-green bg-green-50 shadow-[0_4px_0_#58A700]' : isThisSelected ? 'border-aibo-red-500 bg-red-50 shadow-[0_4px_0_#8C1A1A] opacity-50' : 'opacity-30') : ''}`}
            >
              <p className="font-display font-bold text-lg">{option.text}</p>
              {isChecked && isThisSelected && (
                <motion.p 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-4 text-sm font-medium text-gray-600 border-t border-gray-100 pt-4"
                >
                  <span className="font-black uppercase text-[10px] tracking-widest block mb-1">Consequence:</span>
                  {option.consequence}
                </motion.p>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
