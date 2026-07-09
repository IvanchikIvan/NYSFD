import React, { memo, useMemo } from "react";
import Section from "../components/Section";
import photo1 from '../assets/1.jpg'
import photo2 from '../assets/2.jpg'
// ... (оставьте остальные импорты фото без изменений) ...

const DEFAULT_IMAGES = [
  { src: photo1, alt: "Carousel photo 1" },
  { src: photo2, alt: "Carousel photo 2" },
  // ...
];

const PhotoCarouselSection = memo(function PhotoCarouselSection({
  id,
  sectionRef,
  images = DEFAULT_IMAGES,
  speedSeconds = 45, // Чуть замедлил для романтики
  itemWidth = 280,
  itemHeight = 350,
  gap = 24,
}) {
  const doubled = useMemo(() => [...images, ...images], [images]);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#050505] z-10"
    >
      <div className="w-full max-w-7xl flex flex-col items-center py-12">
        
        {/* Заголовок */}
        <div className="text-center mb-16 z-20 px-4">
          <h2 
            className="mb-4 font-normal"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.02em"
            }}
          >
            Радость моя
          </h2>
          <p 
            className="italic text-white/50"
            style={{
              fontFamily: "'Crimson Text', 'Georgia', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              letterSpacing: "0.03em",
            }}
          >
            Я бесконечно тобой дорожу
          </p>
        </div>

        {/* Карусель (без тяжелых фонов) */}
        <div
          className="relative w-full overflow-hidden flex items-center"
          style={{
            "--duration": `${speedSeconds}s`,
            "--gap": `${gap}px`,
          }}
        >
          {/* Градиентные маски по краям для плавного растворения фото */}
          <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="flex w-fit will-change-transform animate-[marquee_var(--duration)_linear_infinite] hover:[animation-play-state:paused]" style={{ gap: 'var(--gap)' }}>
            {doubled.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="flex-shrink-0 transition-transform duration-700 ease-out hover:scale-105"
                style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/5"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Финальная фраза */}
        <div className="mt-20 text-center z-20">
          <p 
            className="font-light tracking-widest text-white/70 uppercase text-sm sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.3em" }}
          >
            Ты прекрасна
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4" />
        </div>

      </div>
    </Section>
  );
});

export default PhotoCarouselSection;