const Review = require('../models/reviewModel');

// Controller to add a review for a package
exports.addReview = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { name, destination, review, starRating } = req.body;

    // Validate starRating
    if (starRating < 1 || starRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Star rating must be between 1 and 5',
      });
    }

    const newReview = new Review({
      packageId,
      name,
      destination,
      review,
      starRating,
    });

    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message,
    });
  }
};

// Controller to fetch reviews for a specific package
exports.getReviewsByPackageId = async (req, res) => {
  try {
    const { packageId } = req.params;

    const reviews = await Review.find({ packageId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};