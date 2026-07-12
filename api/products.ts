import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listProducts } from "./_lib/handlers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lang = typeof req.query.lang === "string" ? req.query.lang : "uk";
    const products = await listProducts(lang);
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load products" });
  }
}
