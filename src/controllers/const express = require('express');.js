const express = require('express');
const { requestReview } = require('../controllers/reviewController');

const router = express.Router();

// Route to request a new review
router.post('/request', requestReview);

module.exports = router;