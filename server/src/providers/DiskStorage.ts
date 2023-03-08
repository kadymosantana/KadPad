import fs from "fs";
import path from "path";
import multer from "multer";
import uploadConfig from "../config/upload";

export default class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    ); // movendo o arquivo para a pasta "uploads"
    return file;
  }
  async deleteFile(file: string) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath); // acessando dados do arquivo caso ele exista
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
