import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

import database from "infra/database";

export default async function migrations(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationConfig = {
      dbClient: dbClient,
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    if (req.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationConfig,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return res.status(201).json(migratedMigrations);
      }

      return res.status(200).json(migratedMigrations);
    }

    if (req.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationConfig);
      return res.status(200).json(pendingMigrations);
    }
  } catch (error) {
    console.error("Migration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await dbClient.end();
  }
}
