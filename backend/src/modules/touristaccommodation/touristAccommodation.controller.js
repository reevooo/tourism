import TouristAccommodationmodel from "../../../db/models/touristAccommodation.model.js";

// Create a new tourist accommodation record
export const createTouristAccommodation = async (req, res) => {
  try {
    const newTouristAccommodation = new TouristAccommodationmodel(req.body);
    const savedTouristAccommodation = await newTouristAccommodation.save();
    res.status(201).json({ status:201,message: 'Tourist accommodation created', savedTouristAccommodation });
  } catch (error) {
    res.status(400).json({ message: 'Error creating tourist accommodation', error });
  }
};

// Get all tourist accommodations
export const getAllTouristAccommodations = async (req, res) => {
  try {
    const touristAccommodations = await TouristAccommodationmodel.find();
    res.status(200).json(touristAccommodations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tourist accommodations', error });
  }
};

// Get a tourist accommodation by ID
export const getTouristAccommodationById = async (req, res) => {
  try {
    const touristAccommodation = await TouristAccommodationmodel.findById(req.params.id);
    if (!touristAccommodation) return res.status(404).json({ message: 'Tourist accommodation not found' });
    res.status(200).json(touristAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tourist accommodation', error });
  }
};

// Update a tourist accommodation
export const updateTouristAccommodation = async (req, res) => {
  try {
    const updatedTouristAccommodation = await TouristAccommodationmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTouristAccommodation) return res.status(404).json({ message: 'Tourist accommodation not found' });
    res.status(200).json(updatedTouristAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tourist accommodation', error });
  }
};

// Delete a tourist accommodation
export const deleteTouristAccommodation = async (req, res) => {
  try {
    const deletedTouristAccommodation = await TouristAccommodationmodel.findByIdAndDelete(req.params.id);
    if (!deletedTouristAccommodation) return res.status(404).json({ message: 'Tourist accommodation not found' });
    res.status(200).json({ message: 'Tourist accommodation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tourist accommodation', error });
  }
};
