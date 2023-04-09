import type { Request, Response } from "express";
import type { User } from "../types";

import knex from "../database/knex";
import AppError from "../../utils/AppError";

export default class UserAvatarController {
  async update(req: Request, res: Response) {
    const user_id = req.user?.id;
    const avatarPath = req.file!.path;

    const user = await knex<User>("users").where("id", user_id).first();
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem alterar o avatar",
        401
      );
    }

    user.avatar = avatarPath;
    await knex("users").update(user).where("id", user_id);

    return res.json(user);
  }
}
