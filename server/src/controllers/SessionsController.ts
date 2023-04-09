import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const { compare } = require("bcrypt");

import { User } from "../types/index";
import knex from "../database/knex";
import authConfig from "../config/auth";
import AppError from "../../utils/AppError";

export default class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await knex<User>("users").where("email", email).first();
    if (!user) throw new AppError("E-mail e/ou senha inválida.", 401);

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) throw new AppError("E-mail e/ou senha inválida.", 401);

    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign({}, secret, { subject: String(user.id), expiresIn });

    return res.json({ user, token });
  }
}
