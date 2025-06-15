const express = require('express');
const {
  createRequestReview,
  getAllRequestReviews,
  getRequestReviewById,
  deleteRequestReview,
  updateRequestReviewStatus,
} = require('../controllers/requestReviewController');

const router = express.Router();

// Route to create a new review request
router.post('/', createRequestReview);

// Route to fetch all review requests
router.get('/', getAllRequestReviews);

// Route to fetch a review request by ID
router.get('/:id', getRequestReviewById);

// Route to delete a review request by ID
router.delete('/:id', deleteRequestReview);

// Route to update the status of a review request
router.patch('/:id/status', updateRequestReviewStatus);

module.exports = router;