import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    const url = process.env.DATABASE_URL || "file:data/nss.db";
    if (url.startsWith("file:")) {
      const filePath = url.replace("file:", "");
      mkdirSync(dirname(filePath), { recursive: true });
    }
    client = createClient({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
  }
  return client;
}
