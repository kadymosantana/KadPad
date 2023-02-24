import { Request, Response } from "express";
import knex from "../database/knex";

export default class TagsController {
  async index(req: Request, res: Response) {
    const { user_id } = req.params;
    const userTags = await knex("tags").where("user_id", user_id);

    res.json(userTags)
  }
}