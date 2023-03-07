const express = require("express");

import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import migrationsRun from "./database/sqlite/migrations";

const Routes = require("./routes");

import AppError from "../utils/AppError";

const app = express();
app.use(express.json());
app.use(Routes);

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
