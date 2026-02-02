import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function usePerformanceMode() {
  const [isLowPerf, setIsLowPerf] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect low-performance devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    const hasSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    setIsLowPerf(isMobile || hasLowMemory || hasSlowCPU || prefersReducedMotion);
  }, [prefersReducedMotion]);

  return { isLowPerf, prefersReducedMotion };
}
