import express from 'express';
import { createTransportation, deleteTransportation, getAllTransportations,getAllTypes,getTransportationByType, updateTransportation } from './transport.controller.js';


const router = express.Router();

// CRUD routes
router.post('/', createTransportation);           // Create
router.get('/', getAllTransportations);           // Read all
router.get('/type/:type', getTransportationByType); // Read by type
router.get('/types', getAllTypes);                 // Read all types
router.put('/:id', updateTransportation);         // Update
router.delete('/:id', deleteTransportation);      // Delete

export default router;
