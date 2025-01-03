import express from 'express';
import {
  createTouristAccommodation,
  getAllTouristAccommodations,
  getTouristAccommodationById,
  updateTouristAccommodation,
  deleteTouristAccommodation
} from './touristAccommodation.controller.js';

const router = express.Router();

// Create a new tourist accommodation
router.post('/', createTouristAccommodation);

// Get all tourist accommodations
router.get('/', getAllTouristAccommodations);

// Get a single tourist accommodation by ID
router.get('/:id', getTouristAccommodationById);

// Update a tourist accommodation by ID
router.put('/:id', updateTouristAccommodation);

// Delete a tourist accommodation by ID
router.delete('/:id', deleteTouristAccommodation);

export default router;
