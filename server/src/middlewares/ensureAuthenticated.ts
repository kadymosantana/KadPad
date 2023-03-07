import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../../utils/AppError";

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token não informado.");

  const token = authHeader.split(" ").at(1);
  try {
    if (token) {
      const { sub: user_id } = verify(token, authConfig.jwt.secret); // retorna a informação passada em "subject" ao criar o token

      req.user = {
        id: +user_id!,
      };
      next();
    }
  } catch {
    throw new AppError("Token inválido");
  }
}
