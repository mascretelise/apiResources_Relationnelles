import AWS from 'aws-sdk';
require('dotenv').config();
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import conn from '../connector/connect';

export async function postUrlBDD(url:string, email:string){
    const request =  "UPDATE utilisateurs SET uti_iconeProfil = ? WHERE uti_email = ?";
    const result = await conn.execute(request,[url, email]);
    console.log("result : ", result)
    return result

}

export async function getUrl(email:string){
    const request = "SELECT uti_iconeProfil FROM utilisateurs WHERE uti_email=?";
    const result = await conn.execute(request, [email])
    console.log("result get url : ", result)
    return result
}