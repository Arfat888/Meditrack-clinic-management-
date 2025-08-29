// controllers/authController.js
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login function
export const login = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists in database
  const sql = "SELECT * FROM users WHERE email = ?";
  
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // If no user found
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Create JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      // Send success response with token
      res.json({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          email: user.email
        }
      });

    } catch (error) {
      console.log("Password comparison error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

// Verify token middleware (to protect routes)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    
    req.user = decoded;
    next();
  });
};