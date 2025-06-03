const Contact = require('../models/Contact');
const { logger } = require('../utils/logger');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    logger.info('Creating new contact', { body: req.body });
    
    const { name, mobile, address } = req.body;
    
    const newContact = new Contact({
      name,
      mobile,
      address,
    });

    const savedContact = await newContact.save();
    
    logger.info('Contact created successfully', { contact: savedContact });
    
    res.status(201).json({
      success: true,
      data: savedContact,
      message: 'Contact created successfully',
    });
  } catch (error) {
    logger.error('Error creating contact', { error: error.message });
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    logger.info('Fetching all contacts');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    logger.info(`Found ${contacts.length} contacts`);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    logger.error('Error fetching contacts', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};