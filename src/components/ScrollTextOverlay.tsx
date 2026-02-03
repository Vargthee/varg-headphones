import { useMemo } from "react";

interface ScrollTextOverlayProps {
  children: React.ReactNode;
  progress: number;
  start: number;
  end: number;
  align?: "left" | "center" | "right";
}

// Easing functions for smoother animations
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number): number => t * t * t;

export const ScrollTextOverlay = ({ 
  children, 
  progress, 
  start, 
  end, 
  align = "center" 
}: ScrollTextOverlayProps) => {
  const styles = useMemo(() => {
    const fadeIn = start;
    const fadeInEnd = start + 0.08;
    const fadeOutStart = end - 0.08;
    const fadeOut = end;

    let opacity = 0;
    let y = 30;
    let scale = 0.98;

    if (progress >= fadeIn && progress < fadeInEnd) {
      const t = easeOutCubic((progress - fadeIn) / (fadeInEnd - fadeIn));
      opacity = t;
      y = 30 * (1 - t);
      scale = 0.98 + 0.02 * t;
    } else if (progress >= fadeInEnd && progress < fadeOutStart) {
      opacity = 1;
      y = 0;
      scale = 1;
    } else if (progress >= fadeOutStart && progress <= fadeOut) {
      const t = easeInCubic((progress - fadeOutStart) / (fadeOut - fadeOutStart));
      opacity = 1 - t;
      y = -20 * t;
      scale = 1 - 0.02 * t;
    }

    return { opacity, y, scale };
  }, [progress, start, end]);

  const alignmentClasses = {
    left: "items-start text-left px-4 sm:pl-8 md:pl-16 lg:pl-24",
    center: "items-center text-center px-4",
    right: "items-end text-right px-4 sm:pr-8 md:pr-16 lg:pr-24",
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[align]} pointer-events-none z-10`}
      style={{
        opacity: styles.opacity,
        transform: `translate3d(0, ${styles.y}px, 0) scale(${styles.scale})`,
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollTextOverlay;
