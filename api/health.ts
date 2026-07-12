import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureDb } from "./_lib/init.js";
import { listCategories } from "./_lib/handlers.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await ensureDb();
    const categories = await listCategories();
    return res.status(200).json({
      ok: true,
      db: true,
      categories: categories.length,
      hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      db: false,
      error: error instanceof Error ? error.message : "Database error",
      hint: "Set DATABASE_URL and DATABASE_AUTH_TOKEN (Turso) in Vercel env vars",
    });
  }
}
