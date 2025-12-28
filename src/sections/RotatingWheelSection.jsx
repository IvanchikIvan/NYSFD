// src/sections/VerticalWheelSection.jsx
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Section from "../components/Section";

const ITEM_HEIGHT = 40; // px between items

const PHRASES = [
  "Design for humans, not screens",
  "Performance is a UX feature",
  "Less motion, more meaning",
  "Content drives layout",
  "State is a single source of truth",
  "Animations follow intent",
  "Defaults must feel smart",
  "Latency kills engagement",
  "Accessibility is not optional",
  "Code is part of the product",
];

const VerticalWheelSection = memo(function VerticalWheelSection({
  id,
  sectionRef,
}) {
  // position in "index units": 0 = первая фраза по центру, 1 = вторая и т.д.
  const [position, setPosition] = useState(2); // стартуем где‑то в середине
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const startPosRef = useRef(0);
  const draggingRef = useRef(false);
  const rafRef = useRef(null);
  const lastClientYRef = useRef(0);

  const maxIndex = PHRASES.length - 1;

  const clampPosition = useCallback(
    (value) => Math.max(0, Math.min(maxIndex, value)),
    [maxIndex]
  );

  const beginDrag = useCallback(
    (clientY) => {
      draggingRef.current = true;
      setIsDragging(true);
      startYRef.current = clientY;
      startPosRef.current = position;
    },
    [position]
  );

  const applyDrag = useCallback(
    (clientY) => {
      if (!draggingRef.current) return;
      const deltaPx = clientY - startYRef.current;
      const deltaIndex = -deltaPx / ITEM_HEIGHT; // drag вверх -> индекс растёт
      const nextPos = clampPosition(startPosRef.current + deltaIndex);
      setPosition(nextPos);
    },
    [clampPosition]
  );

  const updateDrag = useCallback(
    (clientY) => {
      if (!draggingRef.current) return;
      lastClientYRef.current = clientY;

      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyDrag(lastClientYRef.current);
      });
    },
    [applyDrag]
  );

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // снап к ближайшей фразе
    setPosition((prev) => clampPosition(Math.round(prev)));
  }, [clampPosition]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      beginDrag(e.clientY);
    },
    [beginDrag]
  );

  // Touch handlers
  const handleTouchStart = useCallback(
    (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      beginDrag(touch.clientY);
    },
    [beginDrag]
  );

  // Глобальные move / end, чтобы не терять drag при выходе за границы
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      e.preventDefault();
      updateDrag(e.clientY);
    };
    const onMouseUp = (e) => {
      e.preventDefault();
      endDrag();
    };
    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      updateDrag(touch.clientY);
    };
    const onTouchEnd = () => {
      endDrag();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, updateDrag, endDrag]);

  useEffect(() => () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell flex items-center justify-center"
    >
      <div className="section-card w-full max-w-md px-4">
        <h2 className="section-title mb-2 text-center text-2xl font-semibold">
          Vertical phrase wheel
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-300/80">
          Прокрути мысли и поймай фразу в центре.
        </p>

        <div
          className={[
            "wheel-shell relative mx-auto h-72 w-full max-w-sm overflow-hidden",
            "select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Центральная направляющая (опционально) */}
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent" />

          {/* Список фраз, каждая позиционируется вокруг центра */}
          {PHRASES.map((phrase, index) => {
            const distance = Math.abs(index - position);

            const scale = 1.25 - Math.min(distance * 0.15, 0.6);
            const opacity = 1 - Math.min(distance * 0.25, 0.85);
            const blur = Math.min(distance * 1.5, 6);
            const offset = (index - position) * ITEM_HEIGHT;

            const transform = `translate(-50%, calc(-50% + ${offset}px)) scale(${scale})`;
            const zIndex = 100 - Math.round(distance * 10);

            return (
              <div
                key={index}
                className="pointer-events-none absolute left-1/2 top-1/2 whitespace-nowrap text-center text-base sm:text-lg"
                style={{
                  transform,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex,
                  transition: draggingRef.current
                    ? "none"
                    : "transform 0.18s ease-out, opacity 0.18s ease-out, filter 0.18s ease-out",
                }}
              >
                <span className="px-4 py-1 text-zinc-100">
                  {phrase}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-200/60">
          Drag with mouse or touch to spin. Middle phrase is strongest.
        </p>
      </div>
    </Section>
  );
});

export default VerticalWheelSection;
