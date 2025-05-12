require('dotenv').config();
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Request, Response, NextFunction } from "express";
import * as uploadIconeProfilAccessor from "../data/accessor/uploadIconeProfilAccessor"
import { emailByToken } from './authentificationController';

const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY as string,
      secretAccessKey: process.env.SECRET_KEY as string,
    },
});

const uploadIconeProfil = multer({

    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_BUCKET_NAME as string,
        acl: 'public-read',
       // const random = crypto.randomUUID
        key: function (req, file, cb){
            const folder = 'iconesProfil/';
            cb(null,folder + file.originalname);
        },
    }),
    
});


const postUrlIcone = async (req: Request, res: Response) => {
    const { url, email } = req.body;
    console.log("url : ", url, "email : ", email)

    const postUrl = await uploadIconeProfilAccessor.postUrlBDD(url, email)
    if(!postUrl){
        res.status(500).json({message: "URL non envoyé en BDD"})
    }
    console.log(postUrl)
    res.status(200).json({message: "URL envoyé en BDD"})
}

const getUrlIcone = async(req:Request, res:Response) => {
    const email = req.query.email as string
    console.log("email", email)
    const getUrl = await uploadIconeProfilAccessor.getUrl(email);
    if(!getUrl){
        res.status(404).json({message: "URL introuvable"})
    }
    console.log("url : ", getUrl)
    res.status(200).json(getUrl)
}

export {uploadIconeProfil, postUrlIcone, getUrlIcone}