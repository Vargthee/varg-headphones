import { motion } from "framer-motion";

interface ScrollTextOverlayProps {
  children: React.ReactNode;
  progress: number;
  start: number;
  end: number;
  align?: "left" | "center" | "right";
}

export const ScrollTextOverlay = ({ 
  children, 
  progress, 
  start, 
  end, 
  align = "center" 
}: ScrollTextOverlayProps) => {
  const fadeIn = start;
  const fadeInEnd = start + 0.06;
  const fadeOutStart = end - 0.06;
  const fadeOut = end;

  let opacity = 0;
  let y = 40;
  let scale = 0.95;
  let blur = 4;

  if (progress >= fadeIn && progress < fadeInEnd) {
    const t = easeOutCubic((progress - fadeIn) / (fadeInEnd - fadeIn));
    opacity = t;
    y = 40 * (1 - t);
    scale = 0.95 + 0.05 * t;
    blur = 4 * (1 - t);
  } else if (progress >= fadeInEnd && progress < fadeOutStart) {
    opacity = 1;
    y = 0;
    scale = 1;
    blur = 0;
  } else if (progress >= fadeOutStart && progress <= fadeOut) {
    const t = easeInCubic((progress - fadeOutStart) / (fadeOut - fadeOutStart));
    opacity = 1 - t;
    y = -30 * t;
    scale = 1 - 0.05 * t;
    blur = 4 * t;
  }

  const alignmentClasses = {
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    center: "items-center text-center",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[align]} pointer-events-none z-10 will-change-transform`}
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale}) translateZ(0)`,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
      }}
    >
      {children}
    </div>
  );
};

// Easing functions for smoother animations
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}

export default ScrollTextOverlay;
