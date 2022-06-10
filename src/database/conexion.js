import mysql from "mysql2";

// importando env
import { config } from "dotenv";
config();
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
 
  });
  

export default conexion;