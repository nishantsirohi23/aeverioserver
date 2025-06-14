const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  review: { type: String, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 }, // Star rating from 1 to 5
  date: { type: Date, default: Date.now }, // Date of the review
});

module.exports = mongoose.model('Review', reviewSchema);