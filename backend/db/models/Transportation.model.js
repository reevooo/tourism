import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
  type: { type: String, enum: ['Public Transport', 'Car Rental', 'Taxi','metro','sar railway'], required: true }, // نوع المواصلات
  providerName: { type: String, required: true }, // اسم مقدم الخدمة
  availability: { type: Boolean, default: true }, // مدى توفر الخدمة
  contactInfo: { type: String }, // معلومات التواصل مع مقدم الخدمة
  price: { type: Number, required: true }, // تكلفة الخدمة
  images: [
    {
      url: { type: String, required: true },
    },
  ]
}, {
  timestamps: true
});

const Transportationmodel = mongoose.model('Transportation', transportationSchema);
export default Transportationmodel;
