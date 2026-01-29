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

export const SpecsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 bg-varg-black border-t border-varg-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-caption">Specifications</span>
          <h2 className="text-hero text-4xl md:text-5xl mt-4">
            Technical Details
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-varg-white/10 rounded-2xl overflow-hidden">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              className="bg-varg-black p-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <p className="text-caption mb-2">{spec.label}</p>
              <p className="text-hero text-2xl md:text-3xl">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
