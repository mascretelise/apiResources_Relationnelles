import express from 'express';
import { uploadMiddleware, uploadToS3 } from '../controllers/uploadController';

const router = express.Router();

router.
    route('/upload')
    .post(uploadMiddleware, uploadToS3);

export default router;