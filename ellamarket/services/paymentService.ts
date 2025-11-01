import { supabase } from "@/lib/supabaseClient";

export const createPaymentRecord = async ({
  orderId,
  amount,
  provider,
  transactionRef,
}: {
  orderId: string;
  amount: number;
  provider: string;
  transactionRef: string;
}) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) return { error: "User not logged in" };

  const { data, error } = await supabase
    .from("payment")
    .insert([
      {
        order_id: orderId,
        user_id: userId,
        amount,
        provider,
        transaction_ref: transactionRef,
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const markPaymentAsPaid = async (paymentId: string) => {
  const { error } = await supabase
    .from("payment")
    .update({ status: "paid" })
    .eq("id", paymentId);

  return { error };
};

export const markOrderAsPaid = async (orderId: string) => {
  const { error } = await supabase
    .from("order")
    .update({ payment_status: "paid" })
    .eq("id", orderId);

  return { error };
};
