import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "@/services/productService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ✅ Step 1: Extract ID correctly from the request query
  const { id } = req.query;

  // ✅ Step 2: Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ Step 3: Convert to a number (since Supabase bigint = JS number)
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // ✅ Step 4: Fetch the product by ID
    const product = await getProductById(numericId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Step 5: Return it
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
