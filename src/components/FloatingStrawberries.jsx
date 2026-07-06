import React, { useMemo } from 'react';

export default function FloatingStrawberries() {
  const berries = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = 10 + Math.random() * 15;
      const animationDelay = Math.random() * -20;
      const size = 1.5 + Math.random() * 2;
      const rotation = -30 + Math.random() * 60;
      
      return { id: i, left, animationDuration, animationDelay, size, rotation };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {berries.map((berry) => (
        <div
          key={berry.id}
          className="absolute bottom-[-10%] flex items-center justify-center opacity-90"
          style={{
            left: `${berry.left}%`,
            fontSize: `${berry.size}rem`,
            animation: `floatUp ${berry.animationDuration}s linear infinite`,
            animationDelay: `${berry.animationDelay}s`,
            transform: `rotate(${berry.rotation}deg)`,
            filter: 'drop-shadow(0 4px 12px rgba(255, 42, 95, 0.4))'
          }}
        >
          🍓
        </div>
      ))}
    </div>
  );
}