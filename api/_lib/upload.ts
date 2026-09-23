import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type UploadInput = {
  filename: string;
  contentType: string;
  dataBase64: string;
};

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

function extensionFor(contentType: string, filename: string): string {
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  const fromName = filename.split(".").pop()?.toLowerCase();
  if (fromName === "png" || fromName === "webp" || fromName === "gif" || fromName === "jpg" || fromName === "jpeg") {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return "jpg";
}

export async function saveUploadedImage(input: UploadInput): Promise<{ url: string }> {
  if (!ALLOWED.has(input.contentType)) {
    throw Object.assign(new Error("Дозволені формати: JPG, PNG, WEBP, GIF"), { status: 400 });
  }

  const buffer = Buffer.from(input.dataBase64, "base64");
  if (!buffer.length) {
    throw Object.assign(new Error("Порожній файл"), { status: 400 });
  }
  if (buffer.length > MAX_BYTES) {
    throw Object.assign(new Error("Файл завеликий (макс. 4 МБ)"), { status: 400 });
  }

  const ext = extensionFor(input.contentType, input.filename);
  const key = `products/${randomUUID()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(key, buffer, {
      access: "public",
      contentType: input.contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url: blob.url };
  }

  // On Vercel without Blob, filesystem isn't durable — store as data URL in the product field
  if (process.env.VERCEL) {
    return { url: `data:${input.contentType};base64,${input.dataBase64}` };
  }

  // Local / non-blob: write into public/uploads for Vite to serve
  const uploadsDir = join(process.cwd(), "public", "uploads", "products");
  await mkdir(uploadsDir, { recursive: true });
  const filename = key.split("/")[1];
  await writeFile(join(uploadsDir, filename), buffer);
  return { url: `/uploads/products/${filename}` };
}
