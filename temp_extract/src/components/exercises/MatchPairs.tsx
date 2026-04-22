import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Pair {
  left: string;
  right: string;
}

interface MatchPairsProps {
  pairs: Pair[];
  isChecked: boolean;
  onSelect: (isComplete: boolean) => void;
}

export default function MatchPairs({ pairs, isChecked, onSelect }: MatchPairsProps) {
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [failedLeft, setFailedLeft] = useState<string[]>([]);
  const [failedRight, setFailedRight] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);

  useEffect(() => {
    setShuffledRight([...pairs.map(p => p.right)].sort(() => Math.random() - 0.5));
  }, [pairs]);

  const handleLeftClick = (val: string) => {
    if (isChecked || matched.includes(val) || failedLeft.includes(val)) return;
    setLeftSelected(val);
    if (rightSelected) {
      checkMatch(val, rightSelected);
    }
  };

  const handleRightClick = (val: string) => {
    if (isChecked || matched.some(l => pairs.find(p => p.left === l)?.right === val) || failedRight.includes(val)) return;
    setRightSelected(val);
    if (leftSelected) {
      checkMatch(leftSelected, val);
    }
  };

  const checkMatch = (left: string, right: string) => {
    const pair = pairs.find(p => p.left === left);
    if (pair && pair.right === right) {
      const newMatched = [...matched, left];
      setMatched(newMatched);
      setLeftSelected(null);
      setRightSelected(null);
      if (newMatched.length + failedLeft.length === pairs.length) {
        onSelect(true);
      }
    } else {
      // Mark as failed - one time answer
      setFailedLeft(prev => [...prev, left]);
      setFailedRight(prev => [...prev, right]);
      setLeftSelected(null);
      setRightSelected(null);
      if (matched.length + failedLeft.length + 1 === pairs.length) {
        onSelect(true);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        {pairs.map((pair) => (
          <motion.button
            key={pair.left}
            onClick={() => handleLeftClick(pair.left)}
            className={`w-full p-4 rounded-2xl font-display font-bold text-sm border-2 transition-all duration-200 ${
              matched.includes(pair.left)
                ? 'bg-green-50 border-duo-green text-duo-green opacity-50'
                : failedLeft.includes(pair.left)
                  ? 'bg-red-50 border-red-400 text-red-600 opacity-50 cursor-not-allowed'
                  : leftSelected === pair.left
                    ? 'bg-aibo-blue-50 border-aibo-blue-400 text-aibo-blue-600'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {pair.left}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        {shuffledRight.map((val) => {
          const isMatched = matched.some(l => pairs.find(p => p.left === l)?.right === val);
          const isFailed = failedRight.includes(val);
          return (
            <motion.button
              key={val}
              onClick={() => handleRightClick(val)}
              className={`w-full p-4 rounded-2xl font-display font-bold text-sm border-2 transition-all duration-200 ${
                isMatched
                  ? 'bg-green-50 border-duo-green text-duo-green opacity-50'
                  : isFailed
                    ? 'bg-red-50 border-red-400 text-red-600 opacity-50 cursor-not-allowed'
                    : rightSelected === val
                      ? 'bg-aibo-blue-50 border-aibo-blue-400 text-aibo-blue-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {val}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
