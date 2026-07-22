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

const RotatingWheelSection = memo(function RotatingWheelSection({
  id,
  sectionRef,
}) {
  const [position, setPosition] = useState(Math.floor(PHRASES.length / 2));
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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
      setHasInteracted(true);
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
      updateDrag(e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", endDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", endDrag);
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

  const showRandomPhrase = useCallback(() => {
    setHasInteracted(true);
    setPosition(Math.floor(Math.random() * PHRASES.length));
  }, []);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="romantic-dark-section section-shell section-shell--wheel relative flex min-h-screen items-center justify-center overflow-hidden py-8 sm:py-12"
    >
      <div className="decorative-orbs" aria-hidden="true">
        <div className="decorative-orb decorative-orb--red" />
        <div className="decorative-orb decorative-orb--hot-pink" />
      </div>

      <div className="section-card relative z-10 w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="accent-title mb-2 sm:mb-3">Я люблю тебя за...</h2>
          <p className="eyebrow-text">Тяни список вверх или вниз</p>
          <p
            className={[
              "wheel-hint mt-3",
              hasInteracted ? "wheel-hint--hidden" : "",
            ].join(" ")}
          >
            Первая подсказка: потяни колесо или нажми на случайную причину
          </p>
        </div>

        <div
          className={[
            "wheel-shell wheel-shell--phrases relative mx-auto overflow-hidden rounded-xl select-none sm:rounded-2xl",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
          data-section-gesture-lock
          onMouseDown={(e) => {
            e.preventDefault();
            beginDrag(e.clientY);
          }}
          onTouchStart={(e) => {
            if (!e.touches || e.touches.length === 0) return;
            beginDrag(e.touches[0].clientY);
          }}
        >
          <div className="wheel-highlight" />
          <div className="wheel-fade wheel-fade--top" />
          <div className="wheel-fade wheel-fade--bottom" />

          {PHRASES.map((phrase, index) => {
            const distance = Math.abs(index - position);
            const scale = 1.15 - Math.min(distance * 0.15, 0.55);
            const opacity = 1 - Math.min(distance * 0.3, 0.9);
            const blur = Math.min(distance * 2, 8);
            const offset = (index - position) * ITEM_HEIGHT;
            const isCurrent = Math.abs(distance) < 0.5;

            return (
              <div
                key={phrase}
                className={[
                  "wheel-item",
                  isDragging ? "wheel-item--dragging" : "",
                ].join(" ")}
                style={{
                  transform: `translate(-50%, calc(-50% + ${offset}px)) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: 100 - Math.round(distance * 10),
                }}
              >
                <span
                  className={[
                    "wheel-phrase",
                    isCurrent ? "wheel-phrase--current" : "",
                  ].join(" ")}
                >
                  {phrase}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center sm:mt-6">
          <p className="counter-text">
            {currentIndex + 1} из {PHRASES.length}
          </p>
        </div>

        <div className="mt-4 flex justify-center sm:mt-5">
          <button
            type="button"
            className="random-reason-button"
            onClick={showRandomPhrase}
          >
            Случайная причина
          </button>
        </div>

        <div className="mt-6 px-4 text-center sm:mt-8">
          <p className="romantic-note romantic-note--muted">
            И это ещё не все причины...
          </p>
        </div>
      </div>
    </Section>
  );
});

export default RotatingWheelSection;
