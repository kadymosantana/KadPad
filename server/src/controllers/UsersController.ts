import { Request, Response } from "express";
const { hash, compare } = require("bcrypt");
import sqliteConnection from "../database/sqlite";
import AppError from "../../utils/AppError";

export default class UsersController {
  // Listar vários usuários (GET)
  index() {}

  // Listar um usuário específico (GET)
  show() {}

  // Criar um registo (POST)
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return res.status(201).json();
  }

  // Atualizar um usuário (PUT)
  async update(req: Request, res: Response) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    // Verificando se o usuário a ser atualizado existe e se o e-mail passado já está em uso

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    // Lidando com a atualização de nome e e-mail
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name;
    user.email = email;

    // Lidando com a atualização de senha
    if (password && old_password) {
      const checkOldPassword = compare(user.password, old_password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga informada está incorreta.");
      }

      user.password = password;
      const hashedNewPassword = await hash(password, 8);
      database.run(
        `
        UPDATE users 
        SET password = (?) 
        WHERE id = (?)`,
        [hashedNewPassword, id]
      );
    } else if (password && !old_password) {
      throw new AppError("Você precisa informar a sua senha antiga.");
    }

    // Atualizando usuário no banco de dados
    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = DATETIME('now') 
      WHERE id = ?`,
      [user.name, user.email, id]
    );

    return res.json();
  }

  // Excluir um usuário (DELETE)
  delete() {}
}
