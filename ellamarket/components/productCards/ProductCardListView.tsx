import Image from "next/image";
import { ProductListProps } from "@/interface";
import { Heart, ShoppingBag } from "lucide-react";

const ProductCardListView: React.FC<ProductListProps> = ({ product }) => {
  return (
    <>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
          <p className="text-slate-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Stock: {product.stock}</span>
            <span>•</span>
            <span>
              Updated: {new Date(product.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-end justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price}
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200">
              <Heart className="w-4 h-4" />
            </button>
            <button
              disabled={product.stock === 0}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardListView;
