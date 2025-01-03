import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي كتب المراجعة
  rating: { type: Number, required: true }, // تقييم المستخدم
  comment: { type: String, required: true }, // تعليق المراجعة
  reviewFor: { 
    type: String, 
    enum: ['Destination', 'Accommodation', 'Transportation','Itineraries'], 
    required: true 
  }, 
}, {
  timestamps: true
});

const Reviewmodel = mongoose.model('Review', reviewSchema);
export default Reviewmodel;
