import { Router } from "express";
import NotesController from "../controllers/NotesController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.get("/", notesController.index);
notesRouter.post("/", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;
