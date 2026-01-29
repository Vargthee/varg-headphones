import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="text-hero text-xl font-semibold tracking-tight">
          ZENITH
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-body hover:text-zenith-white/90 transition-colors text-sm">
            Features
          </a>
          <a href="#technology" className="text-body hover:text-zenith-white/90 transition-colors text-sm">
            Technology
          </a>
          <a href="#specs" className="text-body hover:text-zenith-white/90 transition-colors text-sm">
            Specs
          </a>
        </div>

        {/* CTA */}
        <motion.button
          className="px-5 py-2 border border-zenith-white/20 rounded-full text-sm text-zenith-white/80 hover:bg-zenith-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy Now
        </motion.button>
      </nav>
    </motion.header>
  );
};

export default Header;
