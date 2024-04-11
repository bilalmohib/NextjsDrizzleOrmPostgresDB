import config from "./config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let sslmode = "";
if (config.APP_ENV === "prod") {
    sslmode = "?sslmode=require";
}

export const pool = new Pool({
    connectionString: config.POSTGRES_URL + sslmode,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema, logger: true });