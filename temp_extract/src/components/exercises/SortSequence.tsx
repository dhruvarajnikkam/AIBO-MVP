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
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isChecked 
                  ? isCorrectPos 
                    ? 'bg-duo-green text-white shadow-[0_4px_0_#58A700]' 
                    : 'bg-aibo-red-500 text-white shadow-[0_4px_0_#8C1A1A]'
                  : 'bg-white border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0] cursor-grab active:cursor-grabbing active:translate-y-0.5 active:shadow-[0_2px_0_#e2e8f0]'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-display font-black text-sm ${isChecked ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {index + 1}
              </div>
              <p className={`flex-1 font-display font-bold ${isChecked ? 'text-white' : 'text-slate-700'}`}>{item.text}</p>
              {!isChecked && <GripVertical className="w-5 h-5 text-slate-300" />}
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
