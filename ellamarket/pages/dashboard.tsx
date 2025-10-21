import { ProductProps } from "@/interfaces";
import ProductCard from "@/components/common/productCard";
import { useEffect, useState } from "react";


const Dashboard: React.FC = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Products ...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>
      {product.length === 0 ? (
        <p>No Product is available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {product.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
