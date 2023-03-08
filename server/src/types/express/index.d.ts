export {};

declare global {
  namespace Express {
    export interface Request {
      user?: { id: number };
      file?: Express.Multer.File;
    }
  }
}
