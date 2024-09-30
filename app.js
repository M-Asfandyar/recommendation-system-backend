require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');  // Import the API routes

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Register API routes
app.use('/api', apiRoutes);  // Use the /api prefix

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
