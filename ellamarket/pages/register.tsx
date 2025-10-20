import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { email, password } = data;
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) setMessage(error.message);
    else setMessage("✅ Check your email to confirm your account!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <input
          {...register("email")}
          type="Email"
          placeholder="Your Email Address ..."
          required
          className="w-full border p-2 rounded"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Your Password ..."
          required
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Creating ..." : "Register"}
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
