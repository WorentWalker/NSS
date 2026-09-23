import http from "node:http";
import { URL } from "node:url";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  listCategories,
  listProducts,
  requireAdmin,
  updateProduct,
} from "../api/_lib/handlers.js";
import type { CategoryInput, ProductInput } from "../api/_lib/types.js";

const PORT = Number(process.env.API_PORT || 3001);

async function readJson<T>(req: http.IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {} as T;
  return JSON.parse(raw) as T;
}

function send(res: http.ServerResponse, status: number, data: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    return send(res, 400, { error: "Bad request" });
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    });
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const auth = req.headers.authorization;

  try {
    if (url.pathname === "/api/admin/login" && req.method === "POST") {
      const body = await readJson<{ password?: string }>(req);
      const expected = process.env.ADMIN_PASSWORD || "nss-admin";
      if (body.password === expected) {
        return send(res, 200, { ok: true });
      }
      return send(res, 401, { error: "Unauthorized" });
    }

    if (url.pathname === "/api/health" && req.method === "GET") {
      try {
        const categories = await listCategories();
        return send(res, 200, { ok: true, db: true, categories: categories.length });
      } catch (error) {
        return send(res, 500, {
          ok: false,
          db: false,
          error: error instanceof Error ? error.message : "Database error",
        });
      }
    }

    if (url.pathname === "/api/admin/seed" && req.method === "POST") {
      requireAdmin(auth);
      const force = url.searchParams.get("force") === "true";
      const { seedCatalog } = await import("../api/_lib/seed.js");
      const result = await seedCatalog({ force });
      if (result.action === "skipped") {
        return send(res, 200, { ok: true, skipped: true, count: result.count });
      }
      return send(res, 200, { ok: true, count: result.count });
    }

    if (url.pathname === "/api/admin/upload" && req.method === "POST") {
      requireAdmin(auth);
      const body = await readJson<{ filename?: string; contentType?: string; dataBase64?: string }>(req);
      if (!body.dataBase64 || !body.contentType) {
        return send(res, 400, { error: "Missing file data" });
      }
      const { saveUploadedImage } = await import("../api/_lib/upload.js");
      const result = await saveUploadedImage({
        filename: body.filename || "upload.jpg",
        contentType: body.contentType,
        dataBase64: body.dataBase64,
      });
      return send(res, 201, result);
    }

    if (url.pathname === "/api/products" && req.method === "GET") {
      const lang = url.searchParams.get("lang") || "uk";
      return send(res, 200, await listProducts(lang));
    }

    if (url.pathname === "/api/categories" && req.method === "GET") {
      return send(res, 200, await listCategories());
    }

    if (url.pathname === "/api/admin/products") {
      requireAdmin(auth);
      if (req.method === "GET") return send(res, 200, await listProducts("uk"));
      if (req.method === "POST") {
        const body = await readJson<ProductInput>(req);
        return send(res, 201, await createProduct(body));
      }
      if (req.method === "PUT") {
        const id = url.searchParams.get("id");
        if (!id) return send(res, 400, { error: "Missing id" });
        const body = await readJson<ProductInput>(req);
        return send(res, 200, await updateProduct(id, body));
      }
      if (req.method === "DELETE") {
        const id = url.searchParams.get("id");
        if (!id) return send(res, 400, { error: "Missing id" });
        await deleteProduct(id);
        return send(res, 200, { ok: true });
      }
    }

    if (url.pathname === "/api/admin/categories") {
      requireAdmin(auth);
      if (req.method === "GET") return send(res, 200, await listCategories());
      if (req.method === "POST") {
        const body = await readJson<CategoryInput>(req);
        return send(res, 201, await createCategory(body));
      }
      if (req.method === "DELETE") {
        const id = url.searchParams.get("id");
        if (!id) return send(res, 400, { error: "Missing id" });
        const result = await deleteCategory(id);
        if (!result.ok) return send(res, 400, { error: result.error });
        return send(res, 200, { ok: true });
      }
    }

    send(res, 404, { error: "Not found" });
  } catch (error) {
    const status = (error as Error & { status?: number }).status || 500;
    const message = error instanceof Error ? error.message : "Server error";
    send(res, status, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
