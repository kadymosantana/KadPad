import { Request, Response } from "express";
import knex from "../database/knex";
import { Link, Note, Tag } from "../types";

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
    const tagsInsert: Tag[] = tags.map((name: string) => {
      return { note_id, user_id, name };
    });
    await knex("tags").insert(tagsInsert);

    // Criando um novo objeto para cada link e o inserindo na tabela "links"
    const linksInsert: Link[] = links.map((link: string) => {
      return { note_id, url: link };
    });
    await knex("links").insert(linksInsert);

    res.json();
  }

  // Exibindo nota (GET)
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const note = await knex<Note>("notes").where("id", id).first();
    const tags = await knex<Tag>("tags").where("note_id", id).orderBy("name");
    const links = await knex<Link>("links")
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
    await knex<Note>("notes").where("id", id).delete();
    res.json();
  }
}
