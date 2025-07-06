// src/components/chip.component.tsx
// src/components/chip.component.tsx
import type { ReactNode } from 'react';

interface ChipProps {
  color?: 'red-light' | 'green-light' | 'red' | 'white' | 'blue' | 'yellow';
  children: ReactNode;
}

const colorMap: Record<string, string> = {
  'green-light': 'bg-emerald-400 text-white font-bold',
  'red-light': 'bg-red-300 text-white font-bold',
  red: 'bg-red-500 text-white font-bold',
  white: 'bg-white text-black font-normal',
  blue: 'bg-blue-500 text-white font-bold',
  yellow: 'bg-yellow-400 text-white font-bold',
};

const Chip = ({ color = 'green-light', children }: ChipProps) => {
  return (
    <span
      className={`inline-block w-fit px-3 py-[2px] text-[12px] rounded-full text-center leading-tight ${colorMap[color]}`}
    >
      {children}
    </span>
  );
};

export default Chip;
