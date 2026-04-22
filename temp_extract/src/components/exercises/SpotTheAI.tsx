import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

interface Item {
  id: string;
  text: string;
  has_ai?: boolean;
  explanation?: string;
}

interface SpotTheAIProps {
  items: Item[];
  onSelect: (ids: string[]) => void;
  isChecked: boolean;
}

export default function SpotTheAI({ items, onSelect, isChecked }: SpotTheAIProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (isChecked) return;
    const newIds = selectedIds.includes(id) 
      ? selectedIds.filter(i => i !== id) 
      : [...selectedIds, id];
    setSelectedIds(newIds);
    onSelect(newIds);
  };

  // Notify parent of selection changes for the "Check" button state
  useEffect(() => {
    // In this specific type, we might want to check correctness only when "Check" is clicked
    // But we need to pass the current selection up
  }, [selectedIds]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        const isActuallyAI = item.has_ai;

        let stateClasses = 'hover:bg-gray-50';
        if (isSelected) stateClasses = 'card-3d-selected';
        
        if (isChecked) {
          if (isActuallyAI) {
            stateClasses = 'border-duo-green bg-green-50 shadow-[0_4px_0_#58A700]';
          } else if (isSelected && !isActuallyAI) {
            stateClasses = 'border-aibo-red-500 bg-red-50 shadow-[0_4px_0_#8C1A1A] opacity-50';
          } else {
            stateClasses = 'opacity-30';
          }
        }

        return (
          <motion.button
            key={item.id}
            disabled={isChecked}
            onClick={() => toggleItem(item.id)}
            whileTap={!isChecked ? { scale: 0.95 } : {}}
            animate={
              isChecked 
                ? isActuallyAI 
                  ? { scale: [1, 1.02, 1] } 
                  : isSelected && !isActuallyAI 
                    ? { x: [-4, 4, -4, 4, 0] } 
                    : {}
                : {}
            }
            transition={{ duration: 0.4 }}
            className={`card-3d flex flex-col items-center justify-center text-center p-4 h-40 transition-opacity duration-300 ${stateClasses}`}
          >
            <div className="flex-1 flex items-center justify-center">
              <span className="font-display font-bold text-sm leading-tight">{item.text}</span>
            </div>
            
            {isChecked && (
              <div className="mt-2">
                {isActuallyAI ? (
                  <Check className="w-6 h-6 text-duo-green" />
                ) : isSelected ? (
                  <X className="w-6 h-6 text-aibo-red-500" />
                ) : null}
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
