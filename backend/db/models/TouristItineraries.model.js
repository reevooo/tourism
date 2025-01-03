import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي أنشأ الخطة
  destinations: [{ type: String}], // الوجهات المضافة إلى الخطة
  startDate: { type: Date, required: true }, // تاريخ بداية الخطة
  endDate: { type: Date, required: true }, // تاريخ نهاية الخطة
  notes: { type: String }, // ملاحظات المستخدم الخاصة بالرحلة
}, {
  timestamps: true
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
