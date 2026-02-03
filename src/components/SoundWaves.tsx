import { motion, MotionValue, useTransform } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

interface SoundWavesProps {
  scrollProgress: MotionValue<number>;
}

export const SoundWaves = ({ scrollProgress }: SoundWavesProps) => {
  const isMobile = useIsMobile();
  const { isLowPerf, prefersReducedMotion } = usePerformanceMode();

  const waveOpacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
    [0, 0.6, 0.3, 0.8, 0.4, 0.7, 0.5]
  );

  const waveScale = useTransform(
    scrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 1, 1.1, 1, 0.9]
  );

  // Move all useTransform calls to the top level
  const centerOpacity = useTransform(scrollProgress, [0.1, 0.3, 0.8, 1], [0, 0.5, 0.5, 0]);
  const dotsOpacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0, 0.4, 0.4, 0]);

  // Memoize bar counts based on device
  const barCount = useMemo(() => (isMobile ? 5 : 8), [isMobile]);
  const centerBarCount = useMemo(() => (isMobile ? 12 : 24), [isMobile]);
  const dotCount = useMemo(() => (isLowPerf ? 0 : isMobile ? 6 : 12), [isMobile, isLowPerf]);

  // Skip all animations for reduced motion preference
  if (prefersReducedMotion) {
    return null;
  }

  // Generate wave bars with varying heights
  const generateWaveBars = (count: number, side: "left" | "right") => {
    return Array.from({ length: count }, (_, i) => {
      const baseHeight = 20 + Math.sin(i * 0.8) * 15;
      const delay = i * 0.08;
      
      return (
        <motion.div
          key={`${side}-${i}`}
          className="w-0.5 md:w-1 bg-gradient-to-t from-varg-white/10 via-varg-white/30 to-varg-white/10 rounded-full"
          style={{
            height: `${baseHeight}px`,
          }}
          animate={{
            scaleY: isLowPerf ? [1, 1.3, 1] : [1, 1.5 + Math.random() * 0.5, 1, 1.3, 1],
            opacity: isLowPerf ? [0.3, 0.5, 0.3] : [0.3, 0.7, 0.4, 0.6, 0.3],
          }}
          transition={{
            duration: isLowPerf ? 2 : 1.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        />
      );
    });
  };

  return (
    <>
      {/* Left side waves */}
      <motion.div
        className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-1.5 z-[6]"
        style={{
          opacity: waveOpacity,
          scale: waveScale,
        }}
      >
        {generateWaveBars(barCount, "left")}
      </motion.div>

      {/* Right side waves */}
      <motion.div
        className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-1.5 z-[6]"
        style={{
          opacity: waveOpacity,
          scale: waveScale,
        }}
      >
        {generateWaveBars(barCount, "right")}
      </motion.div>

      {/* Center bottom wave visualization - simplified on mobile */}
      {!isLowPerf && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end justify-center gap-0.5 md:gap-1 z-[6]"
          style={{ opacity: centerOpacity }}
        >
          {Array.from({ length: centerBarCount }, (_, i) => {
            const centerDistance = Math.abs(i - (centerBarCount / 2 - 0.5));
            const baseHeight = 30 - centerDistance * (isMobile ? 4 : 2);
            
            return (
              <motion.div
                key={`center-${i}`}
                className="w-0.5 md:w-1 bg-gradient-to-t from-transparent via-varg-accent/40 to-varg-white/20 rounded-full"
                style={{
                  height: `${Math.max(8, baseHeight)}px`,
                }}
                animate={{
                  scaleY: [1, 1.8, 1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
                }}
                transition={{
                  duration: 2 + (centerDistance * 0.1),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            );
          })}
        </motion.div>
      )}

      {/* Floating frequency dots - skip on low-perf */}
      {dotCount > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{ opacity: dotsOpacity }}
        >
          {Array.from({ length: dotCount }, (_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-varg-white/30"
              style={{
                left: `${10 + (i % (isMobile ? 3 : 4)) * (isMobile ? 35 : 25)}%`,
                top: `${20 + Math.floor(i / (isMobile ? 3 : 4)) * 30}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default SoundWaves;
