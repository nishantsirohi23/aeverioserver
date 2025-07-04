const express = require('express');
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');

const router = express.Router();

// Route to create a new enquiry
router.post('/', createEnquiry);

// Route to fetch all enquiries
router.get('/', getEnquiries);

module.exports = router;