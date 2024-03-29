import { Router } from "express";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import notesRouter from "./notes.routes";
import tagsRouter from "./tags.routes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

export default routes;
