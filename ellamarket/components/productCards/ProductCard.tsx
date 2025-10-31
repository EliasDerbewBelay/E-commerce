"use client";

import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductListProps } from "@/interface";
import { addToWishlist, checkIfWishlisted } from "@/services/wishlistService";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

const ProductCard: React.FC<ProductListProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ Check if product is already wishlisted
  useEffect(() => {
    const loadWishlistState = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const isSaved = await checkIfWishlisted(product.id);
      setIsWishlisted(isSaved);
    };

    loadWishlistState();
  }, [product.id]);

  // ✅ Handle wishlist click
  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    const res = await addToWishlist(product.id);

    if (res.error) {
      toast.error("Something went wrong!");
      return;
    }

    if (res.data?.exists) {
      toast("Already in wishlist");
    } else {
      toast.success("Added to wishlist ❤️");
    }

    setIsWishlisted(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Cart logic will come later
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="aspect-square relative">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* ✅ Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted
              ? "bg-red-500 text-white shadow-md"
              : "bg-white text-gray-400 shadow-sm hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Category */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
              {product.category}
            </span>
          </div>
        )}

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight text-lg group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 line-clamp-2 leading-relaxed text-sm">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= (product.rating || 4)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount || 128})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
