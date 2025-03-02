
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const conn = mariadb.createPool({  
     host: process.env.DB_HOST,   
     user: process.env.DB_USER,   
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
    port: 3307,
    bigIntAsNumber: true
    });
    
export default conn;