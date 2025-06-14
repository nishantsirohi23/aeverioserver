const express = require('express');
const { addReview, getReviewsByPackageId } = require('../controllers/reviewController');

const router = express.Router();

// Route to add a review for a package
router.post('/:packageId', addReview);

// Route to fetch reviews for a specific package
router.get('/:packageId', getReviewsByPackageId);

module.exports = router;