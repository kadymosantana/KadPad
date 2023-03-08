import express from "express";
import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import migrationsRun from "./database/sqlite/migrations";
import uploadConfig from "./config/upload";

const Routes = require("./routes");

import AppError from "../utils/AppError";
import upload from "./config/upload";

const app = express();
app.use(express.json());
app.use(Routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

migrationsRun();

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Running in PORT ${PORT}`));
