import { useRef, useEffect, useCallback, useState } from "react";
import { MotionValue } from "framer-motion";

interface SlitScanCanvasProps {
  images: HTMLImageElement[];
  progress: MotionValue<number>;
  isLoaded: boolean;
}

// Detect if device is mobile/low-power
const getDevicePerformance = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { isMobile, isLowPerf: isMobile || hasLowMemory, prefersReducedMotion };
};

export const SlitScanCanvas = ({ images, progress, isLoaded }: SlitScanCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastProgressRef = useRef<number>(0);
  const [devicePerf] = useState(getDevicePerformance);

  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, currentProgress: number) => {
    const { isMobile, isLowPerf, prefersReducedMotion } = devicePerf;
    
    // Use lower DPR on mobile for performance
    const dpr = isLowPerf ? Math.min(window.devicePixelRatio || 1, 2) : window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Clear with GPU-friendly solid color
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (images.length === 0) return;

    // Calculate image transitions with slit-scan effect
    let primaryIndex: number;
    let secondaryIndex: number | null = null;
    let transitionProgress = 0;
    let slitScanIntensity = 0;

    if (currentProgress < 0.25) {
      primaryIndex = 0;
    } else if (currentProgress < 0.35) {
      primaryIndex = 0;
      secondaryIndex = 1;
      transitionProgress = (currentProgress - 0.25) / 0.1;
      slitScanIntensity = Math.sin(transitionProgress * Math.PI) * 0.3;
    } else if (currentProgress < 0.55) {
      primaryIndex = 1;
    } else if (currentProgress < 0.65) {
      primaryIndex = 1;
      secondaryIndex = 2;
      transitionProgress = (currentProgress - 0.55) / 0.1;
      slitScanIntensity = Math.sin(transitionProgress * Math.PI) * 0.3;
    } else if (currentProgress < 0.85) {
      primaryIndex = 2;
    } else {
      primaryIndex = 2;
      secondaryIndex = 0;
      transitionProgress = (currentProgress - 0.85) / 0.15;
      slitScanIntensity = Math.sin(transitionProgress * Math.PI) * 0.2;
    }

    const drawImageWithEffects = (
      img: HTMLImageElement, 
      opacity: number, 
      slitOffset: number = 0,
      scaleOffset: number = 0
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;

      const baseScale = 0.85 + scaleOffset;
      const scale = Math.min(width / img.width, height / img.height) * baseScale;
      
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (width - w) / 2;
      const y = (height - h) / 2;

      // Slit-scan effect: draw image in horizontal slices with offset
      // Skip slit-scan on reduced motion or use fewer slices on mobile
      if (slitOffset > 0 && !prefersReducedMotion) {
        const sliceCount = isLowPerf ? 10 : 20;
        const sliceHeight = h / sliceCount;
        
        for (let i = 0; i < sliceCount; i++) {
          const sliceY = y + i * sliceHeight;
          const offset = Math.sin((i / sliceCount) * Math.PI * 2 + currentProgress * 10) * slitOffset * (isLowPerf ? 15 : 30);
          
          ctx.drawImage(
            img,
            0, (i / sliceCount) * img.height,
            img.width, img.height / sliceCount,
            x + offset, sliceY,
            w, sliceHeight + 1
          );
        }
      } else {
        ctx.drawImage(img, x, y, w, h);
      }

      ctx.restore();
    };

    // Draw primary image
    if (images[primaryIndex]) {
      const primaryOpacity = secondaryIndex !== null ? 1 - transitionProgress : 1;
      const primaryScale = secondaryIndex !== null ? -transitionProgress * 0.05 : 0;
      drawImageWithEffects(
        images[primaryIndex], 
        primaryOpacity, 
        isLowPerf ? slitScanIntensity * 0.5 : slitScanIntensity,
        primaryScale
      );
    }

    // Draw secondary image (crossfade)
    if (secondaryIndex !== null && images[secondaryIndex]) {
      drawImageWithEffects(
        images[secondaryIndex], 
        transitionProgress, 
        isLowPerf ? slitScanIntensity * 0.3 : slitScanIntensity * 0.5,
        (1 - transitionProgress) * 0.05
      );
    }

    // Skip chromatic aberration on low-perf devices
    if (!isLowPerf && transitionProgress > 0 && transitionProgress < 1) {
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = slitScanIntensity * 0.15;
      
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(2, 0, width, height);
      
      ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
      ctx.fillRect(-2, 0, width, height);
      
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }
  }, [images, devicePerf]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const { isLowPerf } = devicePerf;
    
    const ctx = canvas.getContext("2d", { 
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = isLowPerf ? Math.min(window.devicePixelRatio || 1, 2) : window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawFrame(ctx, canvas, lastProgressRef.current);
    };

    // Throttle updates on mobile for smoother performance
    let lastUpdateTime = 0;
    const throttleMs = isLowPerf ? 16 : 0; // ~60fps cap on mobile

    const handleProgress = (value: number) => {
      const now = performance.now();
      if (now - lastUpdateTime < throttleMs) return;
      lastUpdateTime = now;
      
      lastProgressRef.current = value;
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      animationRef.current = requestAnimationFrame(() => {
        drawFrame(ctx, canvas, value);
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const unsubscribe = progress.on("change", handleProgress);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, images, progress, drawFrame, devicePerf]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full will-change-transform"
      style={{ 
        background: "#050505",
        transform: "translateZ(0)", // Force GPU layer
      }}
    />
  );
};

export default SlitScanCanvas;
