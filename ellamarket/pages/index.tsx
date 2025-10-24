import { useState, useEffect } from "react";
import {
  ArrowRight,
  Truck,
  Shield,
  Star,
  Heart,
  ShoppingBag,
  Eye,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quickView, setQuickView] = useState<number | null>(null);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Helper function to determine if product is new (less than 7 days old)
  const isProductNew = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdDate > sevenDaysAgo;
  };

  // Helper function to determine stock status
  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-100" };
    if (stock < 10)
      return {
        text: "Low Stock",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    return { text: "In Stock", color: "text-green-600", bg: "bg-green-100" };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Rated 4.9/5 by 10,000+ shoppers
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
                  Welcome to Ella<span className="text-yellow-500">Market</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                  Discover quality products at amazing prices. Enjoy{" "}
                  <span className="font-semibold text-slate-900">
                    free shipping
                  </span>{" "}
                  on orders over $50 and our{" "}
                  <span className="font-semibold text-slate-900">
                    30-day happiness guarantee
                  </span>
                  .
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                  <ShoppingBag className="w-6 h-6" />
                  Start Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  View Best Sellers
                  <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center gap-4 text-slate-700 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-slate-500">Orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-700 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-sm text-slate-500">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-700 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-slate-500">30-day guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
                <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-8 text-white text-center">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">
                      Summer Collection
                    </h3>
                    <p className="text-slate-200 mb-6">
                      Fresh styles for the season ahead
                    </p>
                    <div className="bg-yellow-400 text-slate-900 py-3 px-6 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors duration-200 cursor-pointer">
                      Explore Collection
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-3 -left-3 bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Fast Delivery</p>
                      <p className="text-xs text-slate-500">2-3 days</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
                  <div className="text-center">
                    <div className="bg-yellow-100 text-yellow-600 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1">
                      <span className="font-bold text-sm">NEW</span>
                    </div>
                    <p className="font-semibold text-xs">Arrivals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular items
            </p>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const isNew = isProductNew(product.created_at);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-slate-300 relative"
                  >
                    {/* Product Image Container */}
                    <div className="relative overflow-hidden bg-slate-100">
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                          wishlist.includes(product.id)
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-white/90 text-slate-700 hover:bg-white hover:shadow-md"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 transition-all duration-300 ${
                            wishlist.includes(product.id)
                              ? "fill-current scale-110"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Quick View Button */}
                      <button
                        onMouseEnter={() => setQuickView(product.id)}
                        onMouseLeave={() => setQuickView(null)}
                        className="absolute top-3 left-3 z-10 p-2 rounded-xl bg-white/90 text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                      </div>

                      {/* Status Badges */}
                      <div className="absolute bottom-3 left-3 flex flex-col gap-2">
                        {isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                            NEW
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${stockStatus.bg} ${stockStatus.color}`}
                        >
                          {stockStatus.text}
                        </span>
                      </div>

                      {/* Quick View Panel */}
                      {quickView === product.id && (
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg transform transition-all duration-300">
                          <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      {/* Product Name */}
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors duration-200 leading-tight">
                        {product.name}
                      </h3>

                      {/* Product Description */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-slate-900">
                            ${product.price}
                          </span>
                        </div>

                        <button
                          disabled={product.stock === 0}
                          className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 group/btn"
                        >
                          <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </button>
                      </div>

                      {/* Stock Information */}
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{product.stock} available</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              Updated{" "}
                              {new Date(
                                product.updated_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading products...</p>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/products">
              <button className="bg-white text-slate-900 border-2 border-slate-300 px-8 py-4 rounded-2xl font-semibold hover:border-slate-400 hover:bg-slate-50 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3 shadow-sm hover:shadow-md">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
