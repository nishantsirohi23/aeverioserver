const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');
const { logger } = require('../utils/logger');

// Log all incoming requests to contact routes
router.use((req, res, next) => {
  logger.info(`Contact Route: ${req.method} ${req.originalUrl}`);
  next();
});

// POST /api/contacts - Create a new contact
router.post('/', createContact);

// GET /api/contacts - Get all contacts
router.get('/', getAllContacts);

module.exports = router;