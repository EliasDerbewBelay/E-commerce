import { supabase } from "@/lib/supabaseClient";

export const addToCart = async (productId: number) => {
  //Check if the user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You Must be Logged in to add items to cart." };
  }

  //   check if product already in cart
  const { data: existingItem, error: existingError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existingError && existingItem !== "PGRST116") {
    console.error(existingError);
    return { error: "Something went wrong." };
  }

  //   if exists -> increase quantity
  if (existingItem) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id);

    if (updateError) {
      return { error: "Failed to update quantity. " };
    }

    return { success: true, message: "Quantity updated" };
  }

  //   otherwise insert new row

  const { error: insertError } = await supabase.from("cart_items").insert({
    user_id: user.id,
    produc_id: productId,
    quantity: 1,
  });

  if (insertError) {
    console.error(insertError);
    return { error: "Failed to add to cart." };
  }

  return { success: true, message: "Add to cart" };
};
