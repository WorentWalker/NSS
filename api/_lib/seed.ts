import { ensureDb } from "./init.js";
import { getDb } from "./db.js";
import { catalog } from "./catalogData.js";

export type SeedProduct = (typeof catalog)[number];

export function getCatalogSize(): number {
  return catalog.length;
}

export async function seedCatalog(options?: { force?: boolean }): Promise<{ action: "seeded" | "skipped"; count: number }> {
  await ensureDb();
  const db = getDb();

  const existing = await db.execute("SELECT COUNT(*) as count FROM products");
  const existingCount = Number((existing.rows[0] as { count: number }).count);

  if (existingCount > 0 && !options?.force) {
    return { action: "skipped", count: existingCount };
  }

  if (options?.force) {
    await db.execute("DELETE FROM products");
  }

  const statements = catalog.map((product, order) => ({
    sql: `INSERT OR REPLACE INTO products (
      id, category_id, name, badge, color,
      description_uk, description_en, highlight_uk, highlight_en,
      warranty, image, featured, specs, tags, sort_order, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      product.id,
      product.category,
      product.name,
      product.badge,
      product.color,
      product.descriptionUk,
      product.descriptionEn,
      product.highlightUk,
      product.highlightEn,
      product.warranty,
      product.image || null,
      product.featured ? 1 : 0,
      JSON.stringify(product.specs),
      JSON.stringify(product.tags),
      order,
      null,
    ],
  }));

  await db.batch(statements, "write");

  return { action: "seeded", count: catalog.length };
}
