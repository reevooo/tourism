import express from 'express';
import {
  createTourist,
  getAllTourists,
  getTouristById,
  updateTourist,
  deleteTourist
} from './Touristtransport.controller.js';

const router = express.Router();

// CRUD routes
router.post('/', createTourist);           // Create
router.get('/', getAllTourists);           // Read all
router.get('/:id', getTouristById);        // Read by ID
router.put('/:id', updateTourist);         // Update
router.delete('/:id', deleteTourist);      // Delete

export default router;
