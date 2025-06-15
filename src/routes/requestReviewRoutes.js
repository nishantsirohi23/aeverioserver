const express = require('express');
const {
  createRequestReview,
  getAllRequestReviews,
  getRequestReviewById,
} = require('../controllers/requestReviewController');

const router = express.Router();

// Route to create a new review request
router.post('/', createRequestReview);

// Route to fetch all review requests
router.get('/', getAllRequestReviews);

// Route to fetch a review request by ID
router.get('/:id', getRequestReviewById);

module.exports = router;