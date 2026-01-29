import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-20 px-6 md:px-12 bg-zenith-black border-t border-zenith-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-hero text-2xl mb-4">ZENITH</h3>
            <p className="text-body max-w-md">
              Premium audio engineering for those who demand perfection. Experience sound as the artist intended.
            </p>
          </div>
          
          <div>
            <h4 className="text-caption mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">Zenith X</a></li>
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">Zenith Pro</a></li>
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-caption mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">Warranty</a></li>
              <li><a href="#" className="text-body hover:text-zenith-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zenith-white/5">
          <p className="text-body text-sm">
            © 2025 Zenith Audio. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-body hover:text-zenith-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-body hover:text-zenith-white transition-colors text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
