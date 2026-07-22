import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SectionNavContext } from "./SectionNavContext";

const TOUCH_THRESHOLD_PX = 50;
const SCROLL_ANIM_MS = 1600;
const MOBILE_BREAKPOINT = "(max-width: 639px)";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function SectionWrapper({ children }) {
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);
  const animRef = useRef(null);
  const activeIndexRef = useRef(0);

  const childArray = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const sectionsCount = childArray.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVertical, setIsVertical] = useState(() =>
    window.matchMedia(MOBILE_BREAKPOINT).matches
  );

  const sectionRefs = useMemo(
    () => childArray.map(() => React.createRef()),
    [childArray]
  );

  const idToIndex = useMemo(() => {
    const map = new Map();
    childArray.forEach((child, idx) => {
      if (React.isValidElement(child) && child.props?.id) {
        map.set(child.props.id, idx);
      }
    });
    return map;
  }, [childArray]);

  const cancelAnimation = useCallback(() => {
    if (animRef.current?.rafId) {
      window.cancelAnimationFrame(animRef.current.rafId);
    }
    animRef.current = null;
  }, []);

  const animateScrollTo = useCallback(
    (targetPosition, durationMs) => {
      const container = containerRef.current;
      if (!container) return;

      cancelAnimation();

      const from = isVertical ? container.scrollTop : container.scrollLeft;
      const to = targetPosition;
      const start = performance.now();

      animRef.current = { rafId: null };

      const step = (now) => {
        const elapsed = now - start;
        const t = clamp(elapsed / durationMs, 0, 1);
        const eased = easeInOutCubic(t);
        if (isVertical) {
          container.scrollTop = from + (to - from) * eased;
        } else {
          container.scrollLeft = from + (to - from) * eased;
        }

        if (t < 1) {
          animRef.current.rafId = window.requestAnimationFrame(step);
        } else {
          animRef.current = null;
          setIsScrolling(false);
        }
      };

      animRef.current.rafId = window.requestAnimationFrame(step);
    },
    [cancelAnimation, isVertical]
  );

  const scrollToIndex = useCallback(
    (nextIndex) => {
      const next = clamp(nextIndex, 0, Math.max(0, sectionsCount - 1));
      const container = containerRef.current;
      if (!container) return;

      setIsScrolling(true);
      setActiveIndex(next);

      const targetScroll = next * (isVertical ? container.clientHeight : container.clientWidth);
      animateScrollTo(targetScroll, SCROLL_ANIM_MS);
    },
    [sectionsCount, animateScrollTo, isVertical]
  );

  const scrollToId = useCallback(
    (id) => {
      const idx = idToIndex.get(id);
      if (idx == null) return;
      if (isScrolling) return;
      scrollToIndex(idx);
    },
    [idToIndex, isScrolling, scrollToIndex]
  );

  const goNext = useCallback(() => {
    if (isScrolling) return;
    scrollToIndex(activeIndex + 1);
  }, [isScrolling, scrollToIndex, activeIndex]);

  const goPrev = useCallback(() => {
    if (isScrolling) return;
    scrollToIndex(activeIndex - 1);
  }, [isScrolling, scrollToIndex, activeIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      const delta = isVertical ? e.deltaY : e.deltaY || e.deltaX;
      if (delta > 0) goNext();
      else if (delta < 0) goPrev();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isScrolling, goNext, goPrev, isVertical]);

  const onKeyDown = useCallback(
    (e) => {
      if (isScrolling) return;
      const key = e.key;

      const nextKeys = isVertical
        ? ["ArrowDown", "PageDown", " "]
        : ["ArrowRight", "ArrowDown", "PageDown", " "];
      const prevKeys = isVertical
        ? ["ArrowUp", "PageUp"]
        : ["ArrowLeft", "ArrowUp", "PageUp"];

      if (nextKeys.includes(key)) {
        e.preventDefault();
        goNext();
        return;
      }
      if (prevKeys.includes(key)) {
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
    [isScrolling, goNext, goPrev, scrollToIndex, sectionsCount, isVertical]
  );

  const onTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    if (e.target instanceof Element && e.target.closest("[data-section-gesture-lock]")) {
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;

      if (start == null) return;
      if (!e.changedTouches || e.changedTouches.length === 0) return;

      const end = e.changedTouches[0];
      const delta = isVertical ? start.y - end.clientY : start.x - end.clientX;

      if (Math.abs(delta) < TOUCH_THRESHOLD_PX) return;
      if (isScrolling) return;

      if (delta > 0) goNext();
      else goPrev();
    },
    [isScrolling, goNext, goPrev, isVertical]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const updateOrientation = () => setIsVertical(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);
    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

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

  useEffect(() => {
    sectionRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const isActive = i === activeIndex;
      el.setAttribute("aria-hidden", String(!isActive));
      if (isActive) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
      el.style.willChange = isActive ? "transform" : "";
    });

    const activeEl = sectionRefs[activeIndex]?.current;
    if (activeEl) {
      window.setTimeout(() => {
        activeEl.focus({ preventScroll: true });
      }, 60);
    }
  }, [activeIndex, sectionRefs]);

  useEffect(() => {
    const align = () => {
      const container = containerRef.current;
      if (!container) return;

      if (isVertical) {
        container.scrollLeft = 0;
        container.scrollTop = activeIndexRef.current * container.clientHeight;
      } else {
        container.scrollTop = 0;
        container.scrollLeft = activeIndexRef.current * container.clientWidth;
      }
    };
    window.addEventListener("resize", align);
    window.addEventListener("orientationchange", align);
    align();
    return () => {
      window.removeEventListener("resize", align);
      window.removeEventListener("orientationchange", align);
    };
  }, [isVertical]);

  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  const navValue = useMemo(
    () => ({
      activeIndex,
      isScrolling,
      scrollToIndex,
      scrollToId,
      sectionsCount,
    }),
    [activeIndex, isScrolling, scrollToIndex, scrollToId, sectionsCount]
  );

  return (
    <SectionNavContext.Provider value={navValue}>
      <div
        ref={containerRef}
        className="section-stage relative flex h-screen w-screen flex-col overflow-x-hidden overflow-y-hidden text-white sm:flex-row"
        aria-roledescription="carousel"
        aria-orientation={isVertical ? "vertical" : "horizontal"}
        aria-label="Full screen sections"
      >
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return null;

          return React.cloneElement(child, {
            sectionRef: sectionRefs[index],
            key: child.props.id || index,
            isActive: index === activeIndex,
            index,
          });
        })}

        {/* Эффект затемнения в момент перелистывания */}
      </div>
    </SectionNavContext.Provider>
  );
}
