import { motion, MotionValue, useTransform } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface AudioRingsProps {
  scrollProgress: MotionValue<number>;
}

export const AudioRings = ({ scrollProgress }: AudioRingsProps) => {
  const isMobile = useIsMobile();
  const { isLowPerf, prefersReducedMotion } = usePerformanceMode();
  
  const ringOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
    [0.3, 0.6, 0.4, 0.7, 0.5, 0.8, 0.4]
  );

  const ringScale = useTransform(
    scrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.05, 1, 1.08, 1]
  );

  if (prefersReducedMotion) {
    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
        style={{ opacity: ringOpacity }}
      >
        <div
          className="absolute rounded-full border border-varg-white/10"
          style={{ width: 300, height: 300 }}
        />
      </motion.div>
    );
  }

  // Drastically reduced ring count for smoothness
  const rings = isLowPerf
    ? [{ size: 300, duration: 5, delay: 0 }]
    : [
        { size: 280, duration: 4, delay: 0 },
        { size: 360, duration: 5, delay: 1.2 },
        { size: 440, duration: 6, delay: 2.4 },
      ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
      style={{
        opacity: ringOpacity,
        scale: ringScale,
      }}
    >
      {/* Central glow - CSS only, no animation */}
      <div
        className="absolute rounded-full"
        style={{
          width: isMobile ? 150 : 200,
          height: isMobile ? 150 : 200,
          background: "radial-gradient(circle, hsl(var(--varg-white) / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Expanding rings - reduced count */}
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-varg-white/15"
          style={{
            width: isMobile ? ring.size * 0.7 : ring.size,
            height: isMobile ? ring.size * 0.7 : ring.size,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.4, 1.8],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: ring.delay,
          }}
        />
      ))}

      {/* Single inner pulsing ring */}
      {!isLowPerf && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: isMobile ? 130 : 180,
            height: isMobile ? 130 : 180,
            border: "1px solid hsl(var(--varg-accent) / 0.25)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Rotating accent ring - desktop only, single element */}
      {!isMobile && !isLowPerf && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            border: "1px dashed hsl(var(--varg-white) / 0.08)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
};

export default AudioRings;
