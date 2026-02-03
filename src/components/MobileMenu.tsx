import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenu = ({ isOpen, onToggle }: MobileMenuProps) => {
  const menuItems = [
    { label: "Features", href: "#features" },
    { label: "Technology", href: "#technology" },
    { label: "Specs", href: "#specs" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={onToggle}
        className="md:hidden relative z-50 p-2 -mr-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-6 flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-varg-white" />
          ) : (
            <Menu className="w-5 h-5 text-varg-white" />
          )}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-varg-black/90 backdrop-blur-md z-40 md:hidden"
              onClick={onToggle}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-0 right-0 z-40 px-6 py-8 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={onToggle}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-varg-white text-2xl font-medium tracking-tight hover:text-varg-accent transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-varg-white/10"
                >
                  <a
                    href="#"
                    onClick={onToggle}
                    className="inline-block px-6 py-3 bg-varg-white text-varg-black font-medium rounded-full text-base hover:bg-varg-light transition-colors"
                  >
                    Buy Now
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
