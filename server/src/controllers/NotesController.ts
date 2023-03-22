import { Request, Response } from "express";
import knex from "../database/knex";
import { Link, Note, Tag } from "../types";

export default class NotesController {
  // Cadastrando nota (POST)
  async create(req: Request, res: Response) {
    const { title, description, links, tags } = req.body;

    const user_id = req.user!.id;

    // Recuperando id da nota
    const note_id = await knex("notes").insert({
      user_id,
      title,
      description,
    });

    if (links.length) {
      // Criando um novo objeto para cada link e o inserindo na tabela "links"
      const linksInsert: Link[] = links.map((link: string) => {
        return { note_id, url: link };
      });
      await knex("links").insert(linksInsert);
    }

    if (tags.length) {
      // Criando um novo objeto para cada tag e o inserindo na tabela "tags"
      const tagsInsert: Tag[] = tags.map((name: string) => {
        return { note_id, user_id, name };
      });
      await knex("tags").insert(tagsInsert);
    }

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

  // Listando notas
  async index(req: Request, res: Response) {
    const user_id = req.user!.id;
    const { title, tags } = req.query;
    let notes: Note[];

    if (tags && typeof tags === "string") {
      // query tags -> "node express"
      const filterTags = tags.split(",").map((tag) => tag); // ["node", "express"]

      notes = await knex<Tag>("tags")
        .select([
          "notes.id",
          "notes.user_id",
          "notes.title",
          "notes.description",
          "notes.updated_at",
        ])
        .where("notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("tags.name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("updated_at", "desc")
        .groupBy("title");
    } else {
      notes = await knex<Note>("notes")
        .where("user_id", user_id)
        .whereLike("title", `%${title}%`)
        .orderBy("updated_at", "desc");
    }

    const userTags = await knex<Tag>("tags").where("user_id", user_id);

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: noteTags,
      };
    });

    res.json(notesWithTags);
  }
}
