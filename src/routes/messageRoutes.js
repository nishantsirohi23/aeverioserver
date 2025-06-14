const express = require('express');
const { postMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

// Route to post a new message
router.post('/', postMessage);

// Route to get all messages
router.get('/', getMessages);

module.exports = router;