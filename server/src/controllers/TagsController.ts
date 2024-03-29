import { Request, Response } from "express";
import knex from "../database/knex";

export default class TagsController {
  async index(req: Request, res: Response) {
    const user_id = req.user!.id;
    const userTags = await knex("tags")
      .select("name", knex.raw("MAX(id) as id"))
      .where("user_id", user_id)
      .groupBy("name");

    return res.json(userTags);
  }
}
