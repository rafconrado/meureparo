import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

const uploadsPath = path.resolve(__dirname, "..", "..", "public", "uploads");

// Configuração de armazenamento em disco
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    crypto.randomBytes(16, (err: Error | null, hash: Buffer) => {
      if (err) {
        cb(err, file.originalname);
      } else {
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      }
    });
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido. Apenas imagens são permitidas."));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
});