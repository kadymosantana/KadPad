import sqliteConnection from "../index";
const createUsers = require("./createUsers");

export default async function migrationsRun() {
  const schemas = [createUsers].join("");

  sqliteConnection()
    .then((db: any) => db.exec(schemas))
    .catch((err: Error) => console.error(err));
}
