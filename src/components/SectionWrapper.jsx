import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";

const TOUCH_THRESHOLD_PX = 50;
const SCROLL_ANIM_MS = 1600;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const SectionNavContext = createContext(null);

export function useSectionNav() {
  return useContext(SectionNavContext);
}

export default function SectionWrapper({ children }) {
  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const rafRef = useRef(null);
  const animRef = useRef(null);

  const childArray = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );

  const [sectionsCount, setSectionsCount] = useState(childArray.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRefs = useRef([]);

  const idToIndex = useMemo(() => {
    const map = new Map();
    childArray.forEach((child, idx) => {
      if (React.isValidElement(child) && child.props?.id) {
        map.set(child.props.id, idx);
      }
    });
    return map;
  }, [childArray]);

  useEffect(() => {
    setSectionsCount(childArray.length);
    const nextRefs = new Array(childArray.length);
    for (let i = 0; i < childArray.length; i += 1) {
      nextRefs[i] = sectionRefs.current[i] || React.createRef();
    }
    sectionRefs.current = nextRefs;
    setActiveIndex((idx) => clamp(idx, 0, Math.max(0, childArray.length - 1)));
  }, [childArray.length]);

  const cancelAnimation = useCallback(() => {
    if (animRef.current?.rafId) {
      window.cancelAnimationFrame(animRef.current.rafId);
    }
    animRef.current = null;
  }, []);

  const animateScrollTo = useCallback(
    (targetLeft, durationMs) => {
      const container = containerRef.current;
      if (!container) return;

      cancelAnimation();

      const from = container.scrollLeft;
      const to = targetLeft;
      const start = performance.now();

      animRef.current = { rafId: null };

      const step = (now) => {
        const elapsed = now - start;
        const t = clamp(elapsed / durationMs, 0, 1);
        const eased = easeInOutCubic(t);
        container.scrollLeft = from + (to - from) * eased;

        if (t < 1) {
          animRef.current.rafId = window.requestAnimationFrame(step);
        } else {
          animRef.current = null;
          setIsScrolling(false);
          setIsTransitioning(false);
        }
      };

      animRef.current.rafId = window.requestAnimationFrame(step);
    },
    [cancelAnimation]
  );

  const scrollToIndex = useCallback(
    (nextIndex) => {
      const next = clamp(nextIndex, 0, Math.max(0, sectionsCount - 1));
      const container = containerRef.current;
      if (!container) return;

      setIsScrolling(true);
      setIsTransitioning(true);
      setTransitionKey((k) => k + 1);
      setActiveIndex(next);

      const targetScroll = next * container.clientWidth;
      animateScrollTo(targetScroll, SCROLL_ANIM_MS);
    },
    [sectionsCount, animateScrollTo]
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
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
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

      if (key === "ArrowRight" || key === "ArrowDown" || key === "PageDown" || key === " ") {
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
      }, 60);
    }
  }, [activeIndex]);

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

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
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
        className="relative h-screen w-screen flex overflow-x-hidden overflow-y-hidden bg-transparent text-white"
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

        {/* Эффект затемнения в момент перелистывания */}
        {isTransitioning && (
          <div
            key={transitionKey}
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background: "radial-gradient(ellipse at center, rgba(10, 1, 3, 0.3) 0%, rgba(10, 1, 3, 0.35) 30%)",
              animation: `cinematicFade ${SCROLL_ANIM_MS}ms ease-in-out forwards`,
            }}
          />
        )}

        <style>{`
          @keyframes cinematicFade {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    </SectionNavContext.Provider>
  );
}