import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  badgeColor: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  subtitleType: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  multiplier: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema); 