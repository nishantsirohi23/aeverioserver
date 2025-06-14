const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');
const { createQueryform, getAllQueryForms } = require('../controllers/queryformController');
const { getAllContacts } = require('../controllers/contactController');

// Log all incoming requests to contact routes
router.use((req, res, next) => {
  logger.info(`Contact Route: ${req.method} ${req.originalUrl}`);
  next();
});

// POST /api/contacts - Create a new contact
router.post('/', createQueryform);

// GET /api/contacts - Get all contacts
router.get('/', getAllQueryForms);

module.exports = router;