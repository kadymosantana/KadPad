import type { User } from "../types";
import type { Request, Response } from "express";

import knex from "../database/knex";
import AppError from "../../utils/AppError";

const { hash, compare } = require("bcrypt");

export default class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const checkUserExists = await knex<User>("users")
      .where("email", email)
      .first();

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    return res.status(201).json();
  }

  async update(req: Request, res: Response) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user!.id;

    const user = await knex<User>("users").where("id", user_id).first();

    if (!user) throw new AppError("Usuário não encontrado.");

    if (email) {
      const userWithUpdatedEmail = await knex<User>("users")
        .where("email", email)
        .first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id)
        throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga informada está incorreta.");
      }

      user.password = password;
      const hashedNewPassword = await hash(password, 8);

      await knex("users")
        .where("id", user_id)
        .update("password", hashedNewPassword);
    } else if (password && !old_password)
      throw new AppError("Você precisa informar a sua senha antiga.");

    await knex("users")
      .where("id", user_id)
      .update({
        name: user.name,
        email: user.email,
        updated_at: knex.raw("CURRENT_TIMESTAMP"),
      });

    return res.json(user);
  }
}
