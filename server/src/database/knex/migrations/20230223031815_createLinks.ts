import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.integer("note_id").references("id").inTable("notes");
    table.text("url");
    table.timestamp("created_at").defaultTo(knex.fn.now);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("links");
}
