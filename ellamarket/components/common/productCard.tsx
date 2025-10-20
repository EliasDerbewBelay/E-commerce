import { Product } from "@/constants/products";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-2 font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
