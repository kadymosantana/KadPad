import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tags");
}
