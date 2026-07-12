import { getDb } from "./db.js";

let initialized = false;

export async function ensureDb() {
  if (initialized) return;
  const db = getDb();

  await db.batch([
    `CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name_uk TEXT NOT NULL,
      name_en TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      badge TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '#2DC653',
      description_uk TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      highlight_uk TEXT NOT NULL DEFAULT '',
      highlight_en TEXT NOT NULL DEFAULT '',
      warranty TEXT NOT NULL DEFAULT '',
      image TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      specs TEXT NOT NULL DEFAULT '[]',
      tags TEXT NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )`,
  ]);

  const defaults = [
    { id: "solarPanels", name_uk: "Сонячні панелі", name_en: "Solar Panels", sort_order: 1 },
    { id: "inverters", name_uk: "Інвертори", name_en: "Inverters", sort_order: 2 },
    { id: "batterySystems", name_uk: "Акумуляторні системи", name_en: "Battery Systems", sort_order: 3 },
  ];

  for (const cat of defaults) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO categories (id, name_uk, name_en, sort_order) VALUES (?, ?, ?, ?)`,
      args: [cat.id, cat.name_uk, cat.name_en, cat.sort_order],
    });
  }

  initialized = true;
}
