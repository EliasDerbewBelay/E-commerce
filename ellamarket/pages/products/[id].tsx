import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import Image from "next/image";
import { Star, Heart, Share2, Truck, Shield, ArrowLeft } from "lucide-react";
import { addToCart } from "@/services/cartService";
import { addToWishlist, checkIfWishlisted } from "@/services/wishlistService";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    const response = await addToCart(product.id, quantity);

    if (response.error) {
      alert(response.error);
    } else {
      alert("Item added to cart");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const numericId = Number(id);
        const data = await getProductById(numericId);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkWishlistState = async () => {
      if (!product) return;
      const isSaved = await checkIfWishlisted(product.id);
      setIsWishlisted(isSaved);
    };

    checkWishlistState();
  }, [product]);

  const handleWishlist = async () => {
    if (!product) return;

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      toast.error("Please log in to add items to wishlist");
      return;
    }

    const res = await addToWishlist(product.id);

    if (res.error) {
      toast.error("Something went wrong");
      return;
    }

    if (res.data?.exists) {
      toast("Already in wishlist");
    } else {
      toast.success("Added to wishlist ❤️");
    }

    setIsWishlisted(true);
  };

  // Mock multiple images - in real app, this would come from API
  const productImages = product
    ? [
        product.image_url,
        product.image_url, // duplicate for demo
        product.image_url,
      ]
    : [];

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} of ${product?.name}`);
  };

  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-200 h-96 rounded-xl"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4"></div>
              <div className="bg-gray-200 h-6 rounded w-1/2"></div>
              <div className="bg-gray-200 h-12 rounded w-1/4"></div>
              <div className="bg-gray-200 h-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-12">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-96 object-cover"
              priority
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWishlist}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${
                      star <= 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.2 • 128 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
              20% OFF
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={20} className="text-green-600" />
              <div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-gray-500">2-3 business days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={20} className="text-blue-600" />
              <div>
                <div className="font-medium">2-Year Warranty</div>
                <div className="text-gray-500">Full coverage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 text-orange-600">✓</div>
              <div>
                <div className="font-medium">In Stock</div>
                <div className="text-gray-500">Ready to ship</div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-900">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500">Only 12 items left!</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors border-2 border-gray-900"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors border-2 border-blue-600"
            >
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>SKU:</span>
              <span className="font-medium">
                PRD-{product.id.toString().padStart(6, "0")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span className="font-medium">Free shipping over $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
