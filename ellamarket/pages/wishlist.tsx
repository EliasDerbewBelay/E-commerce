"use client";

import Image from "next/image";
import { useWishlistStore } from "@/services/wishlistService";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist ❤️</h1>

      {items.length === 0 && <p>No items in wishlist</p>}

      <div className="grid grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={500}
              className="w-full h-40 object-cover"
            />
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p>${item.price}</p>

            <button
              className="mt-2 w-full bg-red-600 text-white py-2 rounded-md"
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
