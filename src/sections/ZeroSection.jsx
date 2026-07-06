import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";
import { useSectionNav } from "../components/SectionWrapper";

const ARROWS = [
  { x: "10%", y: "30%", r: "25deg" },
  { x: "18%", y: "55%", r: "10deg" },
  { x: "12%", y: "75%", r: "-10deg" },
  { x: "25%", y: "18%", r: "40deg" },
  { x: "35%", y: "82%", r: "-25deg" },
  { x: "50%", y: "17%", r: "90deg" },
  { x: "50%", y: "88%", r: "-90deg" },
  { x: "70%", y: "18%", r: "140deg" },
  { x: "82%", y: "30%", r: "160deg" },
  { x: "88%", y: "55%", r: "175deg" },
  { x: "75%", y: "82%", r: "-150deg" },
  { x: "62%", y: "86%", r: "-120deg" },
];

function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
}

const ZeroSection = memo(function ZeroSection({ id, sectionRef }) {
  const nav = useSectionNav();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // 20.06.2026 13:00 MSK (UTC+3)
    const startDate = new Date('2026-06-20T13:00:00+03:00');

    const calculateTime = () => {
      const now = new Date();
      const diff = now - startDate;
      
      if (diff < 0) return null; // Если время еще не настало

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
    if (!timeLeft) return <div className="capsule-display tracking-widest text-lg">ОЖИДАНИЕ...</div>;

    const parts = [];
    if (timeLeft.years > 0) parts.push(pluralize(timeLeft.years, ['год', 'года', 'лет']));
    if (timeLeft.months > 0) parts.push(pluralize(timeLeft.months, ['месяц', 'месяца', 'месяцев']));
    if (timeLeft.days > 0) parts.push(pluralize(timeLeft.days, ['день', 'дня', 'дней']));
    if (timeLeft.hours > 0) parts.push(pluralize(timeLeft.hours, ['час', 'часа', 'часов']));
    if (timeLeft.minutes > 0) parts.push(pluralize(timeLeft.minutes, ['минута', 'минуты', 'минут']));
    if (timeLeft.seconds > 0) parts.push(pluralize(timeLeft.seconds, ['секунда', 'секунды', 'секунд']));

    return (
      <div className="capsule-display flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider">
        {parts.map((part, i) => (
          <span key={i} className="whitespace-nowrap">{part}</span>
        ))}
      </div>
    );
  };

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell relative flex items-center justify-center overflow-hidden bg-transparent z-10"
    >
      <div className="relative w-full max-w-5xl px-6 text-center z-10">
        <div className="mx-auto inline-flex flex-col items-center">
          
          {/* Рукописная надпись маркером */}
          <div 
            className="mb-12 select-none"
            style={{
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#f7ffffff",
              fontWeight: "700",
              letterSpacing: "0.05em",
              lineHeight: "1"
            }}
          >
            Мы встречаемся
          </div>

          {/* Стеклянная колба с таймером */}
          <div className="glass-capsule w-full max-w-4xl px-8 py-5 mb-12 flex items-center justify-center min-h-[80px]">
            {renderTimer()}
          </div>

          <div className="relative mt-5 mb-5">
            <button
              type="button"
              onClick={handleStart}
              className="group relative rounded-2xl px-6 py-3 sm:px-10 sm:py-4 text-[clamp(2.6rem,8vw,4.8rem)] font-black tracking-[0.12em] uppercase text-white outline-none transition-transform active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgba(0, 245, 255, 0.15) 0%, rgba(176, 38, 255, 0.15) 100%)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "1px solid rgba(0, 245, 255, 0.4)",
              }}
            >
              <span
                className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(0,245,255,0.4), transparent 55%), radial-gradient(circle at 80% 60%, rgba(176,38,255,0.4), transparent 60%)",
                }}
              />
              <span className="relative drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]">НАЧАТЬ</span>
            </button>

            {/* arrows */}
            <div className="pointer-events-none absolute inset-[-70px] sm:inset-[-90px]">
              {ARROWS.map((a, idx) => (
                <span
                  key={idx}
                  className="absolute text-[var(--contrast-teal)] drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                  style={{
                    left: a.x,
                    top: a.y,
                    transform: `translate(-50%, -50%) rotate(${a.r})`,
                    fontSize: "clamp(1.3rem,3.2vw,2.2rem)",
                    filter: "blur(0.4px)",
                  }}
                >
                  ➤
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

export default ZeroSection;