import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // اسم مكان الإقامة
  type: { type: String, enum: ['Hotel', 'Vacation Rental'], required: true }, // نوع مكان الإقامة
  map: {
    iframeUrl: { type: String, required: true }, // رابط الـ iframe لخريطة Google
    width: { type: Number, default: 600 }, // عرض الخريطة
    height: { type: Number, default: 450 }, // ارتفاع الخريطة
    style: { type: String, default: "border:0;" }, // ستايل iframe
    allowfullscreen: { type: Boolean, default: true }, // السماح بوضع الشاشة الكاملة
    loading: { type: String, default: "lazy" }, // تحسين التحميل
    referrerpolicy: { type: String, default: "no-referrer-when-downgrade" } // سياسة المراجع
  },
  pricePerNight: { type: Number, required: true }, // السعر لكل ليلة
  availability: { type: Boolean, default: true }, // مدى توفر مكان الإقامة
  images: [
    {
      url: { type: String, required: true },
    },
  ], // صور لمكان الإقامة
  contactInfo: { type: String }, // معلومات التواصل مع مكان الإقامة
  ratings: { type: Number, default: 0 }, // تقييمات مكان الإقامة
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // المراجعات المرتبطة بمكان الإقامة
}, {
  timestamps: true
});

const Accommodationmodel = mongoose.model('Accommodation', accommodationSchema);
export default Accommodationmodel;
