import React, { memo } from "react";
import Section from "../components/Section";

const HelloSection = memo(function HelloSection({ id, sectionRef }) {
  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative w-full max-w-4xl px-6 text-center">
        <h1
          className="mb-4 text-[clamp(2.2rem,6.5vw,4.4rem)] font-extrabold tracking-tight"
          style={{
            textShadow: "0 18px 60px rgba(0,0,0,0.65)",
          }}
        >
          Привет, любимая
        </h1>
        <h2 className="mx-auto max-w-3xl text-zinc-200/85 text-[clamp(1.1rem,2.7vw,1.8rem)] leading-snug">
          У меня есть, что тебе сказать
        </h2>
        <p className="mt-8 text-zinc-400/75 text-[clamp(0.95rem,2.1vw,1.15rem)]">
          Листай колёсиком мышки или свайпай влево
        </p>
      </div>
    </Section>
  );
});

export default HelloSection;
