import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "worldcup2019@",
  database: "clinic_db",       
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

export default db;