import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'friendly', 'helpful', 'insightful'],
    default: 'general',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback; 