import React, { Suspense, lazy } from "react";
import SectionWrapper from "./components/SectionWrapper";

const InfiniteCarouselSection = lazy(() =>
  import("./sections/InfiniteCarouselSection.jsx")
);
const RotatingWheelSection = lazy(() =>
  import("./sections/RotatingWheelSection.jsx")
);
const LoveTreeSection = lazy(() => import("./sections/LoveTreeSection.jsx"));
const HelloSection = lazy(() => import("./sections/HelloSection.jsx"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-zinc-950 text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <SectionWrapper>
        <HelloSection id="hello" />
        <InfiniteCarouselSection id="carousel" />
        <RotatingWheelSection id="wheel" />
        <LoveTreeSection id="tree" />
      </SectionWrapper>
    </Suspense>
  );
}
