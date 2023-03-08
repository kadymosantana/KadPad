import { Request, Response } from "express";
import knex from "../database/knex";
import DiskStorage from "../providers/DiskStorage";
import AppError from "../../utils/AppError";
import { User } from "../types";

export default class UserAvatarController {
  async update(req: Request, res: Response) {
    const user_id = req.user?.id;
    const avatarFilename = req.file!.filename;

    const diskStorage = new DiskStorage();

    const user = await knex<User>("users").where("id", user_id).first();
    if (!user)
      throw new AppError(
        "Somente usuários autenticados podem alterar o avatar",
        401
      );

    if (user.avatar) await diskStorage.deleteFile(user.avatar);
    diskStorage.saveFile(avatarFilename);
    user.avatar = avatarFilename;

    await knex("users").update(user).where("id", user_id);

    res.json(user);
  }
}
