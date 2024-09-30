const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  feedback: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
