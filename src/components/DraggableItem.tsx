
'use client'
import { useDrag } from 'react-dnd';
import { useRef } from 'react';
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: '400'
});

interface DraggableItemProps {
  value: number;
}

export default function DraggableItem({ value }: DraggableItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'number',
    item: { value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref); // Conecta o drag ao ref

  return (
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 1 : 1,
          userSelect: 'none',
          fontFamily: 'Luckiest Guy',
        }}
        className={`${luckiestGuy.variable} w-25 shadow-md hover:bg-white border-2 border-[#227C9D] transition-all hover:text-[#227C9D] h-15 rounded-xl text-white text-3xl text-center flex items-center justify-center bg-[#227C9D]/100 cursor-grab`}
      >
        {value}
      </div>
  );
}
