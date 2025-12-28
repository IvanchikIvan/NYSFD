// src/sections/PhotoCarouselSection.jsx
import React, { memo, useMemo } from "react";
import Section from "../components/Section";

const DEFAULT_IMAGES = [
  { src: "/carousel/1.jpg", alt: "Carousel photo 1" },
  { src: "/carousel/2.jpg", alt: "Carousel photo 2" },
  { src: "/carousel/3.jpg", alt: "Carousel photo 3" },
  { src: "/carousel/4.jpg", alt: "Carousel photo 4" },
  { src: "/carousel/5.jpg", alt: "Carousel photo 5" },
];

const PhotoCarouselSection = memo(function PhotoCarouselSection({
  id,
  sectionRef,
  images = DEFAULT_IMAGES,
  speedSeconds = 22, // smaller = faster
  itemWidth = 260, // px
  itemHeight = 160, // px
  gap = 16, // px
}) {
  const doubled = useMemo(() => [...images, ...images], [images]);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell flex items-center justify-center"
    >
      <div className="section-card w-full max-w-6xl px-4">
        <h2 className="section-title mb-2 text-center text-2xl font-semibold">
          Infinite photo carousel
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-300/80">
          Мягкая лента воспоминаний, которая никогда не заканчивается.
        </p>

        <div
          className="marquee"
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

          {/* Center vignette for nicer UX */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        <p className="mt-4 text-center text-xs text-zinc-200/60">
          Tip: hover or focus pauses the animation.
        </p>
      </div>
    </Section>
  );
});

export default PhotoCarouselSection;
