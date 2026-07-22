function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const BERRIES = Array.from({ length: 15 }).map((_, i) => {
  const seed = i + 1;

  return {
    id: i,
    left: pseudoRandom(seed) * 100,
    animationDuration: 10 + pseudoRandom(seed + 20) * 15,
    animationDelay: pseudoRandom(seed + 40) * -20,
    size: 1.5 + pseudoRandom(seed + 60) * 2,
    rotation: -30 + pseudoRandom(seed + 80) * 60,
  };
});

export default function FloatingStrawberries() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BERRIES.map((berry) => (
        <div
          key={berry.id}
          className="floating-strawberry"
          style={{
            "--berry-left": `${berry.left}%`,
            "--berry-size": `${berry.size}rem`,
            "--berry-duration": `${berry.animationDuration}s`,
            "--berry-delay": `${berry.animationDelay}s`,
            "--berry-rotation": `${berry.rotation}deg`,
          }}
        >
          🍓
        </div>
      ))}
    </div>
  );
}
