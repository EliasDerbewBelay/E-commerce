import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getProduct(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error Fetching products:", error.message);
    throw new Error(error.message);
  }

  return data || [];
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error Fetching Data by product id", error.message);
    throw new Error(error.message);
  }

  return data;
}
