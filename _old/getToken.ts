/*const express = require("express");
const app = express();
 require("dotenv").config();
 import jwt from "jsonwebtoken";
 
 module.exports = function Token(){
  app.get('/authorization', (req:any, res:any) => {
    let { token } = req.headers.Authorization;
  
    console.log(token);
  
    if (!!token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
  }
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
  }
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
      jwt.verify(token,jwtSecretKey, (err:any, decoded:any)=> {
        if(err){
        res.status(401).json({message: 'token invalide'})
      }else{
        req.decoded = decoded;
        const newToken  = jwt.sign({
          user : decoded.user,
          secretOrPrivateKey: jwtSecretKey
      });
      res.header('Authorization', 'Bearer ' + newToken);
      res.status(200).json
      }
      });
      
    } catch(err){
      res.status(401).json({message: 'error servor'})
    }
   })
 }*/
