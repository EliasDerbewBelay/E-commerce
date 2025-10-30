import { supabase } from "@/lib/supabaseClient";

// ✅ Add product to cart or increase quantity
export const addToCart = async (productId: number, quantity: number = 1) => {
  try {
    // ✅ Get logged in user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return { error: "You must be logged in to add items to cart." };
    }

    const userId = userData.user.id;

    // ✅ Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (existingItem) {
      // ✅ Update quantity
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id);

      if (updateError) return { error: updateError.message };

      return { message: "Quantity updated" };
    }

    // ✅ Insert new item
    const { error: insertError } = await supabase.from("cart_items").insert([
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
    ]);

    if (insertError) return { error: insertError.message };

    return { message: "Item added to cart" };
  } catch (err: any) {
    return { error: "Unexpected error adding to cart" };
  }
};

// ✅ Fetch cart items for current user
export const getCartItems = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { error: "User not logged in" };

  const userId = userData.user.id;

  // ✅ Join with product table for product details
  const { data, error } = await supabase
    .from("cart_items")
    .select("id, quantity, products(*)") // requires foreign key relation
    .eq("user_id", userId);

  return { data, error };
};

// ✅ Remove item from cart
export const removeFromCart = async (cartItemId: number) => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  return { data, error };
};

// ✅ Update quantity
export const updateCartQuantity = async (
  cartItemId: number,
  quantity: number
) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);

  return { data, error };
};
