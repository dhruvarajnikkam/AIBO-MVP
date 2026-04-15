import { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

interface Step {
  id: string;
  text: string;
}

interface SortSequenceProps {
  steps: Step[];
  correctOrder: string[];
  isChecked: boolean;
  onSelect: (ids: string[]) => void;
}

export default function SortSequence({ steps, correctOrder, isChecked, onSelect }: SortSequenceProps) {
  const [items, setItems] = useState(steps);

  const handleReorder = (newItems: Step[]) => {
    setItems(newItems);
    onSelect(newItems.map(i => i.id));
  };

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map((item, index) => {
          const isCorrectPos = isChecked && item.id === correctOrder[index];

          return (
            <Reorder.Item 
              key={item.id} 
              value={item}
              dragListener={!isChecked}
              className={`flex items-center gap-4 p-4 bg-white border-2 rounded-2xl shadow-sm transition-colors ${
                isChecked 
                  ? isCorrectPos 
                    ? 'border-duo-green bg-green-50' 
                    : 'border-aibo-red-500 bg-red-50'
                  : 'border-gray-200 cursor-grab active:cursor-grabbing'
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-display font-black text-gray-400 text-sm">
                {index + 1}
              </div>
              <p className="flex-1 font-display font-bold text-gray-700">{item.text}</p>
              {!isChecked && <GripVertical className="w-5 h-5 text-gray-300" />}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
      
      {!isChecked && (
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-tighter">
          Drag to reorder the steps
        </p>
      )}
    </div>
  );
}
