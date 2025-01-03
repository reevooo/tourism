import express from 'express';
import {
  signup,
  login,
  getAllUsers,
  changePassword,
  deleteUser,
  updateuser,
  getUserId,
} from './user.controller.js';

const router = express.Router();

// Routes
router.post('/signup', signup); // Signup
router.post('/login', login); // Login
router.get('/users', getAllUsers); // Admin can get all users
router.get('/userdata/:id', getUserId); // Get specific user by ID
router.put('/change-password', changePassword); // Change password
router.delete('/userdelete/:id', deleteUser); // Admin can delete users by ID
router.put('/update/:id', updateuser); // Update user by ID

export default router;
