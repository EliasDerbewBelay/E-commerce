import { useState } from "react";
import Button from "../common/Button";
import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-800 text-white py-2 px-4 text-sm text-center">
        🚀 Free shipping on orders over $50! Limited time offer.
      </div>

      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-xl shadow-md transform transition-transform duration-300 hover:rotate-12 hover:scale-105">
                  <h1 className="font-bold text-2xl text-slate-800">E</h1>
                </div>
                <h1 className="font-bold text-2xl text-slate-800">
                  Ella<span className="text-yellow-500">Market</span>
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="#"
                  className="text-slate-700 hover:text-yellow-500 font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-slate-700 hover:text-yellow-500 font-medium transition-colors duration-200"
                >
                  Shop
                </Link>
                <Link
                  href="#"
                  className="text-slate-700 hover:text-yellow-500 font-medium transition-colors duration-200"
                >
                  Categories
                </Link>
                <Link
                  href="#"
                  className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full text-sm"
                >
                  Hot Deals
                </Link>
              </nav>
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <button className="hidden sm:flex items-center space-x-1 text-slate-600 hover:text-yellow-500 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>

              {/* Cart */}
              <button className="relative flex items-center space-x-1 text-slate-600 hover:text-yellow-500 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm font-medium">Cart</span>
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button
                    style="border border-slate-300 text-slate-700 rounded-lg px-4 py-2 font-medium hover:bg-slate-50 hover:shadow-md transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                    title={
                      <>
                        <User className="w-4 h-4" />
                        <span>Login</span>
                      </>
                    }
                  />
                </Link>

                <Link href="/auth/register">
                  <Button
                    style="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg px-4 py-2 font-medium hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    title="Sign Up"
                  />
                </Link>
              </div>

              {/* Mobile Menu Button */}

              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4 px-4 bg-white">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-slate-700 hover:text-yellow-500 font-medium py-2"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-slate-700 hover:text-yellow-500 font-medium py-2"
                >
                  Shop
                </Link>
                <Link
                  href="/categories"
                  className="text-slate-700 hover:text-yellow-500 font-medium py-2"
                >
                  Categories
                </Link>
                <Link href="/deals" className="text-red-500 font-medium py-2">
                  Hot Deals
                </Link>
                <div className="flex space-x-2 pt-2">
                  <Link href="/auth/login">
                    <Button
                      style="flex-1 border border-slate-300 text-slate-700 rounded-lg px-4 py-2 font-medium text-center cursor-pointer"
                      title="Login"
                    />
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      style="flex-1 bg-yellow-500 text-white rounded-lg px-4 py-2 font-medium text-center cursor-pointer"
                      title="Sign Up"
                    />
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
