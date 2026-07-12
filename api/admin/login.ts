import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminAuthorized } from "../_lib/auth.js";

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

  const body = (req.body || {}) as { password?: string };
  const password = body.password?.trim();

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (!isAdminAuthorized(`Bearer ${password}`)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(200).json({ ok: true });
}
