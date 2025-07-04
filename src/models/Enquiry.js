const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  numberOfTravellers: {
    type: Number,
    required: [true, 'Number of travellers is required'],
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit WhatsApp number'],
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

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;