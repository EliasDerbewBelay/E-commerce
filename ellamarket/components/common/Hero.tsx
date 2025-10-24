import {
  ArrowRight,
  Truck,
  Shield,
  Star,
  ShoppingBag,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const Hero: React.FC = () => {
  return (
    <>
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
                  <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
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
    </>
  );
};

export default Hero;
