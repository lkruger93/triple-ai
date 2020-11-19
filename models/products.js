const mongoose = require('mongoose');

// Define product Schema
const productSchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    description:  String,
    credit:       String, 
    imagePath:    String  
  }
);

module.exports = mongoose.model('Products', productSchema);