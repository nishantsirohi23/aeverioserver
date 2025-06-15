const mongoose = require('mongoose');

const requestReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  completedOn: { type: Date, required: true },
  status: { type: String, enum: ['done', 'not done'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RequestReview', requestReviewSchema);