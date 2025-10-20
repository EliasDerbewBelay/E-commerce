import Link from "next/link";
import { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
    // You can add your subscription logic here
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">
                Ella<span className="text-yellow-400">Market</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted destination for quality products and exceptional
              shopping experiences. We're committed to bringing you the best
              deals with premium service.
            </p>
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "📘", url: "#" },
                { name: "Instagram", icon: "📷", url: "#" },
                { name: "Twitter", icon: "🐦", url: "#" },
                { name: "LinkedIn", icon: "💼", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Shop All", href: "/products" },
                { name: "New Arrivals", href: "/products?filter=new" },
                { name: "Best Sellers", href: "/products?filter=bestsellers" },
                { name: "On Sale", href: "/products?filter=sale" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns & Exchanges", href: "/returns" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and exclusive
              deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy
              </p>
            </form>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On orders over $50",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "256-bit SSL encryption",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "30-day return policy",
              },
              {
                icon: "⭐",
                title: "Quality Guarantee",
                desc: "Premium products",
              },
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {badge.title}
                  </h4>
                  <p className="text-gray-400 text-xs">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EllaMarket. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for shoppers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-2">
            <span className="text-lg">💬</span>
            <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap">
              <span className="pl-2">Need Help?</span>
            </span>
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
