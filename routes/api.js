const express = require('express');
const router = express.Router();
const axios = require('axios');
const Feedback = require('../models/Feedback');

// Load the Flask API URL from the environment variables
const flaskApiUrl = process.env.FLASK_API_URL;

console.log("Flask API URL:", flaskApiUrl);  // Log the Flask API URL to confirm it's loaded

// Route to send user_id to Flask and get recommendations
router.post('/recommend', async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log(`Sending request to Flask API at ${flaskApiUrl}/predict with user_id: ${user_id}`);

    const response = await axios.post(`${flaskApiUrl}/predict`, { user_id });

    res.json({ recommendations: response.data.recommendations });
  } catch (error) {
    console.error('Error in /recommend:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error getting recommendations' });
  }
});

// Feedback route
router.post('/feedback', async (req, res) => {
  try {
    const { user_id, feedback } = req.body;

    console.log("Sending feedback to Flask API at:", flaskApiUrl);

    // Save feedback to MongoDB
    const newFeedback = new Feedback({ user_id, feedback });
    await newFeedback.save();

    // Send feedback to Flask service
    await axios.post(`${flaskApiUrl}/feedback`, { user_id, feedback });

    res.json({ message: 'Feedback received' });
  } catch (error) {
    console.error('Error sending feedback:', error.message);
    res.status(500).json({ error: 'Error sending feedback' });
  }
});

module.exports = router;
