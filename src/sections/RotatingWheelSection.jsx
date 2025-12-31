// src/sections/VerticalWheelSection.jsx
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Section from "../components/Section";

const ITEM_HEIGHT = 50;

const PHRASES = [
  "За то, что ты моя опора и поддержка",
  "За твои волшебные черешневые волосы",
  "За то, как мы булчимся",
  "За твою нежную заботу обо мне",
  "За то, как страстно мы любимся",
  "За то, что ты хочешь меня накормить",
  "За наши бесконечные тёплые созвоны",
  "За то, что мы вместе играем и веселимся",
  "За твою невероятно чувствительную шею",
  "За твою искренность со мной",
  "За наше особенное тепло друг к другу",
  "За то, что ты всегда рядом, когда нужно",
  "За то, что я твоя любимая бусинка",
  "За наши совместные милые фоточки",
  "За твоё обворожительное милое лицо",
  "За твою улыбку, от которой тает сердце",
  "За твои нежные прикосновения",
  "За то, как ты смотришь на меня",
  "За твой заразительный смех",
  "За твои объятия, в которых я таю",
  "За то, что понимаешь меня с полуслова",
  "За наши общие мечты о будущем",
  "За твою способность меня успокоить",
  "За то, как ты заботишься о моём настроении",
];

const VerticalWheelSection = memo(function VerticalWheelSection({
  id,
  sectionRef,
}) {
  const [position, setPosition] = useState(Math.floor(PHRASES.length / 2));
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
      const deltaIndex = -deltaPx / ITEM_HEIGHT;
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

    setPosition((prev) => clampPosition(Math.round(prev)));
  }, [clampPosition]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      beginDrag(e.clientY);
    },
    [beginDrag]
  );

  const handleTouchStart = useCallback(
    (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      beginDrag(touch.clientY);
    },
    [beginDrag]
  );

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

  useEffect(
    () => () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    },
    []
  );

  const currentIndex = Math.round(position);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell section-shell--wheel flex items-center justify-center relative overflow-hidden min-h-screen py-8 sm:py-12"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0a0a 0%, #0a0505 100%)",
      }}
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #ff1744 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-10"
          style={{
            background: "radial-gradient(circle, #ff4081 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-card w-full max-w-3xl px-4 sm:px-6 relative z-10">
        {/* Заголовок */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2
            className="section-title section-title--wheel mb-2 sm:mb-3"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              background: "linear-gradient(135deg, #ff6b9d 0%, #ffc3a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.02em",
              textShadow: "0 0 30px rgba(255, 107, 157, 0.3)",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: "700",
            }}
          >
            Я люблю тебя за…
          </h2>
          <p
            className="text-zinc-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
            }}
          >
            Тяни список вверх или вниз
          </p>
        </div>

        {/* Колесо с фразами */}
        <div
          className={[
            "wheel-shell wheel-shell--wheel relative mx-auto overflow-hidden rounded-xl sm:rounded-2xl",
            "select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
          style={{
            height: "clamp(300px, 50vh, 400px)",
            width: "100%",
            maxWidth: "100%",
            background:
              "linear-gradient(180deg, rgba(26, 10, 10, 0.4) 0%, rgba(26, 10, 10, 0.8) 50%, rgba(26, 10, 10, 0.4) 100%)",
            border: "1px solid rgba(255, 107, 157, 0.1)",
            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.5)",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Центральная выделенная зона */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2"
            style={{
              height: "clamp(60px, 15vh, 80px)",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(255, 107, 157, 0.08) 50%, transparent 100%)",
              borderTop: "1px solid rgba(255, 107, 157, 0.2)",
              borderBottom: "1px solid rgba(255, 107, 157, 0.2)",
            }}
          />

          {/* Верхняя и нижняя затемняющие маски */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0"
            style={{
              height: "clamp(80px, 20vh, 120px)",
              background:
                "linear-gradient(180deg, rgba(26, 10, 10, 1) 0%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{
              height: "clamp(80px, 20vh, 120px)",
              background:
                "linear-gradient(0deg, rgba(26, 10, 10, 1) 0%, transparent 100%)",
            }}
          />

          {/* Список фраз */}
          {PHRASES.map((phrase, index) => {
            const distance = Math.abs(index - position);

            const scale = 1.15 - Math.min(distance * 0.15, 0.55);
            const opacity = 1 - Math.min(distance * 0.3, 0.9);
            const blur = Math.min(distance * 2, 8);
            const offset = (index - position) * ITEM_HEIGHT;

            const transform = `translate(-50%, calc(-50% + ${offset}px)) scale(${scale})`;
            const zIndex = 100 - Math.round(distance * 10);

            const isCurrent = Math.abs(distance) < 0.5;

            return (
              <div
                key={index}
                className="pointer-events-none absolute left-1/2 top-1/2 text-center px-2 sm:px-4"
                style={{
                  transform,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex,
                  width: "95%",
                  maxWidth: "100%",
                  transition: draggingRef.current
                    ? "none"
                    : "transform 0.2s ease-out, opacity 0.2s ease-out, filter 0.2s ease-out",
                }}
              >
                <span
                  className="wheel-phrase inline-block px-3 sm:px-6 py-1 sm:py-2"
                  style={{
                    fontFamily: "'Crimson Text', 'Georgia', serif",
                    fontSize: isCurrent
                      ? "clamp(1.1rem, 4vw, 1.5rem)"
                      : "clamp(0.9rem, 3.5vw, 1.25rem)",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#ffc3a0" : "#e0e0e0",
                    textShadow: isCurrent
                      ? "0 0 20px rgba(255, 107, 157, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)"
                      : "0 2px 4px rgba(0, 0, 0, 0.6)",
                    letterSpacing: "0.02em",
                    lineHeight: "1.4",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    hyphens: "auto",
                    display: "block",
                  }}
                >
                  {phrase}
                </span>
              </div>
            );
          })}
        </div>

        {/* Счётчик фраз */}
        <div className="mt-4 sm:mt-6 text-center">
          <p
            className="text-zinc-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            }}
          >
            {currentIndex + 1} из {PHRASES.length}
          </p>
        </div>

        {/* Декоративная подсказка */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p
            className="text-zinc-400/60 italic"
            style={{
              fontFamily: "'Crimson Text', 'Georgia', serif",
              fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
            }}
          >
            И это ещё не все причины...
          </p>
        </div>
      </div>
    </Section>
  );
});

export default VerticalWheelSection;
