// models/User.js
import mongoose from 'mongoose';

const topSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  sitelink: {
    type: String,
   
  },
  image: {
    type: String,
    default: ''
  },

}, {
  timestamps: true
});

const Top = mongoose.models.Top || mongoose.model('Top', topSchema);
export default Top;
