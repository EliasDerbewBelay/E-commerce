import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductProps } from "@/interfaces";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Animation trigger
    setTimeout(() => setIsVisible(true), 100);

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Loading your shopping experience...
          </p>
        </div>
      </div>
    );
  }

  // 🧭 Not logged in: show demo products
  if (!user) {
    return (
      <div
        className={`min-h-screen transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span>✨</span>
              <span>New customers get 15% off their first order</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 block">
                Next Favorite
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Curated products from trusted brands. Shop with confidence and
              style that fits your life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/register"
                className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-yellow-600 hover:to-orange-600"
              >
                <span className="relative z-10">Start Shopping Now</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/login"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <span>Sign In</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>30-day returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked items our customers love. Quality you can trust at
                prices you'll appreciate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12 border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Shopping Experience?
              </h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Join thousands of satisfied customers who trust EllaMarket for
                quality products and exceptional service.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-black group"
              >
                <span>Create Your Account</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Fast & Free Shipping",
                  description:
                    "Free delivery on orders over $50. Get your items in 2-3 business days.",
                },
                {
                  icon: "🔒",
                  title: "Secure Shopping",
                  description:
                    "Your data is protected with bank-level security encryption.",
                },
                {
                  icon: "⭐",
                  title: "Premium Quality",
                  description:
                    "Every product is carefully selected and quality-checked.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Logged in: show personalized dashboard
  return (
    <div
      className={`min-h-screen transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Welcome Dashboard */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Welcome back!</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hello,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {user.email}
            </span>{" "}
            👋
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We're preparing your personalized shopping experience. In the
            meantime, explore our latest collections.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                label: "Items in Cart",
                value: "0",
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Wishlist Items",
                value: "0",
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Orders",
                value: "0",
                color: "from-green-500 to-emerald-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}
                >
                  <span className="text-white font-bold text-lg">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <span className="flex items-center space-x-2">
                <span>Browse Products</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href="/profile"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>View Profile</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recently Viewed
            </h2>
            <p className="text-gray-600">
              Your browsing history will appear here
            </p>
          </div>

          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No recent items
            </h3>
            <p className="text-gray-500 mb-6">
              Start shopping to see your recently viewed products here
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors duration-300"
            >
              <span>Start Shopping</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
