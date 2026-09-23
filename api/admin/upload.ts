import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin, parseBody } from "../_lib/handlers.js";
import { saveUploadedImage, type UploadInput } from "../_lib/upload.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

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
    const body = await parseBody<UploadInput>(req);
    if (!body?.dataBase64 || !body.contentType) {
      return res.status(400).json({ error: "Missing file data" });
    }
    const result = await saveUploadedImage({
      filename: body.filename || "upload.jpg",
      contentType: body.contentType,
      dataBase64: body.dataBase64,
    });
    return res.status(201).json(result);
  } catch (error) {
    const status = (error as Error & { status?: number }).status || 500;
    const message = error instanceof Error ? error.message : "Upload failed";
    return res.status(status).json({ error: message });
  }
}
