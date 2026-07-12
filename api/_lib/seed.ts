import { ensureDb } from "./init.js";
import { getDb } from "./db.js";
import { deyeProducts } from "../../src/app/data/deyeProducts.js";
import { nssProductsSeed } from "../../src/app/data/nssProductsSeed.js";
import { ukMessages } from "../../src/app/i18n/messages.uk.js";
import { enMessages } from "../../src/app/i18n/messages.en.js";

type SeedProduct = {
  id: string;
  category: string;
  name: string;
  badge: string;
  color: string;
  specs: { label: string; value: string }[];
  tags: string[];
  warranty: string;
  highlightUk: string;
  highlightEn: string;
  descriptionUk: string;
  descriptionEn: string;
  image?: string;
  featured?: boolean;
};

function lookup(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== "object") return "";
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : "";
}

function tUk(key: string): string {
  if (key.startsWith("productsPage.")) {
    return lookup(ukMessages as unknown as Record<string, unknown>, key);
  }
  return lookup(ukMessages as unknown as Record<string, unknown>, `productsPage.${key}`);
}

function tEn(key: string): string {
  if (key.startsWith("productsPage.")) {
    return lookup(enMessages as unknown as Record<string, unknown>, key);
  }
  return lookup(enMessages as unknown as Record<string, unknown>, `productsPage.${key}`);
}

function descUk(highlightKey?: string): string {
  if (!highlightKey) return "";
  return lookup(
    ukMessages as unknown as Record<string, unknown>,
    `productsPage.desc.${highlightKey}`,
  );
}

function descEn(highlightKey?: string): string {
  if (!highlightKey) return "";
  return lookup(
    enMessages as unknown as Record<string, unknown>,
    `productsPage.desc.${highlightKey}`,
  );
}

function warrantyUk(raw: string, id: string): string {
  if (id.startsWith("deye-")) return tUk("productsPage.wStd");
  return raw
    .replace("5jr standaard", tUk("productsPage.wStd"))
    .replace("10jr prestatie", tUk("productsPage.w10y"))
    .replace("15jr materiaal / 30jr vermogen", tUk("productsPage.wMat"))
    .replace("8000+ cycli", tUk("productsPage.wCycles"))
    .replace("TÜV Gecertificeerd", tUk("productsPage.wTuv"))
    .replace("BNEF Tier 1", tUk("productsPage.wBnef"));
}

function buildCatalog(): SeedProduct[] {
  const items: SeedProduct[] = nssProductsSeed.map((p) => ({
    id: p.id,
    category: p.category,
    name: p.name,
    badge: p.badge,
    color: p.color,
    specs: p.specs,
    tags: p.tags || [],
    warranty: p.warranty,
    highlightUk: p.highlightUk || "",
    highlightEn: p.highlightEn || "",
    descriptionUk: p.descriptionUk || descUk(p.highlightKey) || "",
    descriptionEn: p.descriptionEn || descEn(p.highlightKey) || "",
    image: p.image,
    featured: p.featured,
  }));

  for (const p of deyeProducts) {
    items.push({
      id: p.id,
      category: p.category,
      name: p.name,
      badge: p.badge,
      color: p.color,
      specs: p.specs,
      tags: (p.tagKeys || []).map((k) => tUk(k)).filter(Boolean),
      warranty: warrantyUk(p.warranty, p.id),
      highlightUk: p.highlightKey ? tUk(p.highlightKey) : "",
      highlightEn: p.highlightKey ? tEn(p.highlightKey) : "",
      descriptionUk: descUk(p.highlightKey),
      descriptionEn: descEn(p.highlightKey),
      image: p.image,
      featured: p.featured,
    });
  }

  return items;
}

export async function seedCatalog(options?: { force?: boolean }): Promise<{ action: "seeded" | "skipped"; count: number }> {
  await ensureDb();
  const db = getDb();
  const catalog = buildCatalog();

  const existing = await db.execute("SELECT COUNT(*) as count FROM products");
  const existingCount = Number((existing.rows[0] as { count: number }).count);

  if (existingCount > 0 && !options?.force) {
    return { action: "skipped", count: existingCount };
  }

  if (options?.force) {
    await db.execute("DELETE FROM products");
  }

  let order = 0;
  for (const product of catalog) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO products (
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
        product.descriptionUk,
        product.descriptionEn,
        product.highlightUk,
        product.highlightEn,
        product.warranty,
        product.image || null,
        product.featured ? 1 : 0,
        JSON.stringify(product.specs),
        JSON.stringify(product.tags),
        order++,
      ],
    });
  }

  return { action: "seeded", count: order };
}

export function getCatalogSize(): number {
  return buildCatalog().length;
}
