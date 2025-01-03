import Itinerary from "../../../db/models/TouristItineraries.model.js";

// Create a new itinerary
export const createItinerary = async (req, res) => {
    try {
      // Destructure the body to extract userId and other fields
      const { userId, destinations, startDate, endDate, notes } = req.body;
  
      // Ensure userId is provided
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const newItinerary = new Itinerary({
        user: userId, // Set userId from request body
        destinations,
        startDate,
        endDate,
        notes,
      });
  
      const savedItinerary = await newItinerary.save();
      res.status(201).json(savedItinerary);
    } catch (error) {
      res.status(500).json({ message: 'Error creating itinerary', error });
    }
  };
  

// Get all itineraries for the authenticated user
export const getItineraries = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the middleware

    const itineraries = await Itinerary.find({ user: userId }).populate('destinations');
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching itineraries', error });
  }
};

// Get a specific itinerary by ID
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('destinations');

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    if (itinerary.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching itinerary', error });
  }
};

// Update an existing itinerary
export const updateItinerary = async (req, res) => {
  try {
    const { destinations, startDate, endDate, notes } = req.body;
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    if (itinerary.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    itinerary.destinations = destinations || itinerary.destinations;
    itinerary.startDate = startDate || itinerary.startDate;
    itinerary.endDate = endDate || itinerary.endDate;
    itinerary.notes = notes || itinerary.notes;

    const updatedItinerary = await itinerary.save();
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(500).json({ message: 'Error updating itinerary', error });
  }
};

// Delete an itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    if (itinerary.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await itinerary.remove();
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting itinerary', error });
  }
};
