"use client";

import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ProductListProps } from "@/interface";
import toast from "react-hot-toast";
import { addToCart } from "@/services/cartService";
import Link from "next/link";
import { addToWishlist } from "@/services/wishlistService";

const ProductCard: React.FC<ProductListProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Add to cart clicked");
    if (!product || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      const response = await addToCart(product.id);
      if (response.error) {
        toast.error("Something went wrong!");
      } else {
        toast.success("Added to Cart");
      }
    } catch (err: any) {
      console.error("Add to cart error:", err);
      toast.error("Network error! Please try again");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product || isAddingToWishlist) return;

    setIsAddingToWishlist(true);
    try {
      const response = await addToWishlist(product.id);
      if (response.error) {
        toast.error("Something went wrong!");
      } else {
        toast.success("Added to Wishlist");
      }
    } catch (err: any) {
      console.error("Adding to wishlist error:", err);
      toast.error("Network error! Please try again");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link href={`/products/${product.id}`}>
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
        </Link>

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
            disabled={isAddingToCart}
            className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              isAddingToCart
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-white text-gray-900 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}

      <Link href={`/products/${product.id}`}>
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
      </Link>
    </div>
  );
};

export default ProductCard;
