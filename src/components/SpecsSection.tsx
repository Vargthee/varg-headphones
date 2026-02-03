import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specs = [
  { label: "Driver Size", value: "50mm" },
  { label: "Frequency Response", value: "4Hz - 40kHz" },
  { label: "Impedance", value: "32Ω" },
  { label: "Sensitivity", value: "105dB" },
  { label: "Battery Life", value: "40 hours" },
  { label: "Weight", value: "250g" },
  { label: "Bluetooth", value: "5.3" },
  { label: "Codec Support", value: "LDAC, aptX HD" },
];

const technologyFeatures = [
  {
    title: "Planar Magnetic Drivers",
    description: "Ultra-thin diaphragm delivers pristine audio with zero distortion across the entire frequency range.",
  },
  {
    title: "Adaptive EQ",
    description: "Machine learning algorithms analyze your ear shape and adjust sound profile for personalized audio.",
  },
  {
    title: "Low-Latency Codec",
    description: "16ms audio delay ensures perfect lip-sync for gaming and video content.",
  },
];

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="technology" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-varg-dark/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span 
            className="text-caption inline-block text-xs sm:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Technology
          </motion.span>
          <motion.h2 
            className="text-hero text-3xl sm:text-4xl md:text-5xl mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engineering Excellence
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {technologyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card p-6 sm:p-8 group hover:bg-varg-dark/70 transition-all duration-500"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-varg-accent/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-varg-accent/20 transition-colors">
                <span className="text-varg-accent font-semibold text-sm sm:text-base">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-hero text-lg sm:text-xl mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-body text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SpecsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <TechnologySection />
      <section id="specs" ref={ref} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-varg-black border-t border-varg-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              className="text-caption inline-block text-xs sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Specifications
            </motion.span>
            <motion.h2 
              className="text-hero text-3xl sm:text-4xl md:text-5xl mt-3 sm:mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Technical Details
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-varg-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                className="bg-varg-black p-4 sm:p-6 md:p-8 hover:bg-varg-dark/50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-caption text-xs sm:text-sm mb-1 sm:mb-2">{spec.label}</p>
                <motion.p 
                  className="text-hero text-lg sm:text-2xl md:text-3xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                >
                  {spec.value}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecsSection;
