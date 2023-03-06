import { Request, Response } from "express";
const { compare } = require("bcrypt");

import { User } from "../types/index";
import knex from "../database/knex";
import AppError from "../../utils/AppError";

export default class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await knex<User>("users").where("email", email).first();
    if (!user) throw new AppError("E-mail e/ou senha inválida.", 401);

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) throw new AppError("E-mail e/ou senha inválida.", 401);

    res.json({ user });
  }
}
