import { useState, useEffect } from "react";
import {
  getWishlistItems,
  removeFromWishlist,
} from "@/services/wishlistService";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userChecker = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(data.user);
      fetchWishlist();
    };

    const fetchWishlist = async () => {
      const { data, error } = await getWishlistItems();
      if (!error && data) setWishlist(data);
      setLoading(false);
    };

    userChecker();
  }, []);

  const handleRemove = async (wishlistId: number) => {
    const { error } = await removeFromWishlist(wishlistId);
    if (!error) {
      setWishlist(wishlist.filter((item) => item.id !== wishlistId));
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spine rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Your Wishlist ...</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your shopping cart
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start adding some products to your wishlist
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  return (
    <div>
      {wishlist.map((item) => (
        <div key={item.id}>
          <div>
            <Image
              src={item.product.image_url}
              alt={item.product.name}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>

          <div>
            <h3>{item.product.name}</h3>
            <p>${item.product.price.toFixed(2)} each</p>

            <div>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
