import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Active Noise Cancellation",
    description: "AI-powered noise cancellation adapts to your environment in real-time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M9.5 4.5L4.5 9.5M14.5 4.5L19.5 9.5M4.5 14.5L9.5 19.5M19.5 14.5L14.5 19.5M12 12L12 12.01" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "40-Hour Battery",
    description: "Marathon listening sessions with quick charge getting you 5 hours in 10 minutes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 11v2" strokeLinecap="round" />
        <path d="M7 11v2M11 10v4M15 9v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Spatial Audio",
    description: "Immersive 360° sound that moves with you through head tracking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" strokeLinecap="round" />
        <path d="M12 6c3.31 0 6 2.69 6 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Premium Materials",
    description: "Aircraft-grade aluminum and memory foam for comfort that lasts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 sm:p-8 group hover:bg-varg-dark/70 transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-varg-accent mb-4 sm:mb-6 group-hover:text-varg-light transition-colors">
        {feature.icon}
      </div>
      <h3 className="text-hero text-lg sm:text-xl mb-2 sm:mb-3">{feature.title}</h3>
      <p className="text-body text-sm sm:text-base">{feature.description}</p>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="features" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-varg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span 
            className="text-caption inline-block text-xs sm:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Features
          </motion.span>
          <motion.h2 
            className="text-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crafted for Perfection
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
