import { Router } from "express";
import NotesController from "../controllers/NotesController";

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.post("/:user_id", notesController.create);


module.exports = notesRouter;