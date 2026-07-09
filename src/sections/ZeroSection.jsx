import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";
import { useSectionNav } from "../components/SectionWrapper";

function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
}

const ZeroSection = memo(function ZeroSection({ id, sectionRef }) {
  const nav = useSectionNav();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const startDate = new Date('2026-06-20T13:00:00+03:00');

    const calculateTime = () => {
      const now = new Date();
      const diff = now - startDate;
      if (diff < 0) return null;

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) { months += 12; years--; }

      return { years, months, days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    nav?.scrollToId?.("hello");
  };

  const renderTimer = () => {
    if (!timeLeft) return <div className="text-white/40 tracking-[0.2em] text-xs sm:text-sm uppercase">Ожидание...</div>;

    const timeUnits = [
      { value: timeLeft.years, labels: ['год', 'года', 'лет'] },
      { value: timeLeft.months, labels: ['месяц', 'месяца', 'месяцев'] },
      { value: timeLeft.days, labels: ['день', 'дня', 'дней'] },
      { value: timeLeft.hours, labels: ['час', 'часа', 'часов'] },
      { value: timeLeft.minutes, labels: ['минута', 'минуты', 'минут'] },
      { value: timeLeft.seconds, labels: ['секунда', 'секунды', 'секунд'] },
    ].filter(unit => unit.value > 0 || unit.labels[0] === 'секунда'); 

    return (
      // Адаптивная сетка: 3 колонки на смартфонах, в строку на планшетах/десктопах
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-x-2 gap-y-8 sm:gap-10 md:gap-16 w-full px-2">
        {timeUnits.map((unit, i) => (
          <div key={i} className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px]">
            <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/90 tabular-nums tracking-tight">
              {unit.value}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs mt-2 sm:mt-3 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 text-center">
              {pluralize(unit.value, unit.labels).split(' ')[1]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden z-10 bg-transparent"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-5xl px-4 py-10">
        <h1 
          className="mb-12 sm:mb-20 md:mb-24 text-center select-none w-full"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: "clamp(2rem, 8vw, 4rem)",
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: "0.03em",
            textShadow: "0 10px 30px rgba(0,0,0,0.3)",
            lineHeight: "1.2"
          }}
        >
          Мы встречаемся
        </h1>

        <div className="mb-16 sm:mb-24 md:mb-32 w-full max-w-3xl flex justify-center">
          {renderTimer()}
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="group relative px-8 py-3 sm:px-12 sm:py-4 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-700 ease-out hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] active:scale-95"
        >
          <span className="relative text-xs sm:text-sm font-light tracking-[0.2em] sm:tracking-[0.3em] text-white/60 uppercase transition-colors duration-500 group-hover:text-white">
            Начать
          </span>
        </button>
      </div>
    </Section>
  );
});

export default ZeroSection;