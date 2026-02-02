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
    [1, 1.1, 1, 1.15, 1]
  );

  // Reduced rings for mobile/low-perf devices
  const rings = isLowPerf
    ? [
        { size: 280, duration: 4, delay: 0 },
        { size: 360, duration: 5, delay: 1 },
      ]
    : [
        { size: 280, duration: 3, delay: 0 },
        { size: 320, duration: 3.5, delay: 0.5 },
        { size: 360, duration: 4, delay: 1 },
        { size: 400, duration: 4.5, delay: 1.5 },
        { size: 440, duration: 5, delay: 2 },
      ];

  // Skip animations entirely for reduced motion preference
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

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
      style={{
        opacity: ringOpacity,
        scale: ringScale,
        willChange: isLowPerf ? "auto" : "transform, opacity",
      }}
    >
      {/* Central glow - simplified on mobile */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isMobile ? 150 : 200,
          height: isMobile ? 150 : 200,
          background: "radial-gradient(circle, hsl(var(--varg-white) / 0.08) 0%, transparent 70%)",
        }}
        animate={isLowPerf ? undefined : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={isLowPerf ? undefined : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Expanding rings - reduced count on mobile */}
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-varg-white/20"
          style={{
            width: isMobile ? ring.size * 0.7 : ring.size,
            height: isMobile ? ring.size * 0.7 : ring.size,
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.6, 1.4, 1.8],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: ring.delay,
          }}
        />
      ))}

      {/* Inner pulsing rings - reduced on mobile */}
      {(isLowPerf ? [0] : [0, 1, 2]).map((i) => (
        <motion.div
          key={`inner-${i}`}
          className="absolute rounded-full"
          style={{
            width: (isMobile ? 130 : 180) + i * 40,
            height: (isMobile ? 130 : 180) + i * 40,
            border: `1px solid hsl(var(--varg-accent) / ${0.3 - i * 0.08})`,
            boxShadow: isLowPerf ? "none" : `0 0 ${20 - i * 5}px hsl(var(--varg-white) / 0.05)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Outer wave rings - skip on low-perf devices */}
      {!isLowPerf && [0, 1].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full"
          style={{
            width: 500 + i * 80,
            height: 500 + i * 80,
            background: `radial-gradient(circle, transparent 95%, hsl(var(--varg-white) / ${0.06 - i * 0.012}) 100%)`,
          }}
          animate={{
            scale: [0.8, 1.2],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1,
          }}
        />
      ))}

      {/* Accent arc segments - skip on mobile */}
      {!isMobile && [0, 90, 180, 270].map((rotation, i) => (
        <motion.div
          key={`arc-${i}`}
          className="absolute"
          style={{
            width: 300,
            height: 300,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-varg-white/30 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        </motion.div>
      ))}

      {/* Rotating accent ring - skip on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            border: "1px dashed hsl(var(--varg-white) / 0.1)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
};

export default AudioRings;
