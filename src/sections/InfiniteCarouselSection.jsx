// src/sections/PhotoCarouselSection.jsx
import React, { memo, useMemo } from "react";
import Section from "../components/Section";
import photo1 from '../assets/1.jpg'
import photo2 from '../assets/2.jpg'
import photo3 from '../assets/3.jpg'
import photo4 from '../assets/4.jpg'
import photo5 from '../assets/5.jpg'
import photo6 from '../assets/6.jpg'
import photo7 from '../assets/7.jpg'
import photo8 from '../assets/8.jpg'
import photo9 from '../assets/9.jpg'
import photo10 from '../assets/10.jpg'
import photo11 from '../assets/11.jpg'
import photo12 from '../assets/12.jpg'
import photo13 from '../assets/13.jpg'

const DEFAULT_IMAGES = [
  { src: photo1, alt: "Carousel photo 1" },
  { src: photo2, alt: "Carousel photo 2" },
  { src: photo3, alt: "Carousel photo 3" },
  { src: photo4, alt: "Carousel photo 4" },
  { src: photo5, alt: "Carousel photo 5" },
  { src: photo6, alt: "Carousel photo 6" },
  { src: photo7, alt: "Carousel photo 7" },
  { src: photo8, alt: "Carousel photo 8" },
  { src: photo9, alt: "Carousel photo 9" },
  { src: photo10, alt: "Carousel photo 10" },
  { src: photo11, alt: "Carousel photo 11" },
  { src: photo12, alt: "Carousel photo 12" },
  { src: photo13, alt: "Carousel photo 13" },
];

const PhotoCarouselSection = memo(function PhotoCarouselSection({
  id,
  sectionRef,
  images = DEFAULT_IMAGES,
  speedSeconds = 35,
  itemWidth = 260,
  itemHeight = 260,
  gap = 16,
}) {
  const doubled = useMemo(() => [...images, ...images], [images]);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell section-shell--carousel flex items-center justify-center"
    >
      <div className="section-card w-full max-w-6xl px-4">
        {/* Заголовок с градиентом и анимацией */}
        <h2 
          className="section-title section-title--carousel mb-3 text-center text-5xl font-bold tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #fff9c4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: '0.05em'
          }}
        >
          Радость моя..
        </h2>

        {/* Подзаголовок с мягким свечением */}
        <p 
          className="mb-8 text-center text-2xl font-light italic"
          style={{
            color: '#ffe4e1',
            textShadow: '0 2px 10px rgba(255, 182, 193, 0.4)',
            fontFamily: "'Crimson Text', 'Georgia', serif",
            letterSpacing: '0.03em',
            lineHeight: '1.6'
          }}
        >
          Я бесконечно тобой дорожу
        </p>

        <div
          className="marquee marquee--carousel"
          style={{
            "--duration": `${speedSeconds}s`,
            "--gap": `${gap}px`,
          }}
          aria-label="Infinite scrolling photos"
        >
          <div className="marquee__track" role="list">
            {doubled.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="marquee__item"
                role="listitem"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-2xl object-cover"
                  width={itemWidth}
                  height={itemHeight}
                  draggable="false"
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        {/* Финальная фраза с элегантным оформлением */}
        <div className="mt-6 text-center">
          <p 
            className="text-4xl font-semibold inline-block relative"
            style={{
              background: 'linear-gradient(90deg, #fff5f5 0%, #ffe4e6 50%, #ffc9d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Playfair Display', 'Georgia', serif",
              letterSpacing: '0.08em',
              textShadow: '0 0 20px rgba(255, 192, 203, 0.3)',
            }}
          >
            Ты прекрасна
            <span 
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #ffc9d0, transparent)',
                opacity: 0.6
              }}
            />
          </p>
        </div>
      </div>
    </Section>
  );
});

export default PhotoCarouselSection;
