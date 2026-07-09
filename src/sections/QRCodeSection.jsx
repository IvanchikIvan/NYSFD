import React, { memo } from "react";
import Section from "../components/Section";

const QRCodeSection = memo(function QRCodeSection({ id, sectionRef }) {
  const siteUrl = "https://ivanchikivan.github.io/NYSFD/";
  
  // QR code via QR Server API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(siteUrl)}&bgcolor=0a0505&color=ffc3a0&margin=20`;

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a0a0a 0%, #0a0505 100%)',
      }}
    >
      {/* Декоративные элементы фона */}
      <div className="absolute  pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #ff6b9d 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #ffc3a0 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute  bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 text-center">
        {/* Заголовок */}
        <h2 
          className="mb-6 sm:mb-8"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ffc3a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
            textShadow: '0 0 30px rgba(255, 107, 157, 0.3)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: '700',
          }}
        >
          Поделись этим моментом
        </h2>

        {/* QR Code контейнер */}
        <div 
          className="relative mx-auto mb-6 sm:mb-8 inline-block rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.12) 0%, rgba(255, 195, 160, 0.08) 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 195, 160, 0.2)',
          }}
        >
          {/* Внутренняя рамка */}
          <div 
            className="relative rounded-xl overflow-hidden"
            style={{
              background: '#0a0505',
              padding: '12px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            <img
              src={qrUrl}
              alt="QR код сайта"
              className="w-full h-auto max-w-[280px] sm:max-w-[320px] mx-auto block"
              style={{
                imageRendering: 'pixelated',
                filter: 'contrast(1.05) brightness(1.05)',
              }}
              loading="lazy"
            />
          </div>

          {/* Декоративные уголки */}
          <div 
            className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 opacity-40"
            style={{ borderColor: '#ffc3a0' }}
          />
          <div 
            className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 opacity-40"
            style={{ borderColor: '#ffc3a0' }}
          />
          <div 
            className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 opacity-40"
            style={{ borderColor: '#ffc3a0' }}
          />
          <div 
            className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 opacity-40"
            style={{ borderColor: '#ffc3a0' }}
          />
        </div>

        {/* Подпись */}
        <p 
          className="mb-3 sm:mb-4"
          style={{
            fontFamily: "'Crimson Text', 'Georgia', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#ffe4e6',
            letterSpacing: '0.03em',
            textShadow: '0 2px 10px rgba(255, 107, 157, 0.3)',
          }}
        >
          Отсканируй и вернись сюда в любое время
        </p>

        {/* URL */}
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: '#ffc3a0',
            background: 'rgba(255, 195, 160, 0.08)',
            border: '1px solid rgba(255, 195, 160, 0.2)',
            textDecoration: 'none',
          }}
        >
          {siteUrl}
        </a>

        {/* Нижний текст */}
        <p 
          className="mt-8 sm:mt-10"
          style={{
            fontFamily: "'Crimson Text', 'Georgia', serif",
            fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
            color: '#d4a5a5',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}
        >
          С любовью ❤️
        </p>
      </div>
    </Section>
  );
});

export default QRCodeSection;