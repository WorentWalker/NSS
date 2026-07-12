import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../_lib/handlers.js";
import { getCatalogSize, seedCatalog } from "../_lib/seed.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    requireAdmin(req.headers.authorization);
    const force = req.query.force === "true" || (req.body as { force?: boolean })?.force === true;
    const result = await seedCatalog({ force });

    if (result.action === "skipped") {
      return res.status(200).json({
        ok: true,
        skipped: true,
        message: `Already has ${result.count} products`,
        catalogSize: getCatalogSize(),
      });
    }

    return res.status(200).json({
      ok: true,
      count: result.count,
      catalogSize: getCatalogSize(),
    });
  } catch (error) {
    const status = (error as Error & { status?: number }).status || 500;
    const message = error instanceof Error ? error.message : "Server error";
    return res.status(status).json({ error: message });
  }
}
