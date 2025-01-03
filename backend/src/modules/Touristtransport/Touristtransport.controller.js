import Touristtransportmodel from "../../../db/models/touristtransportation.model.js";

// Create a new tourist
export const createTourist = async (req, res) => {
  try {
    const { touristName, email, phone, typeTransportation } = req.body;
    const newTourist = new Touristtransportmodel({ touristName, email, phone, typeTransportation });
    await newTourist.save();
    res.status(201).json({status : 201 ,success: true, message: 'Tourist created successfully', newTourist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tourists
export const getAllTourists = async (req, res) => {
  try {
    const tourists = await Touristtransportmodel.find();
    res.status(200).json(tourists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tourist by ID
export const getTouristById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourist = await Touristtransportmodel.findById(id);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });
    res.status(200).json(tourist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update tourist
export const updateTourist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTourist = await Touristtransportmodel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTourist) return res.status(404).json({ message: 'Tourist not found' });
    res.status(200).json(updatedTourist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete tourist
export const deleteTourist = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTourist = await Touristtransportmodel.findByIdAndDelete(id);
    if (!deletedTourist) return res.status(404).json({ message: 'Tourist not found' });
    res.status(200).json({ message: 'Tourist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
