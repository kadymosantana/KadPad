import sqlite from "sqlite";
import sqlite3 from "sqlite3";
const path = require("path");

export default async function sqliteConnection() {
  const database = await sqlite?.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  });
  return database;
}
