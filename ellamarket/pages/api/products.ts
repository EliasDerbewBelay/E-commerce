import type { NextApiRequest, NextApiResponse } from "next";
import { getProduct } from "@/services/productService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const products = await getProduct();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
