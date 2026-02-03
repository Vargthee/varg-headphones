import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-varg-black border-t border-varg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="col-span-2">
            <h3 className="text-hero text-xl sm:text-2xl mb-3 sm:mb-4">VARG</h3>
            <p className="text-body text-sm sm:text-base max-w-md">
              Premium audio engineering for those who demand perfection. Experience sound as the artist intended.
            </p>
          </div>
          
          <div>
            <h4 className="text-caption text-xs sm:text-sm mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">Varg X</a></li>
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">Varg Pro</a></li>
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-caption text-xs sm:text-sm mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">Warranty</a></li>
              <li><a href="#" className="text-body text-sm sm:text-base hover:text-varg-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-varg-white/5 gap-4">
          <p className="text-body text-xs sm:text-sm text-center sm:text-left">
            © 2025 Varg Audio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-body hover:text-varg-white transition-colors text-xs sm:text-sm">Privacy</a>
            <a href="#" className="text-body hover:text-varg-white transition-colors text-xs sm:text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
