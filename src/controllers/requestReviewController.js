const RequestReview = require('../models/RequestReview'); // Assuming you have a Mongoose model named RequestReview

// Controller to create a new review request
exports.createRequestReview = async (req, res) => {
  try {
    const { name, packageId, completedOn, status } = req.body;

    const newRequestReview = new RequestReview({
      name,
      packageId,
      completedOn,
      status,
    });

    const savedRequestReview = await newRequestReview.save();

    // Generate the URL to send to the user
    const reviewUrl = `https://aeroviaholiday.com/submit-review/${savedRequestReview._id}`;

    res.status(201).json({
      success: true,
      message: 'Review request created successfully',
      reviewUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review request',
      error: error.message,
    });
  }
};

// Controller to fetch all review requests
exports.getAllRequestReviews = async (req, res) => {
  try {
    const requestReviews = await RequestReview.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requestReviews.length,
      data: requestReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review requests',
      error: error.message,
    });
  }
};

// Controller to fetch a review request by ID
exports.getRequestReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const requestReview = await RequestReview.findById(id);

    if (!requestReview) {
      return res.status(404).json({
        success: false,
        message: 'Review request not found',
      });
    }

    res.status(200).json({
      success: true,
      data: requestReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review request',
      error: error.message,
    });
  }
};

// Controller to delete a review request by ID
exports.deleteRequestReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await RequestReview.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review request not found' });
    }

    res.status(200).json({ message: 'Review request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review request', error });
  }
};

// Controller to update the status of a review request
exports.updateRequestReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedReview = await RequestReview.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review request not found' });
    }

    res.status(200).json({ message: 'Review request status updated successfully', data: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review request status', error });
  }
};