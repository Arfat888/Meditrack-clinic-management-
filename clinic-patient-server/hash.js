
import bcrypt from "bcryptjs";

const password = "12345"; 
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

console.log("Hashed password:", hashedPassword);
