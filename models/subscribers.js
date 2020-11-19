const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    id:    Number,
    name:  String,
    email: String,
    date:  Object
  }
);

module.exports = mongoose.model('Subscribers', subscriberSchema);