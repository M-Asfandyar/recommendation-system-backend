const express = require('express');
const router = express.Router();
const axios = require('axios');

// Used the Flask API URL from environment variables
const flaskApiUrl = process.env.FLASK_API_URL;

router.post('/recommend', async (req, res) => {
  try {
    const { user_id } = req.body;

    // Send user data (user_id) to the Flask API
    const response = await axios.post(`${flaskApiUrl}/predict`, { user_id });

    // Forward the recommendations back to the client
    res.json({ recommendations: response.data.recommendations });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error getting recommendations' });
  }
});

module.exports = router;
