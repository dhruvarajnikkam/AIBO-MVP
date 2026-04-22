import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { soundManager } from '../../lib/sounds';
import { RotateCcw } from 'lucide-react';

interface Chip {
  id: string;
  text: string;
}

interface BuildAConceptProps {
  targetSentence: string;
  chipsCorrect: string[];
  chipsDistractor: string[];
  isChecked: boolean;
  onSelect: (selected: string[]) => void;
}

export default function BuildAConcept({ targetSentence, chipsCorrect, chipsDistractor, isChecked, onSelect }: BuildAConceptProps) {
  const [selectedChips, setSelectedChips] = useState<Chip[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  // Create unique IDs for all chips to handle duplicates and stable keys
  const poolChips = useRef<Chip[]>([...chipsCorrect, ...chipsDistractor].map((text, idx) => ({
    id: `chip-${idx}-${text}`,
    text
  })));

  const handleDragEnd = (chip: Chip, event: any, info: any) => {
    if (isChecked) return;

    const { x, y } = info.point;
    const dropZone = dropZoneRef.current;

    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        if (!selectedChips.find(c => c.id === chip.id)) {
          const newSelected = [...selectedChips, chip];
          setSelectedChips(newSelected);
          onSelect(newSelected.map(c => c.text));
          soundManager.play('click');
        }
      }
    }
  };

  const addChip = (chip: Chip) => {
    if (isChecked) return;
    if (!selectedChips.find(c => c.id === chip.id)) {
      const newSelected = [...selectedChips, chip];
      setSelectedChips(newSelected);
      onSelect(newSelected.map(c => c.text));
      soundManager.play('click');
    }
  };

  const removeChip = (chipId: string) => {
    if (isChecked) return;
    const newSelected = selectedChips.filter(c => c.id !== chipId);
    setSelectedChips(newSelected);
    onSelect(newSelected.map(c => c.text));
    soundManager.play('click');
  };

  const handleReorder = (newOrder: Chip[]) => {
    if (isChecked) return;
    setSelectedChips(newOrder);
    onSelect(newOrder.map(c => c.text));
  };

  const reset = () => {
    if (isChecked) return;
    setSelectedChips([]);
    onSelect([]);
    soundManager.play('click');
  };

  return (
    <div className="space-y-6" ref={containerRef}>
      <div className="flex justify-between items-center px-2">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Your Definition
        </p>
        {!isChecked && selectedChips.length > 0 && (
          <button 
            onClick={reset}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-aibo-blue-500 hover:text-aibo-blue-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div 
        ref={dropZoneRef}
        className={`min-h-[160px] p-6 rounded-3xl border-4 border-dashed transition-all duration-300 relative ${
          isChecked 
            ? 'bg-white border-gray-100' 
            : 'bg-slate-50 border-slate-200 hover:border-aibo-blue-300 hover:bg-aibo-blue-50/30'
        }`}
      >
        <Reorder.Group 
          axis="x" 
          values={selectedChips} 
          onReorder={handleReorder}
          className="flex flex-wrap gap-2 items-center justify-center min-h-[112px]"
        >
          <AnimatePresence mode="popLayout">
            {selectedChips.length === 0 && !isChecked && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400 font-display font-bold italic text-center w-full absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                Drag words here to build the definition...
              </motion.p>
            )}
            {selectedChips.map((chip, index) => {
              const isCorrectPosition = chip.text === chipsCorrect[index];
              return (
                <Reorder.Item
                  key={chip.id}
                  value={chip}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  dragListener={!isChecked}
                  className={`px-4 py-2 rounded-xl font-display font-black text-sm shadow-sm transition-all cursor-grab active:cursor-grabbing select-none ${
                    isChecked 
                      ? isCorrectPosition 
                        ? 'bg-duo-green text-white shadow-[0_4px_0_#58A700]' 
                        : 'bg-aibo-red-500 text-white shadow-[0_4px_0_#8C1A1A]'
                      : 'bg-white border-2 border-aibo-blue-400 text-aibo-blue-600 shadow-[0_4px_0_#3B82F6] active:translate-y-1 active:shadow-none'
                  }`}
                  onClick={() => removeChip(chip.id)}
                >
                  {chip.text}
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
      </div>

      <div className="flex flex-wrap gap-3 justify-center p-4 bg-slate-50/50 rounded-3xl border-2 border-slate-100">
        {poolChips.current.map((chip) => {
          const isSelected = selectedChips.some(c => c.id === chip.id);
          return (
            <div key={`pool-wrapper-${chip.id}`} className="relative">
              {/* Placeholder for selected chips */}
              <div className="px-4 py-2 rounded-xl bg-slate-100 border-2 border-transparent text-transparent select-none">
                {chip.text}
              </div>
              
              {!isSelected && (
                <motion.div
                  layoutId={chip.id}
                  drag={!isChecked}
                  dragConstraints={containerRef}
                  dragElastic={0.1}
                  onDragEnd={(e, info) => handleDragEnd(chip, e, info)}
                  onClick={() => addChip(chip)}
                  whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                  whileHover={{ scale: 1.05, cursor: 'grab' }}
                  className="absolute inset-0 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl font-display font-black text-sm text-slate-700 shadow-[0_4px_0_#E2E8F0] hover:border-aibo-blue-400 transition-colors touch-none flex items-center justify-center cursor-grab"
                >
                  {chip.text}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400">
        <div className="w-8 h-0.5 bg-slate-100" />
        <p className="text-[10px] font-black uppercase tracking-widest">
          Drag words to the box
        </p>
        <div className="w-8 h-0.5 bg-slate-100" />
      </div>
    </div>
  );
}
