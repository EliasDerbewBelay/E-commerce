import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const router = useRouter();

  // Listen for session changes
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Mock cart items count - replace with actual cart logic
  useEffect(() => {
    // This would typically come from your cart context or API
    setCartItemsCount(3);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                Ella<span className="text-yellow-500">Market</span>
              </span>
            </Link>
          </div>

          {/* Center: Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon - Mobile only */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Search size={20} />
            </button>

            {user ? (
              /* After Login */
              <div className="flex items-center gap-4">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-yellow-600 p-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Heart size={20} />
                  <span className="text-sm font-medium">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 p-2 rounded-md hover:bg-gray-50 transition-colors relative"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm font-medium hidden sm:block">
                    Cart
                  </span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <User size={20} />
                    <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                      {user.user_metadata?.name || "Account"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-900 border-b border-gray-100">
                        Hi, {user.user_metadata?.name || "User"}
                      </div>
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-md transition-colors mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Before Login */
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 pt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/categories"
                className="text-gray-700 hover:text-yellow-600 py-2 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-yellow-600 py-2 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Today's Deals
              </Link>
              {user && (
                <Link
                  href="/wishlist"
                  className="text-gray-700 hover:text-yellow-600 py-2 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Wishlist
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
