import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم الوجهة السياحية
  description: { type: String, required: true }, // وصف الوجهة
  category: { type: String, enum: ['Historical', 'Entertainment', 'Natural', 'Cultural', 'Religious'], required: true }, // فئة الوجهة
  location: { 
    type: { type: String, enum: ['Point'], default: 'Point' }, // نوع الموقع (Point)
    coordinates: { type: [Number], required: true } // مصفوفة للإحداثيات [longitude, latitude]
  },
  images: [
    {
      url: { type: String, required: true },
    },
  ], // روابط الصور الخاصة بالوجهة
  openingHours: { type: String }, // مواعيد العمل
  entryFee: { type: Number }, // رسوم الدخول
  ratings: { type: Number, default: 0 }, // تقييمات الوجهة
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // المراجعات المرتبطة بهذه الوجهة
}, {
  timestamps: true
});

// إضافة فهرس يدعم البحث الجغرافي
destinationSchema.index({ location: '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
