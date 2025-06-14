const Message = require('../models/messageModel');

// Controller to post a new message
const postMessage = async (req, res) => {
  try {
    const { name, email, phoneNumber, requirement } = req.body;

    // Create a new message
    const newMessage = await Message.create({ name, email, phoneNumber, requirement });

    res.status(201).json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error: error.message });
  }
};

// Controller to get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json({ message: 'Messages retrieved successfully', data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
};

module.exports = {
  postMessage,
  getMessages,
};