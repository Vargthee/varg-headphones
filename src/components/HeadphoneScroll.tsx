import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import headphonesHero from "@/assets/headphones-hero.png";
import headphonesExploded from "@/assets/headphones-exploded.png";
import headphonesDriver from "@/assets/headphones-driver.png";

import ParallaxLayers from "./ParallaxLayers";
import SlitScanCanvas from "./SlitScanCanvas";
import ScrollTextOverlay from "./ScrollTextOverlay";
import SoundWaves from "./SoundWaves";
import AudioRings from "./AudioRings";

const images = [headphonesHero, headphonesExploded, headphonesDriver];

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-varg-black z-50">
    <div className="relative">
      <div className="w-16 h-16 border border-varg-white/20 rounded-full" />
      <div className="absolute inset-0 w-16 h-16 border-t border-varg-white/80 rounded-full animate-spin" />
    </div>
    <span className="absolute mt-24 text-caption">Loading experience...</span>
  </div>
);

export const HeadphoneScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0001,
  });

  // Preload images with priority
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        images.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = src;
              img.decoding = "async";
            })
        )
      );
      setLoadedImages(loaded);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", setCurrentProgress);
    return unsubscribe;
  }, [smoothProgress]);

  // Micro-interaction: subtle rotation based on scroll
  const imageRotation = useTransform(smoothProgress, [0, 0.5, 1], [0, 2, -1]);
  const imageScale = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [1, 1.02, 1.02, 0.98]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] bg-varg-black"
      style={{ contain: "layout style paint" }}
    >
      {!imagesLoaded && <LoadingSpinner />}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Parallax background layers */}
        <ParallaxLayers scrollYProgress={scrollYProgress} />
        
        {/* Sound visualization waves */}
        <SoundWaves scrollProgress={smoothProgress} />
        
        {/* Audio rings emanating from headphones */}
        <AudioRings scrollProgress={smoothProgress} />
        
        {/* Gradient spotlight overlay */}
        <div className="absolute inset-0 gradient-spotlight pointer-events-none z-[5]" />
        
        {/* Main canvas with slit-scan effect */}
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ 
            rotate: imageRotation,
            scale: imageScale,
            transform: "translateZ(0)",
          }}
        >
          <SlitScanCanvas 
            images={loadedImages}
            progress={smoothProgress}
            isLoaded={imagesLoaded}
          />
        </motion.div>

        {/* Text overlays with enhanced animations */}
        <ScrollTextOverlay progress={currentProgress} start={0} end={0.22} align="center">
          <motion.span 
            className="text-caption mb-4"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Premium Audio
          </motion.span>
          <h1 className="text-hero text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none">
            Varg X.
          </h1>
          <p className="text-hero text-3xl md:text-4xl lg:text-5xl mt-2 opacity-60">
            Pure Sound.
          </p>
        </ScrollTextOverlay>

        <ScrollTextOverlay progress={currentProgress} start={0.28} end={0.50} align="left">
          <span className="text-caption mb-4">Engineering</span>
          <h2 className="text-hero text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
            Precision<br />Engineering.
          </h2>
          <p className="text-body text-lg md:text-xl max-w-md mt-4">
            Every component meticulously designed for acoustic perfection.
          </p>
        </ScrollTextOverlay>

        <ScrollTextOverlay progress={currentProgress} start={0.55} end={0.78} align="right">
          <span className="text-caption mb-4">Technology</span>
          <h2 className="text-hero text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
            Titanium<br />Drivers.
          </h2>
          <p className="text-body text-lg md:text-xl max-w-md mt-4">
            50mm titanium-coated drivers deliver unparalleled clarity across the entire frequency spectrum.
          </p>
        </ScrollTextOverlay>

        <ScrollTextOverlay progress={currentProgress} start={0.82} end={1} align="center">
          <span className="text-caption mb-4">Experience</span>
          <h2 className="text-hero text-5xl md:text-6xl lg:text-7xl leading-tight">
            Hear Everything.
          </h2>
          <motion.button
            className="mt-8 px-8 py-4 bg-varg-white text-varg-black font-medium rounded-full text-lg hover:bg-varg-light transition-colors pointer-events-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Pre-order Now
          </motion.button>
        </ScrollTextOverlay>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentProgress < 0.08 ? 1 : 0,
            y: currentProgress < 0.08 ? 0 : 20,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="text-caption">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border border-varg-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-3 bg-varg-white/60 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-varg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-varg-white/40 to-varg-white/60"
            style={{ 
              width: `${currentProgress * 100}%`,
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadphoneScroll;
