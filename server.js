require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const contactRoutes = require('./src/routes/contactRoutes');
const packageRoutes = require('./src/routes/packageRoutes');

const { logger } = require('./src/utils/logger');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Database Connection
connectDB();

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/packages', packageRoutes);
// Health Check
app.get('/health', (req, res) => {
  logger.info('Health check endpoint hit');
  res.status(200).json({ status: 'UP' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on http://0.0.0.0:${PORT}`);
});
