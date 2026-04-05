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
    [0, 0.5, 0.25, 0.6, 0.3, 0.5, 0.4]
  );

  const centerOpacity = useTransform(scrollProgress, [0.1, 0.3, 0.8, 1], [0, 0.4, 0.4, 0]);

  // Reduced bar counts for smoother rendering
  const barCount = useMemo(() => (isMobile ? 4 : 6), [isMobile]);
  const centerBarCount = useMemo(() => (isMobile ? 8 : 16), [isMobile]);

  if (prefersReducedMotion) return null;

  const generateWaveBars = (count: number, side: "left" | "right") => {
    return Array.from({ length: count }, (_, i) => {
      const baseHeight = 20 + Math.sin(i * 0.8) * 12;
      return (
        <motion.div
          key={`${side}-${i}`}
          className="w-0.5 md:w-1 bg-gradient-to-t from-varg-white/10 via-varg-white/25 to-varg-white/10 rounded-full"
          style={{ height: `${baseHeight}px` }}
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
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
        style={{ opacity: waveOpacity }}
      >
        {generateWaveBars(barCount, "left")}
      </motion.div>

      {/* Right side waves */}
      <motion.div
        className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-1.5 z-[6]"
        style={{ opacity: waveOpacity }}
      >
        {generateWaveBars(barCount, "right")}
      </motion.div>

      {/* Center bottom wave - simplified */}
      {!isLowPerf && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end justify-center gap-0.5 md:gap-1 z-[6]"
          style={{ opacity: centerOpacity }}
        >
          {Array.from({ length: centerBarCount }, (_, i) => {
            const centerDistance = Math.abs(i - (centerBarCount / 2 - 0.5));
            const baseHeight = 25 - centerDistance * (isMobile ? 5 : 3);
            return (
              <motion.div
                key={`center-${i}`}
                className="w-0.5 md:w-1 bg-gradient-to-t from-transparent via-varg-accent/30 to-varg-white/15 rounded-full"
                style={{ height: `${Math.max(6, baseHeight)}px` }}
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5 + (centerDistance * 0.1),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }}
              />
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export default SoundWaves;
