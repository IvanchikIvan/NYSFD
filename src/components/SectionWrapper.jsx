import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SCROLL_LOCK_MS = 800;
const TOUCH_THRESHOLD_PX = 50;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Container for full-screen horizontal sections.
 * - Tracks active section index
 * - Handles wheel/touch/keyboard with native listeners
 * - Uses direct scrollLeft manipulation (no scrollIntoView conflicts)
 * - 800ms debounce between switches
 */
export default function SectionWrapper({ children }) {
  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const lockTimerRef = useRef(null);

  const childArray = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const [sectionsCount, setSectionsCount] = useState(childArray.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sectionRefs = useRef([]);

  useEffect(() => {
    setSectionsCount(childArray.length);

    const nextRefs = new Array(childArray.length);
    for (let i = 0; i < childArray.length; i += 1) {
      nextRefs[i] = sectionRefs.current[i] || React.createRef();
    }
    sectionRefs.current = nextRefs;

    setActiveIndex((idx) => clamp(idx, 0, Math.max(0, childArray.length - 1)));
  }, [childArray.length]);

  const lockScrolling = useCallback(() => {
    setIsScrolling(true);
    window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_LOCK_MS);
  }, []);

  const scrollToIndex = useCallback(
    (nextIndex) => {
      const next = clamp(nextIndex, 0, Math.max(0, sectionsCount - 1));
      const container = containerRef.current;
      if (!container) return;

      lockScrolling();
      setActiveIndex(next);

      // Direct scrollLeft assignment with smooth behavior via CSS scroll-behavior
      const targetScroll = next * container.clientWidth;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    },
    [sectionsCount, lockScrolling]
  );

  const goNext = useCallback(() => {
    if (isScrolling) return;
    scrollToIndex(activeIndex + 1);
  }, [isScrolling, scrollToIndex, activeIndex]);

  const goPrev = useCallback(() => {
    if (isScrolling) return;
    scrollToIndex(activeIndex - 1);
  }, [isScrolling, scrollToIndex, activeIndex]);

  // Native wheel handler with passive:false
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault(); // Must be in passive:false listener
      if (isScrolling) return;

      if (e.deltaY > 0 || e.deltaX > 0) goNext();
      else if (e.deltaY < 0 || e.deltaX < 0) goPrev();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isScrolling, goNext, goPrev]);

  const onKeyDown = useCallback(
    (e) => {
      if (isScrolling) return;

      const key = e.key;

      if (
        key === "ArrowRight" ||
        key === "ArrowDown" ||
        key === "PageDown" ||
        key === " "
      ) {
        e.preventDefault();
        goNext();
        return;
      }

      if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp") {
        e.preventDefault();
        goPrev();
        return;
      }

      if (key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
        return;
      }

      if (key === "End") {
        e.preventDefault();
        scrollToIndex(sectionsCount - 1);
      }
    },
    [isScrolling, goNext, goPrev, scrollToIndex, sectionsCount]
  );

  const onTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const startX = touchStartXRef.current;
      touchStartXRef.current = null;

      if (startX == null) return;
      if (!e.changedTouches || e.changedTouches.length === 0) return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;

      if (Math.abs(deltaX) < TOUCH_THRESHOLD_PX) return;
      if (isScrolling) return;

      // Swipe left = next, swipe right = prev
      if (deltaX > 0) goNext();
      else goPrev();
    },
    [isScrolling, goNext, goPrev]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onTouchStart, onTouchEnd, onKeyDown]);

  // A11y + focus management
  useEffect(() => {
    sectionRefs.current.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const isActive = i === activeIndex;
      el.setAttribute("aria-hidden", String(!isActive));

      if (isActive) el.removeAttribute("inert");
      else el.setAttribute("inert", "");

      el.style.willChange = isActive ? "transform" : "";
    });

    const activeEl = sectionRefs.current[activeIndex]?.current;
    if (activeEl) {
      window.setTimeout(() => {
        activeEl.focus({ preventScroll: true });
      }, 50);
    }
  }, [activeIndex]);

  // Realign on resize/orientation
  useEffect(() => {
    const align = () => {
      const container = containerRef.current;
      if (!container) return;
      container.scrollLeft = activeIndex * container.clientWidth;
    };

    window.addEventListener("resize", align);
    window.addEventListener("orientationchange", align);
    align();

    return () => {
      window.removeEventListener("resize", align);
      window.removeEventListener("orientationchange", align);
    };
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex overflow-x-hidden overflow-y-hidden bg-zinc-950 text-white scroll-smooth"
      aria-roledescription="carousel"
      aria-label="Full screen sections"
    >
      {childArray.map((child, index) => {
        if (!React.isValidElement(child)) return null;

        return React.cloneElement(child, {
          ref: sectionRefs.current[index],
          key: child.props.id || index,
          isActive: index === activeIndex,
          index,
        });
      })}
    </div>
  );
}
