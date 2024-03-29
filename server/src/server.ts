import type { Request, Response, NextFunction } from "express";

import express from "express";
import "express-async-errors";

import Routes from "./routes";
import AppError from "../utils/AppError";

const cors = require("cors");
const history = require("connect-history-api-fallback");

const app = express();
app.use(express.json());
app.use(history());
app.use(cors({ origin: "https://kadpad.vercel.app" }));
app.use(Routes);

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
