import Transportationmodel from "../../../db/models/Transportation.model.js";

// Create a new transportation entry
export const createTransportation = async (req, res) => {
  try {
    const { type, providerName, availability, contactInfo, price, images } = req.body;
    const newTransportation = new Transportationmodel({ type, providerName, availability, contactInfo, price, images });
    await newTransportation.save();
    res.status(201).json(newTransportation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transportation entries
export const getAllTransportations = async (req, res) => {
  try {
    const transportations = await Transportationmodel.find();
    res.status(200).json(transportations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transportation by type
export const getTransportationByType = async (req, res) => {
  try {
    const { type } = req.params;
    const transportations = await Transportationmodel.find({ type });
    res.status(200).json(transportations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all distinct transportation types
export const getAllTypes = async (req, res) => {
  try {
    const types = await Transportationmodel.distinct('type');
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update transportation
export const updateTransportation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransportation = await Transportationmodel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransportation) return res.status(404).json({ message: "Transportation not found" });
    res.status(200).json(updatedTransportation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete transportation
export const deleteTransportation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransportation = await Transportationmodel.findByIdAndDelete(id);
    if (!deletedTransportation) return res.status(404).json({ message: "Transportation not found" });
    res.status(200).json({ message: "Transportation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
