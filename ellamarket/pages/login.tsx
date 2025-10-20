import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);

    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) setMessage(error.message);
    else router.push("/"); // it rediret to the home page
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4 w-80"
      >
        <h1 className="text-3xl font-bold text-slate-900 text-center">Login</h1>
        <input
          {...register("email")}
          type="email"
          placeholder="Your Email Address ..."
          required
          className="w-full border p-2 rounded"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Your Password ...."
          required
          className="w-full rounded border p-2"
        />
        <button
          disabled={loading}
          className="bg-black text-white p-2 rounded-lg text-xl font-semibold hover:shadow-lg cursor-pointer"
        >
          {loading ? "Loging In ..." : "Log In"}
        </button>

        {message && (
          <p className="text-sm text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
