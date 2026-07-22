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
      className="hello-section relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hello-orb" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <h1
          className={`accent-title mb-6 w-full transition-all duration-1000 ease-out sm:mb-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Привет, любимая
        </h1>

        <div
          className={`romantic-divider mb-8 transition-all delay-300 duration-1000 ease-out sm:mb-12 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

        <h2
          className={`romantic-subtitle mb-16 w-full px-2 transition-all delay-500 duration-1000 ease-out sm:mb-24 md:mb-32 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          У меня есть, что тебе сказать
        </h2>

        <div
          className={`flex flex-col items-center gap-4 transition-all delay-700 duration-1000 ease-out sm:gap-6 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-center text-[9px] font-light uppercase tracking-[0.2em] text-white/30 sm:text-xs sm:tracking-[0.3em]">
            Скролль вниз
          </p>

          <div className="relative flex h-[36px] w-[22px] justify-center rounded-full border border-white/20 p-1 sm:h-[40px] sm:w-[26px]">
            <div className="mt-1 h-[4px] w-[2px] animate-bounce rounded-full bg-white/60 sm:h-[6px]" />
          </div>
        </div>
      </div>
    </Section>
  );
});

export default HelloSection;
