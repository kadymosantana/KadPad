import path from "path";
import crypto from "crypto";
import multer from "multer";
import { Request } from "express";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req: Request, file: Express.Multer.File, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
