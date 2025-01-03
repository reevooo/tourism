import Reviewmodel from "../../../db/models/Reviews.model.js";


// Create a new review
export const createReview = async (req, res) => {
  try {
    const { user, rating, comment, reviewFor } = req.body;
    
    // Create the review
    const newReview = new Reviewmodel({ user, rating, comment, reviewFor });
    await newReview.save();

    res.status(201).json({status:201, message: 'Review created successfully', newReview});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews (for a specific service: Destination, Accommodation, or Transportation)
export const getReviews = async (req, res) => {
  try {
    const { reviewFor } = req.params; // Example: Destination, Accommodation, Transportation
    const reviews = await Reviewmodel.find({ reviewFor }).populate('user', 'name'); // Populating user info

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviewmodel.findById(id).populate('user', 'name');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Reviewmodel.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true, runValidators: true }
    ).populate('user', 'name');

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Reviewmodel.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
