<<<<<<< HEAD
import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";

const HelloSection = memo(function HelloSection({ id, sectionRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Плавное появление элементов по очереди
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

=======
import React, { memo } from "react";
import Section from "../components/Section";

const HelloSection = memo(function HelloSection({ id, sectionRef }) {
>>>>>>> 719019bce426241d48ddfa5cb903f640f76a3434
  return (
    <Section
      id={id}
      ref={sectionRef}
<<<<<<< HEAD
      className="section-shell flex items-center justify-center min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1e 100%)",
      }}
    >
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Мягкие светящиеся круги */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #ff6b9d 0%, transparent 70%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, #c44569 0%, transparent 70%)",
            animation: "pulse 5s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Главный заголовок */}
        <h1
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontWeight: "700",
            background:
              "linear-gradient(135deg, #ffd700 0%, #ffb6c1 50%, #ff69b4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
            lineHeight: "1.2",
            textShadow: "0 0 40px rgba(255, 182, 193, 0.5)",
            filter: "drop-shadow(0 4px 20px rgba(255, 105, 180, 0.3))",
=======
      className="section-shell relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative w-full max-w-4xl px-6 text-center">
        <h1
          className="mb-4 text-[clamp(2.2rem,6.5vw,4.4rem)] font-extrabold tracking-tight"
          style={{
            textShadow: "0 18px 60px rgba(0,0,0,0.65)",
>>>>>>> 719019bce426241d48ddfa5cb903f640f76a3434
          }}
        >
          Привет, любимая
        </h1>
<<<<<<< HEAD

        {/* Разделитель */}
        <div
          className={`mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{
            width: "120px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #ff69b4, transparent)",
            borderRadius: "2px",
          }}
        />

        {/* Подзаголовок */}
        <h2
          className={`mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontFamily: "'Crimson Text', 'Georgia', serif",
            fontWeight: "400",
            fontStyle: "italic",
            color: "#ffe4e6",
            letterSpacing: "0.03em",
            lineHeight: "1.5",
            textShadow: "0 2px 15px rgba(255, 182, 193, 0.4)",
          }}
        >
          У меня есть, что тебе сказать
        </h2>

        {/* Инструкция со скроллом */}
        <div
          className={`inline-flex flex-col items-center gap-4 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontFamily: "'Inter', 'Arial', sans-serif",
              fontWeight: "300",
              color: "#ffc9d0",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(255, 105, 180, 0.3)",
            }}
          >
            Листай колёсиком мышки
          </p>

          {/* Анимированная иконка скролла */}
          <div
            className="relative"
            style={{
              width: "32px",
              height: "50px",
              border: "2px solid rgba(255, 182, 193, 0.5)",
              borderRadius: "20px",
              animation: "fadeInOut 2s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "8px",
                background: "linear-gradient(180deg, #ff69b4, #ffc9d0)",
                borderRadius: "2px",
                animation: "scrollDown 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateX(-50%) translateY(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          80% {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
=======
        <h2 className="mx-auto max-w-3xl text-zinc-200/85 text-[clamp(1.1rem,2.7vw,1.8rem)] leading-snug">
          У меня есть, что тебе сказать
        </h2>
        <p className="mt-8 text-zinc-400/75 text-[clamp(0.95rem,2.1vw,1.15rem)]">
          Листай колёсиком мышки или свайпай влево
        </p>
      </div>
>>>>>>> 719019bce426241d48ddfa5cb903f640f76a3434
    </Section>
  );
});

export default HelloSection;
