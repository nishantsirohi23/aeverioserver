const express = require('express');
const router = express.Router();
const { createPackage, getAllPackages, updatePackageImages } = require('../controllers/packageController');
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
// GET /api/packages/search?name=some-name - Search packages by name
// This should come BEFORE `/:id`
router.get('/search/name', async (req, res) => {
  const { name } = req.query;

  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, error: 'Package name query is required' });
  }

  try {
    const packages = await require('../models/Package').find({
      title: { $regex: name, $options: 'i' }, // assuming 'title' is the correct field
    });
    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    logger.error('Error searching packages by name', { error: error.message });
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// PATCH /api/packages/:id/images - Update image URLs of a package
router.patch('/:id/images', updatePackageImages);

module.exports = router;
