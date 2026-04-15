import { useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../../lib/sounds';

interface Bucket {
  id: string;
  label: string;
}

interface Item {
  id: string;
  text: string;
  correct_bucket: string;
}

interface DragAndDropProps {
  buckets: Bucket[];
  items: Item[];
  isChecked: boolean;
  onSelect: (assignments: { [itemId: string]: string }) => void;
}

const DraggableItem = memo(({ item, isChecked, isAssigned, bucketId, onDragEnd, onClick, containerRef }: {
  item: Item;
  isChecked: boolean;
  isAssigned: boolean;
  bucketId?: string;
  onDragEnd: (itemId: string, info: any) => void;
  onClick?: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <motion.div
      layoutId={item.id}
      drag={!isChecked}
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragSnapToOrigin={true}
      onDragEnd={(_, info) => onDragEnd(item.id, info)}
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
      whileHover={!isChecked ? { scale: 1.05, cursor: 'grab' } : {}}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-display font-black text-sm shadow-sm transition-all touch-none ${
        isChecked 
          ? item.correct_bucket === bucketId 
            ? 'bg-duo-green text-white shadow-[0_4px_0_#58A700] scale-105' 
            : 'bg-aibo-red-500 text-white shadow-[0_4px_0_#8C1A1A] grayscale-[0.5]'
          : isAssigned
            ? 'bg-white border-2 border-slate-200 text-slate-700 shadow-[0_4px_0_#E2E8F0] active:translate-y-1 active:shadow-none cursor-grab'
            : 'bg-white border-2 border-slate-200 rounded-2xl text-slate-700 shadow-[0_4px_0_#E2E8F0] hover:border-aibo-blue-400 cursor-grab'
      } ${!isAssigned ? 'px-6 py-3' : ''}`}
    >
      {item.text}
    </motion.div>
  );
});

export default function DragAndDrop({ buckets, items, isChecked, onSelect }: DragAndDropProps) {
  const [assignments, setAssignments] = useState<{ [itemId: string]: string }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const bucketRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDragEnd = useCallback((itemId: string, info: any) => {
    if (isChecked) return;

    const { x, y } = info.point;
    let droppedInBucketId = '';

    // Check if dropped inside any bucket with a strict inset
    for (const bucketId in bucketRefs.current) {
      const bucketEl = bucketRefs.current[bucketId];
      if (bucketEl) {
        const rect = bucketEl.getBoundingClientRect();
        const INSET = 5; // Reduced inset for better sensitivity
        if (
          x >= rect.left + INSET &&
          x <= rect.right - INSET &&
          y >= rect.top + INSET &&
          y <= rect.bottom - INSET
        ) {
          droppedInBucketId = bucketId;
          break;
        }
      }
    }

    if (droppedInBucketId) {
      if (assignments[itemId] !== droppedInBucketId) {
        const newAssignments = { ...assignments, [itemId]: droppedInBucketId };
        setAssignments(newAssignments);
        onSelect(newAssignments);
        soundManager.play('click');
      }
    } else {
      // Dropped outside any bucket - if it was assigned, return to pool
      if (assignments[itemId]) {
        const newAssignments = { ...assignments };
        delete newAssignments[itemId];
        setAssignments(newAssignments);
        onSelect(newAssignments);
        soundManager.play('click');
      }
    }
  }, [assignments, isChecked, onSelect]);

  const removeItem = useCallback((itemId: string) => {
    if (isChecked) return;
    const newAssignments = { ...assignments };
    delete newAssignments[itemId];
    setAssignments(newAssignments);
    onSelect(newAssignments);
    soundManager.play('click');
  }, [assignments, isChecked, onSelect]);

  return (
    <div className="space-y-8" ref={containerRef}>
      <div className="grid grid-cols-2 gap-4">
        {buckets.map((bucket) => (
          <div 
            key={bucket.id} 
            ref={el => { bucketRefs.current[bucket.id] = el; }}
            className={`border-4 border-dashed rounded-3xl p-4 min-h-[180px] flex flex-col gap-3 transition-all duration-300 ${
              isChecked 
                ? 'bg-white border-gray-100' 
                : 'bg-slate-50 border-slate-200 hover:border-aibo-blue-300 hover:bg-aibo-blue-50/30'
            }`}
          >
            <h4 className="font-display font-black text-center text-slate-400 uppercase text-[10px] tracking-widest mb-2">
              {bucket.label}
            </h4>
            <div className="flex flex-wrap gap-2 justify-center flex-1">
              <AnimatePresence mode="popLayout">
                {items.filter(item => assignments[item.id] === bucket.id).map(item => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    isChecked={isChecked}
                    isAssigned={true}
                    bucketId={bucket.id}
                    onDragEnd={handleDragEnd}
                    onClick={() => removeItem(item.id)}
                    containerRef={containerRef}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <div className="relative p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-inner min-h-[120px] flex flex-wrap gap-3 justify-center items-center">
        {items.map(item => {
          const isAssigned = !!assignments[item.id];
          return (
            <div key={`pool-slot-${item.id}`} className="relative">
              {/* Fixed Position Placeholder */}
              <div className="px-6 py-3 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-100 text-transparent select-none font-display font-black text-sm">
                {item.text}
              </div>

              <AnimatePresence>
                {!isAssigned && (
                  <div className="absolute inset-0">
                    <DraggableItem
                      item={item}
                      isChecked={isChecked}
                      isAssigned={false}
                      onDragEnd={handleDragEnd}
                      containerRef={containerRef}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center gap-2 text-slate-400">
        <div className="w-8 h-0.5 bg-slate-100" />
        <p className="text-[10px] font-black uppercase tracking-widest">
          Drag items to categories
        </p>
        <div className="w-8 h-0.5 bg-slate-100" />
      </div>
    </div>
  );
}
