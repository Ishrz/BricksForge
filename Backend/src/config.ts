import { config as loadEnv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const backendDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
loadEnv({ path: path.join(backendDir, ".env") });

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABRICKS_TOKEN : z.string().min(1),
  DATABRICKS_HOST: z.url(),
  DATABRICKS_SERVER_HOSTNAME: z.string().min(1),
  DATABRICKS_HTTP_PATH: z.string().default("BricksForge")
});

export const env = envSchema.parse(process.env);
