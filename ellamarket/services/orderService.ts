import { supabase } from "@/lib/supabaseClient";

export const createOrder = async ({
  productId,
  quantity,
  price,
  shippingAddressId,
}: {
  productId: number;
  quantity: number;
  price: number;
  shippingAddressId: string;
}) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) return { error: "User Not Logged In" };

  const totalAmount = price * quantity;

  const { data: order, error: orderError } = await supabase
    .from("order")
    .insert([
      {
        user_id: userId,
        totalAmount: totalAmount,
        shipping_address_id: shippingAddressId,
      },
    ])
    .select()
    .single();

  if (orderError) return { error: orderError.message };

  const { error: itemsError } = await supabase.from("order_items").insert([
    {
      order_id: order.id,
      product_id: productId,
      quantity,
      price,
    },
  ]);

  if (itemsError) return { error: itemsError.message };

  return { data: order };
};
