const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Imagenes', imageSchema);