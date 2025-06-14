const QueryForm = require('../models/QueryForm');
const { logger } = require('../utils/logger');

// Create a new query form
exports.createQueryform = async (req, res) => {
  try {
    logger.info('Creating new query form', { body: req.body });

    const { name, email, mobile, numberOfTravellers, destination } = req.body;

    const newQuery = new QueryForm({
      name,
      email,
      mobile,
      numberOfTravellers,
      destination,
    });

    const savedQuery = await newQuery.save();

    logger.info('Query form created successfully', { query: savedQuery });

    res.status(201).json({
      success: true,
      data: savedQuery,
      message: 'Query form submitted successfully',
    });
  } catch (error) {
    logger.error('Error creating query form', { error: error.message });
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all query forms
exports.getAllQueryForms = async (req, res) => {
  try {
    logger.info('Fetching all query forms');
    const queries = await QueryForm.find().sort({ createdAt: -1 });

    logger.info(`Found ${queries.length} query forms`);

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries,
    });
  } catch (error) {
    logger.error('Error fetching query forms', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
