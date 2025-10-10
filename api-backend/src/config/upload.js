const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Caminho absoluto para a pasta de uploads
const uploadsPath = path.resolve(__dirname, "..", "public", "uploads");

// Configuração de armazenamento em disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        cb(err, file.originalname);
      }
      const fileName = `${hash.toString("hex")}-${file.originalname}`;
      cb(null, fileName);
    });
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido. Apenas imagens são permitidas."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
});

module.exports = upload;
