const express = require('express');
const router = express.Router();
const axios = require('axios');

const flaskApiUrl = process.env.FLASK_API_URL;

router.post('/recommend', async (req, res) => {
  try {
    const userData = req.body;

    // Send a POST request to the Flask service using the environment variable
    const response = await axios.post(`${flaskApiUrl}/predict`, userData);

    // Send the recommendation back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error getting recommendation' });
  }
});

module.exports = router;
