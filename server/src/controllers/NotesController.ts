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


}
