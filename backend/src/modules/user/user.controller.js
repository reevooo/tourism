import jwt from 'jsonwebtoken'; // For generating JWT tokens
import bcryptjs from 'bcryptjs';
import User from '../../../db/models/Users.model.js';
import dotenv from 'dotenv';
import Token from '../../../db/models/Token.model.js';
import { validateChangePassword, validateLogin, validateSignup } from './user.validate.js';
import Reviewmodel from '../../../db/models/Reviews.model.js';
import Itinerary from '../../../db/models/TouristItineraries.model.js';
dotenv.config();
// Sign up controller
// Sign up controller
const generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.jwt_secret
      
    );
  };
  
  export const signup = async (req, res) => {
    try {
      // Validate request data using Joi
      const { error } = validateSignup(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const lowerCaseName = req.body.name.toLowerCase();
      const lowerCaseEmail = req.body.email.toLowerCase();
  
      // Check if user already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
      // Hash password
      const hashPassword = bcryptjs.hashSync(req.body.password, Number(process.env.saltround));
  
      // Create new user
      const newUser = new User({
        name: lowerCaseName,
        email: lowerCaseEmail,
        password: hashPassword,
        role: req.body.role || 'User', // Default role is 'User'
      });
  
      await newUser.save();
  
      // Generate JWT token for the newly created user
      const token = generateToken(newUser);
  
      // Store the token in the database
      const userToken = new Token({
        user: newUser._id,
        token,
      });
  
      await userToken.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


// Login controller
export const login = async (req, res) => {
    try {
      // Validate login data using Joi
      const { error } = validateLogin(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
      
     
  
      // تحويل البريد الإلكتروني إلى أحرف صغيرة
      const email = req.body.email.toLowerCase();
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      // Compare password
      const match = bcryptjs.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      let userToken = await Token.findOne({ user: user._id });
  
      if (!userToken) {
        // إذا لم يكن التوكن موجودًا، نقوم بإنشاء توكن جديد
        const newToken = generateToken(user);
  
        // تخزين التوكن الجديد في قاعدة البيانات
        userToken = new Token({
          user: user._id,
          token: newToken
        });
  
        await userToken.save();
      }
  
      res.status(200).json({
        message: 'Login successful',
        token: userToken.token
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


// Get all users with populated savedItineraries
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('savedItineraries'); // Populate savedItineraries
      res.status(200).json({status:200 , result:true , data:users});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Get specific user by ID
// Get a specific user by ID with populated savedItineraries
export const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id ",id)

    // البحث عن العميل باستخدام id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // إرسال بيانات العميل والحسابات المرتبطة به في الرد
    res.status(200).json({
      message: 'user data found',
      user,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
  };
  

// Change password
export const changePassword = async (req, res) => {
    try {
        // استخدام req.body بدلاً من req.user.email
        const { email, currentPassword, newPassword } = req.body;

        const { error } = validateChangePassword({ email, currentPassword, newPassword });
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const validPassword = await bcryptjs.compare(currentPassword, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Current password is incorrect' });

        const hashedPassword = await bcryptjs.hash(newPassword, Number(process.env.SALTRound));

        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateuser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updateduser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateduser) {
      return res.status(404).json({ message: 'user not found' });
    }
    
    res.status(200).json({ message: 'user updated successfully', updateduser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};
  

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    // حذف جميع الحسابات البنكية الخاصة بالعميل
    await Reviewmodel.deleteMany({ user: id });

    // حذف الـ token الخاص بالعميل
    await Token.deleteMany({ user: id });
      // Itinerary
      await Itinerary.deleteMany({ user: id });
    // حذف العميل
    const deletedCustomer = await User.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer and associated data deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting customer', error });
  }
};

