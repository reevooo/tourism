import express from 'express';
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from './reviews.controller.js';

const router = express.Router();

// Create a review
router.post('/', createReview);

// Get all reviews for a specific service (e.g., Destination, Accommodation, Transportation)
router.get('/:reviewFor', getReviews);

// Get a specific review by ID
router.get('/detail/:id', getReviewById);

// Update a review by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

export default router;
