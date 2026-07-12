import { seedCatalog } from "../api/_lib/seed.js";

const force = process.argv.includes("--force");

seedCatalog({ force })
  .then((result) => {
    if (result.action === "skipped") {
      console.log(`Database already has ${result.count} products. Skipping seed.`);
      console.log("Run: npm run db:seed -- --force  to replace all products.");
      return;
    }
    console.log(`Seeded ${result.count} products.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
