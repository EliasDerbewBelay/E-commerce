import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-xl shadow-lg">
                <h1 className="font-bold text-2xl text-slate-900">E</h1>
              </div>
              <h1 className="font-bold text-2xl text-white">
                Ella<span className="text-yellow-400">Market</span>
              </h1>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Your one-stop destination for quality products at unbeatable
              prices. We're committed to providing the best shopping experience
              with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/shipping"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="/size-guide"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-slate-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300">
                  123 Commerce Street, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300">support@ellamarket.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-white">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:border-yellow-400 text-white placeholder-slate-400"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-4 py-2 rounded-r-lg font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              <p>
                &copy; {currentYear} EllaMarket. All rights reserved. | Designed
                by Elias Derbew
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white p-1 rounded">
                  <span className="text-xs font-bold text-slate-700 px-2">
                    VISA
                  </span>
                </div>
                <div className="bg-white p-1 rounded">
                  <span className="text-xs font-bold text-slate-700 px-2">
                    MC
                  </span>
                </div>
                <div className="bg-white p-1 rounded">
                  <span className="text-xs font-bold text-slate-700 px-2">
                    PP
                  </span>
                </div>
                <div className="bg-white p-1 rounded">
                  <span className="text-xs font-bold text-slate-700 px-2">
                    AMEX
                  </span>
                </div>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
