require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const contactRoutes = require('./src/routes/contactRoutes');
const queryformRoutes = require('./src/routes/queryformRoutes');
const packageRoutes = require('./src/routes/packageRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const { logger } = require('./src/utils/logger');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  logger.info(`➡️  Incoming Request: ${req.method} ${req.url}`);
  next();
});

// === Database Connection ===
connectDB();

// === Routes ===
app.use('/api/contacts', contactRoutes);
app.use('/api/queryform', queryformRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/health', (req, res) => {
  logger.info('✅ Health check endpoint hit');
  res.status(200).json({ status: 'UP', message: 'Server is healthy sfdsdf🚀' });
});

app.get('/', (req, res) => {
  res.send('🚀 Welcome to the Node.js API Server - Deployed and Running asdfasdfasdfasdf');
});

// === Error Handling ===
app.use((err, req, res, next) => {
  logger.error(`❌ Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// === Start Server ===
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`✅ Server running and accessible on http://0.0.0.0:${PORT}`);
});
