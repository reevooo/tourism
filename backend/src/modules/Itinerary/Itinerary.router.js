import express from 'express';

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { createItinerary, deleteItinerary, getItineraries, getItineraryById, updateItinerary } from './Itinerary.controller.js';

const router = express.Router();

// Create a new itinerary
router.post('/', createItinerary);

// Get all itineraries for the authenticated user
router.get('/', authMiddleware, getItineraries);

// Get a specific itinerary by ID
router.get('/:id', authMiddleware, getItineraryById);

// Update an itinerary
router.put('/:id', authMiddleware, updateItinerary);

// Delete an itinerary
router.delete('/:id', authMiddleware, deleteItinerary);

export default router;
