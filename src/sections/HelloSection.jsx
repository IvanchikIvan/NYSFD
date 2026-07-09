import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";

const HelloSection = memo(function HelloSection({ id, sectionRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[800px] aspect-square bg-rose-900/10 rounded-full blur-[80px] sm:blur-[120px] opacity-40" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl flex flex-col items-center">
        <h1
          className={`mb-6 sm:mb-8 transition-all duration-1000 ease-out w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
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
          Привет, любимая
        </h1>

        <div
          className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{
            width: "clamp(40px, 15vw, 80px)",
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <h2
          className={`mb-16 sm:mb-24 md:mb-32 transition-all duration-1000 delay-500 ease-out w-full px-2 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontSize: "clamp(1.1rem, 4.5vw, 2rem)",
            fontFamily: "'Crimson Text', 'Georgia', serif",
            fontWeight: "400",
            fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "0.03em",
          }}
        >
          У меня есть, что тебе сказать
        </h2>

        <div
          className={`flex flex-col items-center gap-4 sm:gap-6 transition-all duration-1000 delay-700 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 font-light text-center">
            Скролль вниз
          </p>
          
          <div className="relative w-[22px] h-[36px] sm:w-[26px] sm:h-[40px] rounded-full border border-white/20 flex justify-center p-1">
            <div className="w-[2px] h-[4px] sm:h-[6px] bg-white/60 rounded-full animate-bounce mt-1" />
          </div>
        </div>
      </div>
    </Section>
  );
});

export default HelloSection;