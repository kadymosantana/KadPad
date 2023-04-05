import knex from "knex";
import knexfile from "../../../knexfile";

require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const configOptions = (knexfile as any)[env];

const connection = knex(configOptions);
export default connection;
