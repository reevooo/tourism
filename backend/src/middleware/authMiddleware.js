import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Authentication middleware
export const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  
  // Log the received token for debugging
  console.log("Received token:", token);
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Attach verified user data to request
    next();
  } catch (err) {
    // Log the error for debugging
    console.error("Token verification error:", err.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};
