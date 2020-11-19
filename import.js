// Load dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data 
const dbSeed1 = require('./seeds/products.js');
// const dbSeed2 = require('./seeds/subscribers.js');

// Import model data
const Products = require('./models/products.js');
// const Subscribers = require('./models/subscribers.js');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

// Set up callback if DB connection fails
db.on('error', (err) => {
  console.log(`DB Connection Error: ${error.message}`)
});

// Set up callback if DB connection is successful
db.once('open', () => {
  console.log('Connected to DB...');
});

// Insert data to DB
Products.insertMany(dbSeed1, (err, product) =>  {
  console.log('Products Data import completed.')
  mongoose.connection.close();
});

/*
Subscribers.insertMany(dbSeed2, (err, subscriber) => {
  console.log('Subscribers Data import completed.')
  mongoose.connection.close();
});
*/