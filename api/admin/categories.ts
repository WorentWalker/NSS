import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createCategory,
  deleteCategory,
  listCategories,
  parseBody,
  requireAdmin,
} from "../_lib/handlers.js";
import type { CategoryInput } from "../_lib/types.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    requireAdmin(req.headers.authorization);

    if (req.method === "GET") {
      const categories = await listCategories();
      return res.status(200).json(categories);
    }

    if (req.method === "POST") {
      const body = await parseBody<CategoryInput>(req);
      const category = await createCategory(body);
      return res.status(201).json(category);
    }

    if (req.method === "DELETE") {
      const id = typeof req.query.id === "string" ? req.query.id : "";
      if (!id) return res.status(400).json({ error: "Missing id" });
      const result = await deleteCategory(id);
      if (!result.ok) {
        return res.status(400).json({ error: result.error });
      }
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    const status = (error as Error & { status?: number }).status || 500;
    const message = error instanceof Error ? error.message : "Server error";
    return res.status(status).json({ error: message });
  }
}
