import express from 'express';
import {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
  getAccommodationNames,
  getAccommodationTypes,
  getAccommodationByNameAndType,
} from './accommodation.controller.js';

const router = express.Router();

router.get('/accommodations/names', getAccommodationNames);
router.get('/accommodations/types', getAccommodationTypes);
router.get('/getdata', getAccommodationByNameAndType);
// Create a new accommodation
router.post('/', createAccommodation);

// Get all accommodations
router.get('/', getAllAccommodations);

// Get accommodations by type
// router.get('/type/:type', getAccommodationsByType);

// Get a single accommodation by ID
router.get('/:id', getAccommodationById);

// Update an accommodation by ID
router.put('/:id', updateAccommodation);

// Delete an accommodation by ID
router.delete('/:id', deleteAccommodation);
/////////////////////////

export default router;
