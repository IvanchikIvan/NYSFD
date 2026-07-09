import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";

const HelloSection = memo(function HelloSection({ id, sectionRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Плавное появление элементов по очереди
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section
      id={id}
      ref={sectionRef}
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
            // Контрастный градиент: бирюзовый -> фиолетовый
            background: "linear-gradient(135deg, rgb(255, 107, 157) 0%, rgb(255, 195, 160) 100%) text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
            lineHeight: "1.2",
            textShadow: "0 0 30px rgba(255, 107, 157, 0.3)",
            filter: "drop-shadow(0 4px 20px rgba(176, 38, 255, 0.4))",
          }}
        >
          Привет, любимая
        </h1>

        {/* Разделитель */}
        <div
          className={`mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{
            width: "120px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, #a25f43ff, transparent)",
            borderRadius: "2px",
            boxShadow: "0 0 10px rgba(255, 128, 0, 0.33)",
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
            color: "#e0faff", // Светло-бирюзовый
            letterSpacing: "0.03em",
            lineHeight: "1.5",
            textShadow: "0 2px 15px rgba(0, 245, 255, 0.5)",
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
            Листай колёсиком мышки или пальчиком
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
    </Section>
  );
});

export default HelloSection;
