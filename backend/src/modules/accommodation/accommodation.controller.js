import Accommodationmodel from "../../../db/models/Accommodation.model.js";

// Create new accommodation
export const createAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodationmodel(req.body);
    const savedAccommodation = await newAccommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating accommodation', error });
  }
};

// Get all Accommodation
export const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodationmodel.find();
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations', error });
  }
};

// Get accommodations by type
// export const getAccommodationsByType = async (req, res) => {
//   try {
//     const { type } = req.params;
//     const accommodations = await Accommodation.find({ type });
//     res.status(200).json(accommodations);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching accommodations by type', error });
//   }
// };

// Get accommodation by ID
export const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodationmodel.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodation', error });
  }
};

// Update accommodation
export const updateAccommodation = async (req, res) => {
  try {
    const updatedAccommodation = await Accommodationmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAccommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json(updatedAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating accommodation', error });
  }
};

// Delete accommodation
export const deleteAccommodation = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodationmodel.findByIdAndDelete(req.params.id);
    if (!deletedAccommodation) return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json({ message: 'Accommodation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting accommodation', error });
  }
};

export const getAccommodationNames = async (req, res) => {
    try {
      const accommodationNames = await Accommodationmodel.distinct('name'); // Use distinct to get unique names
      res.status(200).json(accommodationNames);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching accommodation names', error });
    }
  };
  
  export const getAccommodationTypes = async (req, res) => {
    try {
      const accommodationTypes = await Accommodationmodel.distinct('type'); // Get unique types
      res.status(200).json(accommodationTypes);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching accommodation types', error });
    }
  };

  export const getAccommodationByNameAndType = async (req, res) => {
    try {
      const { name, type } = req.query;
  
      // Build the filter object based on query parameters
      const filter = {};
      if (name) filter.name = name;
      if (type) filter.type = type;
  
      const accommodations = await Accommodationmodel.find(filter);
  
      if (accommodations.length === 0) {
        return res.status(404).json({ message: 'No accommodations found with the given criteria' });
      }
  
      res.status(200).json(accommodations);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching accommodation', error });
    }
  };
  
  