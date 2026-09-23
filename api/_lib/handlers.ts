import { ensureDb } from "./init.js";
import { getDb } from "./db.js";
import { isAdminAuthorized } from "./auth.js";
import type {
  ApiCategory,
  ApiProduct,
  CategoryInput,
  DbCategory,
  DbProduct,
  ProductInput,
  SpecRow,
} from "./types.js";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || `item-${Date.now()}`;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapCategory(row: DbCategory): ApiCategory {
  return {
    id: row.id,
    nameUk: row.name_uk,
    nameEn: row.name_en,
    sortOrder: row.sort_order,
  };
}

function normalizePrice(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(String(value).replace(",", "."));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

function mapProduct(row: DbProduct, lang: string, categoryName: string): ApiProduct {
  const uk = lang === "uk";
  const rawPrice = (row as DbProduct & { price?: number | null }).price;
  return {
    id: row.id,
    category: row.category_id,
    categoryName,
    name: row.name,
    badge: row.badge,
    color: row.color,
    description: uk ? row.description_uk : row.description_en || row.description_uk,
    highlight: uk ? row.highlight_uk : row.highlight_en || row.highlight_uk,
    warranty: row.warranty,
    image: row.image || undefined,
    featured: Boolean(row.featured),
    specs: parseJson<SpecRow[]>(row.specs, []),
    tags: parseJson<string[]>(row.tags, []),
    sortOrder: row.sort_order,
    price: rawPrice == null ? null : Number(rawPrice),
  };
}

async function getCategoryMap() {
  const db = getDb();
  const result = await db.execute("SELECT * FROM categories ORDER BY sort_order, name_uk");
  const map = new Map<string, DbCategory>();
  for (const row of result.rows) {
    const cat = row as unknown as DbCategory;
    map.set(cat.id, cat);
  }
  return map;
}

export async function listCategories(): Promise<ApiCategory[]> {
  await ensureDb();
  const db = getDb();
  const result = await db.execute("SELECT * FROM categories ORDER BY sort_order, name_uk");
  return result.rows.map((row) => mapCategory(row as unknown as DbCategory));
}

export async function listProducts(lang = "uk"): Promise<ApiProduct[]> {
  await ensureDb();
  const db = getDb();
  const categories = await getCategoryMap();
  const result = await db.execute("SELECT * FROM products ORDER BY sort_order, name");
  return result.rows.map((row) => {
    const product = row as unknown as DbProduct;
    const cat = categories.get(product.category_id);
    const categoryName = lang === "uk" ? cat?.name_uk : cat?.name_en;
    return mapProduct(product, lang, categoryName || product.category_id);
  });
}

export async function createCategory(input: CategoryInput): Promise<ApiCategory> {
  await ensureDb();
  const db = getDb();
  const id = input.id?.trim() || slugify(input.nameUk);
  await db.execute({
    sql: `INSERT INTO categories (id, name_uk, name_en, sort_order) VALUES (?, ?, ?, ?)`,
    args: [id, input.nameUk, input.nameEn, input.sortOrder ?? 0],
  });
  const row = await db.execute({ sql: "SELECT * FROM categories WHERE id = ?", args: [id] });
  return mapCategory(row.rows[0] as unknown as DbCategory);
}

export async function deleteCategory(id: string): Promise<{ ok: boolean; error?: string }> {
  await ensureDb();
  const db = getDb();
  const used = await db.execute({
    sql: "SELECT COUNT(*) as count FROM products WHERE category_id = ?",
    args: [id],
  });
  const count = Number((used.rows[0] as { count: number }).count);
  if (count > 0) {
    return { ok: false, error: "Category has products" };
  }
  await db.execute({ sql: "DELETE FROM categories WHERE id = ?", args: [id] });
  return { ok: true };
}

export async function createProduct(input: ProductInput): Promise<ApiProduct> {
  await ensureDb();
  const db = getDb();
  const id = input.id?.trim() || slugify(input.name);
  await db.execute({
    sql: `INSERT INTO products (
      id, category_id, name, badge, color,
      description_uk, description_en, highlight_uk, highlight_en,
      warranty, image, featured, specs, tags, sort_order, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.categoryId,
      input.name,
      input.badge || "",
      input.color || "#2DC653",
      input.descriptionUk || "",
      input.descriptionEn || "",
      input.highlightUk || "",
      input.highlightEn || "",
      input.warranty || "",
      input.image || null,
      input.featured ? 1 : 0,
      JSON.stringify(input.specs || []),
      JSON.stringify(input.tags || []),
      input.sortOrder ?? 0,
      normalizePrice(input.price),
    ],
  });
  const products = await listProducts("uk");
  const created = products.find((p) => p.id === id);
  if (!created) throw new Error("Failed to create product");
  return created;
}

export async function updateProduct(id: string, input: ProductInput): Promise<ApiProduct> {
  await ensureDb();
  const db = getDb();
  await db.execute({
    sql: `UPDATE products SET
      category_id = ?, name = ?, badge = ?, color = ?,
      description_uk = ?, description_en = ?, highlight_uk = ?, highlight_en = ?,
      warranty = ?, image = ?, featured = ?, specs = ?, tags = ?, sort_order = ?, price = ?
      WHERE id = ?`,
    args: [
      input.categoryId,
      input.name,
      input.badge || "",
      input.color || "#2DC653",
      input.descriptionUk || "",
      input.descriptionEn || "",
      input.highlightUk || "",
      input.highlightEn || "",
      input.warranty || "",
      input.image || null,
      input.featured ? 1 : 0,
      JSON.stringify(input.specs || []),
      JSON.stringify(input.tags || []),
      input.sortOrder ?? 0,
      normalizePrice(input.price),
      id,
    ],
  });
  const products = await listProducts("uk");
  const updated = products.find((p) => p.id === id);
  if (!updated) throw new Error("Product not found");
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  await ensureDb();
  const db = getDb();
  await db.execute({ sql: "DELETE FROM products WHERE id = ?", args: [id] });
}

export function requireAdmin(authHeader?: string | null) {
  if (!isAdminAuthorized(authHeader)) {
    const err = new Error("Unauthorized");
    (err as Error & { status: number }).status = 401;
    throw err;
  }
}

export async function parseBody<T>(req: { body?: unknown }): Promise<T> {
  if (req.body && typeof req.body === "object") {
    return req.body as T;
  }
  return {} as T;
}
