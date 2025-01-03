import mongoose from 'mongoose';

const touristSchema = new mongoose.Schema({
  touristName: { type: String, required: true }, // اسم السائح
  email: { type: String, required: true }, // البريد الإلكتروني
  phone: { type: String, required: true }, // رقم الهاتف
  typeTransportation: { 
    type: String, 
    enum: ['Public Transport', 'Car Rental', 'Taxi'], // نوع المواصلات
    required: true 
  },
}, {
  timestamps: true
});

const Touristtransportmodel = mongoose.model('Tourist', touristSchema);
export default Touristtransportmodel;
