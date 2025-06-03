const express = require('express');
const router = express.Router();
const { createPackage, getAllPackages } = require('../controllers/packageController');
const { logger } = require('../utils/logger');

// Middleware for logging
router.use((req, res, next) => {
  logger.info(`Package Route: ${req.method} ${req.originalUrl}`);
  next();
});

// POST /api/packages - Create a new package
router.post('/', createPackage);
// GET /api/packages/:id - Get a single package by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const pkg = await require('../models/Package').findById(id);
      if (!pkg) {
        return res.status(404).json({ success: false, message: 'Package not found' });
      }
      res.status(200).json({ success: true, data: pkg });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Invalid ID or server error' });
    }
  });
  
// GET /api/packages - Get all packages
router.get('/', getAllPackages);

module.exports = router;
