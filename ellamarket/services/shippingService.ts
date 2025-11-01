import { supabase } from "@/lib/supabaseClient";

export const addShippingAddress = async (address: any) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  const { data, error } = await supabase
    .from("shipping_addresses")
    .insert([{ ...address, user_id: userId }]);

  return { data, error };
};

export const getShippingAddresses = async () => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  const { data, error } = await supabase
    .from("shipping_addresses")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
};

export const setDefaultAddress = async (id: string) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  await supabase
    .from("shipping_addresses")
    .update({ is_default: false })
    .eq("user_id", userId);
  return await supabase
    .from("shipping_addresses")
    .update({ is_default: true })
    .eq("id", id)
    .eq("user_id", userId);
};

export const deleteAddress = async (id: string) => {
  return await supabase.from("shipping_addresses").delete().eq("id", id);
};
