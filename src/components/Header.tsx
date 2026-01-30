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
        <a href="/" className="text-hero text-xl font-semibold tracking-tight">
          VARG
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="text-body hover:text-varg-white/90 transition-colors text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-varg-white/50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Features
          </a>
          <a 
            href="#technology" 
            className="text-body hover:text-varg-white/90 transition-colors text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-varg-white/50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Technology
          </a>
          <a 
            href="#specs" 
            className="text-body hover:text-varg-white/90 transition-colors text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-varg-white/50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Specs
          </a>
        </div>

        <motion.button
          className="px-5 py-2 border border-varg-white/20 rounded-full text-sm text-varg-white/80 hover:bg-varg-white/10 transition-colors"
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
