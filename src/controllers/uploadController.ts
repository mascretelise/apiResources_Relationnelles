import { Request, Response } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { RequestHandler } from 'express';

// Création du client S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Configuration de multer avec S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    acl: 'public-read',
    key: (_req, file, cb) => {
      const folder = 'uploads/';
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, folder + fileName);
    },
  }),
});

// Middleware d'upload pour un fichier
export const uploadMiddleware = upload.single('file');

export const uploadToS3: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Aucun fichier fourni." });
      return;
    }

    const file = req.file as Express.MulterS3.File;
    res.status(200).json({ url: file.location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de l'upload." });
  }
};
