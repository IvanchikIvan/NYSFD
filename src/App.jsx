import React, { Suspense, lazy } from "react";
import SectionWrapper from "./components/SectionWrapper";
import FloatingStrawberries from "./components/FloatingStrawberries";

const ZeroSection = lazy(() => import("./sections/ZeroSection.jsx"));
const HelloSection = lazy(() => import("./sections/HelloSection.jsx"));
const GallerySection = lazy(() => import("./sections/GallerySection.jsx"));
const TimelineSection = lazy(() => import("./sections/TimelineSection.jsx"));
const RotatingWheelSection = lazy(() => import("./sections/RotatingWheelSection.jsx"));
const QRCodeSection = lazy(() => import("./sections/QRCodeSection.jsx"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-zinc-950 text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <FloatingStrawberries />
      <SectionWrapper>
        <ZeroSection id="zero" />
        <HelloSection id="hello" />
        <GallerySection id="gallery" />
        <TimelineSection id="timeline" />
        <RotatingWheelSection id="wheel" />
        <QRCodeSection id="qr" />
      </SectionWrapper>
    </Suspense>
  );
}
