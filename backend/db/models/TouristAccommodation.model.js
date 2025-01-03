import mongoose from 'mongoose';

const touristAccommodationSchema = new mongoose.Schema({
  touristName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  accommodationPlace: {
    type: String,
    required: true,
    trim: true,
  },
  accommodationType: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const TouristAccommodationmodel = mongoose.model('TouristAccommodation', touristAccommodationSchema);

export default TouristAccommodationmodel;
