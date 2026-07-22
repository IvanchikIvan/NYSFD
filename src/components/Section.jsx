import React, { forwardRef, memo, useEffect, useRef } from "react";

/**
 * Assigns a DOM node to a forwarded ref (callback ref or object ref).
 */
function assignRef(ref, value) {
  if (!ref) return;
  if (typeof ref === "function") ref(value);
  else ref.current = value;
}

/**
 * Base full-screen section.
 * Props:
 * - id: string
 * - children: ReactNode
 * - className?: string
 * - onVisible?: () => void
 *
 * Notes:
 * - Uses IntersectionObserver to call onVisible when at least 60% is visible.
 * - Adds padding for optional header/footer offsets via CSS variables.
 * - Adds data-attributes for testing.
 */
const Section = memo(
  forwardRef(function Section(
    { id, children, className = "", onVisible },
    forwardedRef
  ) {
    const localRef = useRef(null);
    const hasFiredVisibleRef = useRef(false);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;

      // Fire once in non-supporting environments.
      if (!("IntersectionObserver" in window)) {
        if (onVisible && !hasFiredVisibleRef.current) {
          hasFiredVisibleRef.current = true;
          onVisible();
        }
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
              if (onVisible && !hasFiredVisibleRef.current) {
                hasFiredVisibleRef.current = true;
                onVisible();
              }
            }
          }
        },
        { threshold: [0.6] }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [onVisible]);

    useEffect(() => {
      assignRef(forwardedRef, localRef.current);
      return () => assignRef(forwardedRef, null);
    }, [forwardedRef]);

    return (
      <section
        id={id}
        ref={localRef}
        role="region"
        aria-label={id}
        tabIndex={-1}
        data-testid={`section-${id}`}
        data-section-id={id}
        className={[
          "box-border h-screen w-screen min-w-0 flex-shrink-0",
          "pt-[var(--app-header-offset)] pb-[var(--app-footer-offset)]",
          "outline-none",
          className,
        ].join(" ")}
      >
        <div className="section-color-wash" aria-hidden="true" />
        <div className="section-transition" aria-hidden="true" />
        {children}
      </section>
    );
  })
);

export default Section;
