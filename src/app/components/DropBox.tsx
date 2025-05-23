'use client';
import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: '400'
});


interface DropItem {
  value: number;
}

interface DropBoxProps {
  onDropValue: (value: number) => void;
  currentValue: number | null;
}

export default function DropBox({ onDropValue, currentValue }: DropBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>(() => ({
    accept: 'number',
    drop: (item: DropItem) => onDropValue(item.value),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className={`w-25 h-15 border-3 transition-all  border-[#227C9D] border-dashed rounded-xl flex items-center justify-center ${
        isOver ? 'bg-[#227C9D] ' : ''
      }`}
    >
      <p className={`${luckiestGuy.variable} text-5xl text-[#227C9D]` } style={{ fontFamily: 'Luckiest Guy' }}>{currentValue !== null ? currentValue : '?' }</p>
    </div>
  );
}
