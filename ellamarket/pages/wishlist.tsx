"use client";

import { useEffect, useState } from "react";
import {
  getWishListForCurrentUser,
  removeFromWishlistById,
} from "@/services/wishlistService";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    const res = await getWishListForCurrentUser();

    if (res.error) toast.error(res.error.message);
    else setItems(res.data || []);

    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id: number) => {
    const res = await removeFromWishlistById(id);

    if (!res.error) {
      toast.success("Removed from wishlist");
      setItems((prev) => prev.filter((item) => item.product.id !== id));
    } else {
      toast.error(res.error.message);
    }
  };

  if (loading) return <p className="p-8">Loading wishlist ...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ❤️</h1>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => {
            const product = item.product; // ✅ FIX
            if (!product) return null;

            return (
              <div key={product.id} className="border p-3 rounded-lg">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="h-48 w-full object-cover rounded"
                />

                <h3 className="font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Remove
                  </button>

                  <Link href={`/product/${product.id}`}>
                    <button className="bg-blue-600 text-white py-1 px-3 rounded">
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
