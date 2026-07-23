import React, { memo } from "react";
import Section from "../components/Section";
import memories from "../data/memories.json";

const TIMELINE_PATH = "M-40 390 C75 390 82 235 225 235 C365 235 400 325 545 325 C690 325 715 180 865 180 C1015 180 1040 300 1190 300 C1320 300 1340 165 1380 165";

function getEventPosition(event, index, count) {
  const start = 15;
  const end = 84;
  const x = event.position?.x ?? (count === 1 ? 50 : start + (index / (count - 1)) * (end - start));
  const y = event.position?.y ?? (index % 2 === 0 ? 42 : 58);

  return {
    left: `${x}%`,
    top: `${y}%`,
    side: index % 2 === 0 ? "top" : "bottom",
  };
}

const TimelineSection = memo(function TimelineSection({ id, sectionRef }) {
  return (
    <Section
      id={id}
      ref={sectionRef}
      className="timeline-section relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="timeline-grid" aria-hidden="true" />
      <div className="timeline-content relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="timeline-heading text-center">
          <p className="timeline-kicker">НАША ИСТОРИЯ</p>
          <h2>По линии важных дней</h2>
        </div>

        <div className="timeline-canvas" aria-label="Хронология событий">
          <svg
            className="timeline-line"
            viewBox="0 0 1340 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="timeline-path-glow" d={TIMELINE_PATH} />
            <path className="timeline-path" d={TIMELINE_PATH} />
          </svg>

          {memories.timeline.map((event, index) => {
            const position = getEventPosition(event, index, memories.timeline.length);

            return (
              <article
                className={`timeline-event timeline-event--${position.side}`}
                style={{ left: position.left, top: position.top }}
                key={`${event.date}-${event.title}`}
              >
                <span className="timeline-branch" aria-hidden="true" />
                <span className="timeline-node" aria-hidden="true" />
                <div className="timeline-event-card">
                  <time>{event.date}</time>
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="timeline-mobile-list" data-section-gesture-lock>
          {memories.timeline.map((event) => (
            <article
              className="timeline-mobile-event"
              key={`${event.date}-${event.title}`}
            >
              <span className="timeline-mobile-node" aria-hidden="true" />
              <div className="timeline-event-card">
                <time>{event.date}</time>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default TimelineSection;
