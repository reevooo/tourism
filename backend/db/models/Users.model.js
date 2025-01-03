import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم المستخدم
  email: { type: String, required: true, unique: true }, // البريد الإلكتروني
  password: { type: String, required: true }, // كلمة المرور
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // دور المستخدم
  savedItineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }], // خطط الرحلات المحفوظة
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
