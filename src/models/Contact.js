const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to log before saving
contactSchema.pre('save', function(next) {
  logger.info(`Attempting to save contact: ${this.name}`);
  next();
});

// Middleware to log after saving
contactSchema.post('save', function(doc) {
  logger.info(`Contact saved successfully: ${doc.name}`);
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;