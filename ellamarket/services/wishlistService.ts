import { supabase } from "@/lib/supabaseClient";

type Result<T> =
  | { error: null; data: T }
  | { error: { message: string; code?: string | number } | null; data?: null };

export async function addToWishlist(productId: number) {
  try {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return { error: { message: "User not authenticated" } } as Result<null>;
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("wishlist_items")
      .insert({ user_id: userId, product_id: productId })
      .select()
      .single();

    if (error) {
      if (
        (error.code && String(error.code).includes("23505")) ||
        (error.details &&
          String(error.details).toLowerCase().includes("unique"))
      ) {
        return { error: null, data: { exists: true } } as Result<any>;
      }

      return {
        error: { message: error.message, code: error.code },
        data: null,
      };
    }

    return { error: null, data };
  } catch (err: any) {
    return {
      error: { message: err?.message || "Unexpected error" },
      data: null,
    };
  }
}

export async function removeFromWishlistById(wishlistId: number | string) {
  try {
    const { data, error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("id", wishlistId);

    if (error)
      return {
        error: { message: error.message, code: error.code },
        data: null,
      };
    return { error: null, data };
  } catch (err: any) {
    return {
      error: { message: err?.message || "Unexpected error" },
      data: null,
    };
  }
}

export async function removeFromWishlistByProductId(proudctId: number) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user)
      return { error: { message: "User not authenticated" }, data: null };

    const userId = userData.user.id;
    const { data, error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", proudctId);

    if (error)
      return {
        error: { message: error.message, code: error.code },
        data: null,
      };
    return { error: null, data };
  } catch (err: any) {
    return {
      error: { message: err?.message || "Unexpected error" },
      data: null,
    };
  }
}

export async function getWishListForCurrentUser() {
  try {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return { error: { message: "User not authenticated" }, data: null };
    }

    const userId = userData.user.id;
    const { data, error } = await supabase
      .from("wishlist_items")
      .select(
        `id, created_at, product_id, products (
      id, name, price, image_url, description, category)`
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error)
      return {
        error: { message: error.message, code: error.code },
        data: null,
      };
    return { error: null, data };
  } catch (err: any) {
    return {
      error: { message: err?.message || "Unexpected error" },
      data: null,
    };
  }
}

export async function isInWishlist(productId: number) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user)
      return { error: { message: "User not authenticated" }, data: null };

    const userId = userData.user.id;
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (error)
      return {
        error: { message: error.message, code: error.code },
        data: null,
      };
    return { error: null, data };
  } catch (err: any) {
    return { error: { message: err?.message || "Unexpect Error" }, data: null };
  }
}

export const checkIfWishlisted = async (productId: number) => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return false;

  const { data } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("product_id", productId)
    .eq("user_id", user.id)
    .single();

  return !!data;
};