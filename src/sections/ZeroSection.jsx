import React, { memo, useEffect, useState } from "react";
import Section from "../components/Section";
import { useSectionNav } from "../components/SectionNavContext";

const START_DATE = new Date("2026-06-20T13:00:00+03:00");

function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5];

  return `${count} ${words[index]}`;
}

function calculateTimeLeft() {
  const now = new Date();
  const diff = now - START_DATE;
  if (diff < 0) return null;

  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

const ZeroSection = memo(function ZeroSection({ id, sectionRef }) {
  const nav = useSectionNav();
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = timeLeft
    ? [
        { value: timeLeft.years, labels: ["год", "года", "лет"] },
        { value: timeLeft.months, labels: ["месяц", "месяца", "месяцев"] },
        { value: timeLeft.days, labels: ["день", "дня", "дней"] },
        { value: timeLeft.hours, labels: ["час", "часа", "часов"] },
        { value: timeLeft.minutes, labels: ["минута", "минуты", "минут"] },
        { value: timeLeft.seconds, labels: ["секунда", "секунды", "секунд"] },
      ].filter((unit) => unit.value > 0 || unit.labels[0] === "секунда")
    : [];

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="relative z-10 flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="soft-center-glow" />

      <div className="relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 py-10">
        <h1 className="hero-title mb-12 w-full select-none text-center sm:mb-20 md:mb-24">
          Мы встречаемся
        </h1>

        <div className="mb-16 flex w-full max-w-3xl justify-center sm:mb-24 md:mb-32">
          {!timeLeft ? (
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 sm:text-sm">
              Ожидание...
            </div>
          ) : (
            <div className="grid w-full grid-cols-3 justify-center gap-x-2 gap-y-8 px-2 sm:flex sm:flex-wrap sm:gap-10 md:gap-16">
              {timeUnits.map((unit) => (
                <div
                  key={unit.labels[0]}
                  className="flex min-w-[70px] flex-col items-center justify-center sm:min-w-[80px]"
                >
                  <span className="text-3xl font-light tabular-nums tracking-tight text-white/90 sm:text-5xl md:text-6xl">
                    {unit.value}
                  </span>
                  <span className="mt-2 text-center text-[9px] uppercase tracking-[0.15em] text-white/40 sm:mt-3 sm:text-[11px] sm:tracking-[0.2em] md:text-xs">
                    {pluralize(unit.value, unit.labels).split(" ")[1]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => nav?.scrollToId?.("hello")}
          className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md transition-all duration-700 ease-out hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] active:scale-95 sm:px-12 sm:py-4"
        >
          <span className="relative text-xs font-light uppercase tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-white sm:text-sm sm:tracking-[0.3em]">
            Начать
          </span>
        </button>
      </div>
    </Section>
  );
});

export default ZeroSection;
