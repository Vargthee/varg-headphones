import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxLayerProps {
  scrollYProgress: MotionValue<number>;
}

export const ParallaxLayers = ({ scrollYProgress }: ParallaxLayerProps) => {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Different parallax speeds for depth effect
  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const y3 = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  
  const opacity1 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.15, 0.25, 0.15, 0.05]);
  const opacity2 = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.2, 0.05]);
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.1, 1.2]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep background layer */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: y1,
          opacity: opacity1,
          transform: "translateZ(0)",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-varg-white/10 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-varg-accent/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Mid layer - floating particles */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: y2,
          scale: scale1,
          transform: "translateZ(0)",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-varg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground subtle grid */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: y3,
          opacity: opacity2,
          transform: "translateZ(0)",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--varg-white) / 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--varg-white) / 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--varg-black)) 70%)",
        }}
      />
    </div>
  );
};

export default ParallaxLayers;
