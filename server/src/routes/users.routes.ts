import { Router } from "express";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import upload from "../config/upload";

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRoutes;
