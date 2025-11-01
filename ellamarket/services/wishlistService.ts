import { supabase } from "@/lib/supabaseClient";

export const addToWishlist = async (
  productId: number,
  quantity: number = 1
) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return { error: "You Must be logged in to add items to cart." };
    }

    const userId = userData.user.id;

    const { data: existingItem } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (existingItem) {
      const { error: updateError } = await supabase
        .from("wishlist_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id);

      if (updateError) return { error: updateError.message };
      return { message: "Quantity updated" };
    }

    const { error: insertError } = await supabase
      .from("wishlist_items")
      .insert([
        {
          user_Id: userId,
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

export const getWishlistItems = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) return { error: "User not logged in" };

  const userId = userData.user.id;

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("id, quantity, products(*)")
    .eq("user_id", userId);

  return { data, error };
};

export const removeFromWishlist = async (wishlistItemId: number) => {
  const { data, error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("id", wishlistItemId);

  return { data, error };
};
