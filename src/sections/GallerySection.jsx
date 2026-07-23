import React, { memo } from "react";
import Section from "../components/Section";

// Vite автоматически подхватывает все изображения из этой папки при сборке.
const galleryPhotos = Object.entries(
  import.meta.glob("../assets/gallery/*.{avif,gif,jpeg,jpg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, src]) => {
    const filename = path.split("/").pop().replace(/\.[^.]+$/, "");
    const label = filename.replace(/[-_]+/g, " ");

    return { src, alt: label, caption: label };
  });

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
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

const GallerySection = memo(function GallerySection({ id, sectionRef }) {
  const firstRow = galleryPhotos.filter((_, index) => index % 2 === 0);
  const secondRow = galleryPhotos.filter((_, index) => index % 2 !== 0);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="gallery-section relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="gallery-content relative z-10 w-full">
        <div className="gallery-heading mx-auto px-5 text-center sm:px-8">
          <p className="gallery-kicker">СОХРАНЁННЫЕ МОМЕНТЫ</p>
          <h2>Галерея, которая не закончится</h2>
          <p>Моменты, к которым хотелось бы вернуться</p>
        </div>

        <div className="gallery-marquee" aria-label="Фотографии воспоминаний">
          {firstRow.length > 0 && <GalleryRow photos={firstRow} />}
          {secondRow.length > 0 && <GalleryRow photos={secondRow} reverse />}
        </div>
      </div>
    </Section>
  );
});

export default GallerySection;
