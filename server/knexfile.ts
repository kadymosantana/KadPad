import path from "path";
import { Knex } from "knex";

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    pool: {
      afterCreate: (connection: any, callback: any) =>
        connection.run("PRAGMA foreign_keys = ON", callback),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  } as Knex.Config,
};
