import React, { memo } from "react";
import Section from "../components/Section";
import { useSectionNav } from "../components/SectionWrapper";

const ARROWS = [
  { x: "10%", y: "30%", r: "25deg" },
  { x: "18%", y: "55%", r: "10deg" },
  { x: "12%", y: "75%", r: "-10deg" },
  { x: "25%", y: "18%", r: "40deg" },
  { x: "35%", y: "82%", r: "-25deg" },
  { x: "50%", y: "12%", r: "90deg" },
  { x: "50%", y: "88%", r: "-90deg" },
  { x: "70%", y: "18%", r: "140deg" },
  { x: "82%", y: "30%", r: "160deg" },
  { x: "88%", y: "55%", r: "175deg" },
  { x: "75%", y: "82%", r: "-150deg" },
  { x: "62%", y: "86%", r: "-120deg" },
];

const ZeroSection = memo(function ZeroSection({ id, sectionRef }) {
  const nav = useSectionNav();

  const handleStart = () => {
    nav?.scrollToId?.("hello");
  };

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-neutral-950"
    >
      {/* subtle film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E)",
        }}
      />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.75)_100%)]" />

      <div className="relative w-full max-w-4xl px-6 text-center">
        <div className="mx-auto inline-flex flex-col items-center">
          <p className="text-zinc-200/80 text-[clamp(1.05rem,2.6vw,1.4rem)] tracking-[0.2em] uppercase">
            Нужно
          </p>

          <div className="relative mt-5 mb-5">
            <button
              type="button"
              onClick={handleStart}
              className="group relative rounded-2xl px-6 py-3 sm:px-10 sm:py-4 text-[clamp(2.6rem,8vw,4.8rem)] font-black tracking-[0.12em] uppercase text-white outline-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.08) 100%)",
                boxShadow:
                  "0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <span
                className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.24), transparent 55%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.18), transparent 60%)",
                }}
              />
              <span className="relative">НАЧАТЬ</span>
            </button>

            {/* arrows */}
            <div className="pointer-events-none absolute inset-[-70px] sm:inset-[-90px]">
              {ARROWS.map((a, idx) => (
                <span
                  key={idx}
                  className="absolute text-white/70 drop-shadow-[0_6px_22px_rgba(0,0,0,0.65)]"
                  style={{
                    left: a.x,
                    top: a.y,
                    transform: `translate(-50%, -50%) rotate(${a.r})`,
                    fontSize: "clamp(1.3rem,3.2vw,2.2rem)",
                    filter: "blur(0.2px)",
                  }}
                >
                  ➤
                </span>
              ))}
            </div>
          </div>

          <p className="text-zinc-200/70 text-[clamp(1.05rem,2.6vw,1.5rem)]">
            пока Вани нет
          </p>

          <p className="mt-6 text-zinc-400/70 text-[clamp(0.85rem,2vw,1rem)]">
            Нажми на «НАЧАТЬ»
          </p>
        </div>
      </div>
    </Section>
  );
});

export default ZeroSection;
