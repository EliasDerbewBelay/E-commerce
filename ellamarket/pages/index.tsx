import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductProps } from "@/interfaces";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(8);
      if (!error && data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <section className="text-center py-16 ">
        <h1 className="text-4xl font-bold mb-4">Welcome to EllaMarket</h1>
        <p className="text-gray-600 mb-10">
          Discover premium products curated just for you.
        </p>
        <Link
          href="/products"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
        >
          Browse All Products
        </Link>
      </section>

      <section className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </MainLayout>
  );
}
