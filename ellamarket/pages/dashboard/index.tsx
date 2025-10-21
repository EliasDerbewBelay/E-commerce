import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.log(error);
      else setUser(data.user);
    };
    getUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome,{" "}
          <span className="text-blue-600">
            {user.user_metadata?.name || "User"}
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-600 mb-8">
          Explore your orders, wishlist, and profile.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            My Orders
          </Link>
          <Link
            href="/dashboard/wishlist"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Wishlist
          </Link>
        </div>
      </section>
    </DashboardLayout>
  );
}
