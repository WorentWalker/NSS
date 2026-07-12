import { ensureDb } from "../api/_lib/init.js";
import { getDb } from "../api/_lib/db.js";
import { deyeProducts } from "../src/app/data/deyeProducts.js";
import { nssProductsSeed } from "../src/app/data/nssProductsSeed.js";

async function seed() {
  await ensureDb();
  const db = getDb();

  const existing = await db.execute("SELECT COUNT(*) as count FROM products");
  const count = Number((existing.rows[0] as { count: number }).count);
  if (count > 0) {
    console.log(`Database already has ${count} products. Skipping seed.`);
    console.log("Delete data/nss.db and run again to re-seed.");
    return;
  }

  let order = 0;
  for (const product of nssProductsSeed) {
    await db.execute({
      sql: `INSERT INTO products (
        id, category_id, name, badge, color,
        description_uk, description_en, highlight_uk, highlight_en,
        warranty, image, featured, specs, tags, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        product.id,
        product.category,
        product.name,
        product.badge,
        product.color,
        product.descriptionUk || "",
        product.descriptionEn || "",
        product.highlightUk || "",
        product.highlightEn || "",
        product.warranty,
        product.image || null,
        product.featured ? 1 : 0,
        JSON.stringify(product.specs),
        JSON.stringify(product.tags || []),
        order++,
      ],
    });
  }

  for (const product of deyeProducts) {
    await db.execute({
      sql: `INSERT INTO products (
        id, category_id, name, badge, color,
        description_uk, description_en, highlight_uk, highlight_en,
        warranty, image, featured, specs, tags, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        product.id,
        product.category,
        product.name,
        product.badge,
        product.color,
        "",
        "",
        "",
        "",
        product.warranty,
        product.image || null,
        product.featured ? 1 : 0,
        JSON.stringify(product.specs),
        JSON.stringify([]),
        order++,
      ],
    });
  }

  console.log(`Seeded ${order} products.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
