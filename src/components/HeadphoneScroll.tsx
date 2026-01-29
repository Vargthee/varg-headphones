import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import headphonesHero from "@/assets/headphones-hero.png";
import headphonesExploded from "@/assets/headphones-exploded.png";
import headphonesDriver from "@/assets/headphones-driver.png";

const images = [headphonesHero, headphonesExploded, headphonesDriver];

interface TextOverlayProps {
  children: React.ReactNode;
  progress: number;
  start: number;
  end: number;
  align?: "left" | "center" | "right";
}

const TextOverlay = ({ children, progress, start, end, align = "center" }: TextOverlayProps) => {
  const fadeIn = start;
  const fadeInEnd = start + 0.08;
  const fadeOutStart = end - 0.08;
  const fadeOut = end;

  let opacity = 0;
  let y = 30;

  if (progress >= fadeIn && progress < fadeInEnd) {
    const t = (progress - fadeIn) / (fadeInEnd - fadeIn);
    opacity = t;
    y = 30 * (1 - t);
  } else if (progress >= fadeInEnd && progress < fadeOutStart) {
    opacity = 1;
    y = 0;
  } else if (progress >= fadeOutStart && progress <= fadeOut) {
    const t = (progress - fadeOutStart) / (fadeOut - fadeOutStart);
    opacity = 1 - t;
    y = -30 * t;
  }

  const alignmentClasses = {
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    center: "items-center text-center",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[align]} pointer-events-none z-10`}
      style={{
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload images
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
            })
        )
      );
      setLoadedImages(loaded);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Draw to canvas based on scroll
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || loadedImages.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvas = () => {
      const progress = smoothProgress.get();
      
      // Determine which image to show based on progress
      let imageIndex: number;
      let crossfadeOpacity = 1;
      
      if (progress < 0.25) {
        imageIndex = 0;
      } else if (progress < 0.35) {
        imageIndex = 0;
        const t = (progress - 0.25) / 0.1;
        crossfadeOpacity = 1 - t;
      } else if (progress < 0.55) {
        imageIndex = 1;
      } else if (progress < 0.65) {
        imageIndex = 1;
        const t = (progress - 0.55) / 0.1;
        crossfadeOpacity = 1 - t;
      } else if (progress < 0.85) {
        imageIndex = 2;
      } else {
        imageIndex = 2;
        const t = (progress - 0.85) / 0.15;
        crossfadeOpacity = 1 - t;
      }

      let nextImageIndex: number | null = null;
      if (progress >= 0.25 && progress < 0.35) {
        nextImageIndex = 1;
      } else if (progress >= 0.55 && progress < 0.65) {
        nextImageIndex = 2;
      } else if (progress >= 0.85) {
        nextImageIndex = 0;
      }

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawImageCentered = (img: HTMLImageElement, opacity: number) => {
        ctx.globalAlpha = opacity;
        
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        ) * 0.85;
        
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
        ctx.globalAlpha = 1;
      };

      if (loadedImages[imageIndex]) {
        drawImageCentered(loadedImages[imageIndex], crossfadeOpacity);
      }

      if (nextImageIndex !== null && loadedImages[nextImageIndex]) {
        drawImageCentered(loadedImages[nextImageIndex], 1 - crossfadeOpacity);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      updateCanvas();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const unsubscribe = smoothProgress.on("change", updateCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [imagesLoaded, loadedImages, smoothProgress]);

  const progress = useTransform(smoothProgress, (v) => v);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", setCurrentProgress);
    return unsubscribe;
  }, [progress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-varg-black">
      {!imagesLoaded && <LoadingSpinner />}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight pointer-events-none z-[5]" />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#050505" }}
        />

        <TextOverlay progress={currentProgress} start={0} end={0.22} align="center">
          <motion.span className="text-caption mb-4">Premium Audio</motion.span>
          <h1 className="text-hero text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none">
            Varg X.
          </h1>
          <p className="text-hero text-3xl md:text-4xl lg:text-5xl mt-2 opacity-60">
            Pure Sound.
          </p>
        </TextOverlay>

        <TextOverlay progress={currentProgress} start={0.28} end={0.50} align="left">
          <span className="text-caption mb-4">Engineering</span>
          <h2 className="text-hero text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
            Precision<br />Engineering.
          </h2>
          <p className="text-body text-lg md:text-xl max-w-md mt-4">
            Every component meticulously designed for acoustic perfection.
          </p>
        </TextOverlay>

        <TextOverlay progress={currentProgress} start={0.55} end={0.78} align="right">
          <span className="text-caption mb-4">Technology</span>
          <h2 className="text-hero text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
            Titanium<br />Drivers.
          </h2>
          <p className="text-body text-lg md:text-xl max-w-md mt-4">
            50mm titanium-coated drivers deliver unparalleled clarity across the entire frequency spectrum.
          </p>
        </TextOverlay>

        <TextOverlay progress={currentProgress} start={0.82} end={1} align="center">
          <span className="text-caption mb-4">Experience</span>
          <h2 className="text-hero text-5xl md:text-6xl lg:text-7xl leading-tight">
            Hear Everything.
          </h2>
          <motion.button
            className="mt-8 px-8 py-4 bg-varg-white text-varg-black font-medium rounded-full text-lg hover:bg-varg-light transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Pre-order Now
          </motion.button>
        </TextOverlay>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentProgress < 0.1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-caption">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border border-varg-white/30 rounded-full flex items-start justify-center p-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-varg-white/60 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-varg-white/10">
          <motion.div
            className="h-full bg-varg-white/40"
            style={{ width: `${currentProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadphoneScroll;
