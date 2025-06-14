const Package = require('../models/Package');
const { logger } = require('../utils/logger');

exports.createPackage = async (req, res) => {
  try {
    logger.info('Creating new package', { body: req.body });
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();

    logger.info('Package created successfully', { id: savedPackage._id });
    res.status(201).json({ success: true, data: savedPackage });
  } catch (error) {
    logger.error('Error creating package', { error: error.message });
    res.status(400).json({ success: false, error: error.message });
  }
};



exports.getAllPackages = async (req, res) => {
  const { page = 1, limit = 10, name } = req.query;

  const query = {};
  if (name && name.trim() !== '') {
    query.title = { $regex: name, $options: 'i' };
  }

  try {
    const packages = await Package.find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Package.countDocuments(query);

    logger.info(`Fetched ${packages.length} packages for page ${page} with limit ${limit}`);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    logger.error('Error fetching packages', { error: error.message });
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Controller for editing package details
exports.editPackageDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find the package by ID and update it
    const updatedPackage = await Package.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({ message: 'Package updated successfully', data: updatedPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

