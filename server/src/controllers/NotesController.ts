import { Request, Response } from "express";
import knex from "../database/knex";

export default class NotesController {
  // Cadastrando nota (POST)
  async create(req: Request, res: Response) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    // Recuperando id da nota
    const note_id = await knex("notes").insert({
      user_id,
      title,
      description,
    });

    // Criando um novo objeto para cada tag e o inserindo na tabela "tags"
    const tagsInsert = tags.map((name: string) => {
      return { note_id, user_id, name };
    });
    await knex("tags").insert(tagsInsert);

    // Criando um novo objeto para cada link e o inserindo na tabela "links"
    const linksInsert = links.map((link: string) => {
      return { note_id, url: link };
    });
    await knex("links").insert(linksInsert);

    res.json();
  }

  // Exibindo nota (GET)
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where("note_id", id).orderBy("name");
    const links = await knex("links")
      .where("note_id", id)
      .orderBy("created_at");

    res.json({
      ...note, // { title, description, ...}
      tags, // ["tag1", "tag2", ...]
      links, // ["link1", "link2", ...]
    });
  }

  // Deletando nota (DELETE)
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await knex("notes").where({ id }).delete();
    res.json();
  }
}
