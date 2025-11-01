"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    const { data: orderData } = await supabase
      .from("orders")
      .select(`id, total_amount, payment_status, shipping_addresses (*)`)
      .eq("id", orderId)
      .single();

    const { data: itemData } = await supabase
      .from("order_items")
      .select(` quantity, price, products (*)`)
      .eq("order_id", orderId);

    setOrder(orderData);
    setItems(itemData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <p>{order.shipping_addresses.full_name}</p>
        <p>{order.shipping_addresses.phone}</p>
        <p>
          {order.shipping_addresses.address_line1},{" "}
          {order.shipping_addresses.city}, {order.shipping_addresses.country}
        </p>
      </div>

      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Order Items</h3>

        {items.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{item.product.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total:</span>
        <span>${order.total_amount}</span>
      </div>

      <button
        className="bg-black text-white px-5 py-3 rounded w-full"
        onClick={() => router.push(`/payment/${orderId}`)}
      >
        Pay Now
      </button>
    </div>
  );
}
