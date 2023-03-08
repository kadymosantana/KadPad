import { Request, Response } from "express";
import { Router } from "express";
import multer from "multer";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "../config/upload";

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
