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
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    logger.info(`Fetched ${packages.length} packages`);
    res.status(200).json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    logger.error('Error fetching packages', { error: error.message });
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
