import path from "path";
import { Knex } from "knex";

require("dotenv").config();

export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 3 },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
} as Knex.Config;
