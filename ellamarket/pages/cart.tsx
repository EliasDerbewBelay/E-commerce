// pages/cart.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      `
      )
      .eq("user_id", user.id);

    if (!error) setCartItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (cartItems.length === 0) return <p>Your cart is empty. 🛒</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <p>
            <strong>{item.products.name}</strong>
          </p>
          <p>Price: ${item.products.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
