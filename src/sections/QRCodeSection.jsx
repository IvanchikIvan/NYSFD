import React, { memo } from "react";
import Section from "../components/Section";

const SITE_URL = "https://ivanchikivan.github.io/GFL/";

const QRCodeSection = memo(function QRCodeSection({ id, sectionRef }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    SITE_URL
  )}&bgcolor=0a0505&color=ffc3a0&margin=20`;

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="romantic-dark-section section-shell relative flex items-center justify-center overflow-hidden"
    >
      <div className="decorative-orbs" aria-hidden="true">
        <div className="decorative-orb decorative-orb--pink" />
        <div className="decorative-orb decorative-orb--peach" />
      </div>
      <div className="section-vignette" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="accent-title mb-6 sm:mb-8">Поделись этим моментом</h2>

        <div className="qr-card">
          <div className="qr-frame">
            <img
              src={qrUrl}
              alt="QR код сайта"
              className="qr-image"
              loading="lazy"
            />
          </div>

          <div className="qr-corner qr-corner--top-left" />
          <div className="qr-corner qr-corner--top-right" />
          <div className="qr-corner qr-corner--bottom-left" />
          <div className="qr-corner qr-corner--bottom-right" />
        </div>

        <p className="romantic-copy mb-3 sm:mb-4">
          Отсканируй и вернись сюда в любое время
        </p>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="romantic-link"
        >
          {SITE_URL}
        </a>

        <p className="romantic-note mt-8 sm:mt-10">С любовью ❤️</p>
      </div>
    </Section>
  );
});

export default QRCodeSection;
