import { Request, Response } from "express";
import knex from "../database/knex";
import { Link, Note, Tag } from "../types";

export default class NotesController {
  async create(req: Request, res: Response) {
    const { title, description, links, tags } = req.body;

    const user_id = req.user!.id;

    // Recuperando id da nota
    const note_id: any = await knex("notes").returning("id").insert({
      user_id,
      title,
      description,
    });

    if (links.length) {
      const linksInsert: Link[] = links.map((link: string) => {
        return { note_id: note_id[0].id, url: link };
      });
      await knex("links").insert(linksInsert);
    }

    if (tags.length) {
      const tagsInsert: Tag[] = tags.map((name: string) => {
        return { note_id: note_id[0].id, user_id, name };
      });
      await knex("tags").insert(tagsInsert);
    }

    return res.json();
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

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await knex<Note>("notes").where("id", id).delete();
    res.json();
  }

  async index(req: Request, res: Response) {
    const user_id = req.user!.id;
    const { title, tags } = req.query;
    let notes: Note[];

    if (tags && typeof tags === "string") {
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
        .whereILike("title", `%${title}%`)
        .whereIn("tags.name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("updated_at", "desc");
    } else {
      notes = await knex<Note>("notes")
        .where("user_id", user_id)
        .whereILike("title", `%${title}%`)
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

    return res.json(notesWithTags);
  }
}
