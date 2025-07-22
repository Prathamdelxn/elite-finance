import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['1:1 Call', 'Priority DM', 'Package', 'All'],
  },
  icon: {
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
  badge: {
    type: String,
  },
  badgeColor: {
    type: String,
  },
  multiplier: {
    type: String,
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

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service; 