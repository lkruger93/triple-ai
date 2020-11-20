const mongoose = require('mongoose');

// Define product Schema
const productSchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    description:  String,
    credit:       String,
    price:        Number, 
    imagePath:    String,
    width:        Number  
  }
);

module.exports = mongoose.model('Product', productSchema);