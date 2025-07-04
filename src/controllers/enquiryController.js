const Enquiry = require('../models/Enquiry');

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Fetch all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};