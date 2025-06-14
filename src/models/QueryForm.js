const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

const queryFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
    trim: true,
  },
  numberOfTravellers: {
    type: String,
    required: [true, 'Number of travellers is required'],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Log before save
queryFormSchema.pre('save', function (next) {
  logger.info(`Saving query form: ${this.name}`);
  next();
});

// Log after save
queryFormSchema.post('save', function (doc) {
  logger.info(`Query form saved successfully for: ${doc.name}`);
});

const QueryForm = mongoose.model('QueryForm', queryFormSchema);

module.exports = QueryForm;
