import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Grid, List, Search, ChevronDown } from "lucide-react";
import { ProductListProps } from "@/interface";
import Link from "next/link";
import ProductCard from "@/components/productCards/ProductCard";
import ProductCardListView from "@/components/productCards/ProductCardListView";

const Products: React.FC<ProductListProps> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    inStock: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Mock categories - replace with your actual categories
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                All Products
              </h1>
              <p className="text-slate-600 mt-2">
                Discover our complete collection of amazing products
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center gap-4">
              {/* Search Box */}
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900">Filters</h3>
                <button className="text-sm text-slate-600 hover:text-slate-900">
                  Clear all
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                      />
                      <span className="text-sm text-slate-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map(
                    (range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="price-range"
                          className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900"
                        />
                        <span className="text-sm text-slate-700">{range}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">
                  Availability
                </h4>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                  />
                  <span className="text-sm text-slate-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Results Count */}
                <div className="text-sm text-slate-600">
                  Showing 1-12 of 48 products
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 border border-slate-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-slate-300 rounded-lg pl-4 pr-8 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <Link href={`/products/${product.id}`}>
                      <ProductCard product={product} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 p-4"
                  >
                    <Link href={`/products/${product.id}`}>
                      <ProductCardListView product={product} />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
