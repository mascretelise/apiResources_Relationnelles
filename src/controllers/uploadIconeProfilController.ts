import AWS from 'aws-sdk';
require('dotenv').config();
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
});

const s3 = new AWS.S3();

const uploadIconeProfil = multer({
    storage: multerS3({
        s3: s3 as any,
        bucket: process.env.AWS_BUCKET_NAME as string,
        key: function (req, file, cb){
            cb(null, ''+ file.originalname);
        },
    }),
});

export {uploadIconeProfil}