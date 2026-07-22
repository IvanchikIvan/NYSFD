import React, { memo } from "react";
import Section from "../components/Section";
import memories from "../data/memories.json";

function GalleryRow({ photos, reverse = false }) {
  const loops = [0, 1];

  return (
    <div
      className={[
        "gallery-track",
        reverse ? "gallery-track--reverse" : "",
      ].join(" ")}
    >
      {loops.map((loop) => (
        <div className="gallery-loop" key={loop} aria-hidden={loop === 1}>
          {photos.map((photo) => (
            <figure className="gallery-frame" key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

const GallerySection = memo(function GallerySection({ id, sectionRef }) {
  const firstRow = memories.gallery.filter((_, index) => index % 2 === 0);
  const secondRow = memories.gallery.filter((_, index) => index % 2 !== 0);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="gallery-section relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="gallery-content relative z-10 w-full">
        <div className="gallery-heading mx-auto px-5 text-center sm:px-8">
          <p className="gallery-kicker">СОХРАНЁННЫЕ МОМЕНТЫ</p>
          <h2>Галерея, которая не заканчивается</h2>
          <p>Лента для всех кадров, к которым хочется возвращаться.</p>
        </div>

        <div className="gallery-marquee" aria-label="Фотографии воспоминаний">
          <GalleryRow photos={firstRow} />
          <GalleryRow photos={secondRow} reverse />
        </div>
      </div>
    </Section>
  );
});

export default GallerySection;
