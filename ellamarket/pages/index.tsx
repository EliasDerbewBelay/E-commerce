import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    console.log("Supabase client: ", supabase);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Ellas Market</h1>
    </div>
  );
};

export default Home;
