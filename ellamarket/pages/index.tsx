import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ProductProps } from "@/interface";
import Link from "next/link";
import ProductCard from "@/components/productCards/ProductCard";
import Hero from "@/components/common/Hero";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <Hero />
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular items
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading products...</p>
            </div>
          )}

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
    </div>
  );
};

export default Home;
