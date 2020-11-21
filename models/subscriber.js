const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    name:  String,
    email: String,
    date:  String
  }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);