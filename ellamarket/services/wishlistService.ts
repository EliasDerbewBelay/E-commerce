import { supabase } from "@/lib/supabaseClient";

export const addToWishlist = async (productId: number) => {
  try {
    // ✅ Check if user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return { error: "You must be logged in to add items to wishlist." };
    }

    const userId = userData.user.id;

    // ✅ Check if item already exists in wishlist
    const { data: existingItem } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingItem) {
      return { message: "Item already in wishlist" };
    }

    // ✅ Insert new wishlist item
    const { error: insertError } = await supabase
      .from("wishlist_items")
      .insert([
        {
          user_id: userId,
          product_id: productId,
        },
      ]);

    if (insertError) return { error: insertError.message };

    return { message: "Item added to wishlist" };
  } catch (err: any) {
    return { error: "Unexpected error adding to wishlist" };
  }
};

export const getWishlistItems = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) return { error: "User not logged in" };

  const userId = userData.user.id;

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("id, products(*)") // ✅ removed quantity
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
