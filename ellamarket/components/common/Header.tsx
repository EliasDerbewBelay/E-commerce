import Link from "next/link";

interface HeaderProps {
  variant?: "main" | "dashboard";
}

const Header: React.FC<HeaderProps> = ({ variant = "main" }) => {
  const isDashboard = variant === "dashboard";

  return (
    <header
      className={`${
        isDashboard ? "bg-white shadow-sm" : "bg-white/90 backdrop-blur-md"
      } sticky top-0 z-50`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={isDashboard ? "/dashboard" : "/"}
          className={`text-2xl font-bold ${
            isDashboard
              ? "text-blue-600 hover:text-blue-700"
              : "text-yellow-600 hover:text-yellow-700"
          } transition-colors`}
        >
          EllaMarket
        </Link>

        <div className="flex space-x-6 text-gray-700 font-medium">
          {isDashboard ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/orders">Orders</Link>
              <Link href="/dashboard/wishlist">Wishlist</Link>
              <Link href="/profile">Profile</Link>
              <Link
                href="/logout"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link
                href="/login"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
