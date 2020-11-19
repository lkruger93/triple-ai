// Load dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv').config();

// Import models
const Products = require(`./models/products.js`);
const Subscribes = require(`./models/subscribers.js`);

// Connect to MongoDB
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

// Set up callback if DB connection fails
db.on('error', (err) => {
  console.log(`DB Connection Error: ${error.message}`)
});

// Set up callback if DB connection is successful
db.once('open', (err) => {
  console.log('Connected to DB...');
});

// Create express app
const app = express();

// Set view engine
app.set('view engine','ejs')

// Use app.use to register middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Create HTML endpoint
// page rendering - home
app.get('/', (req, res) => {
  res.render('pages/index', { 
    title: 'Home', 
    current: 'home-pg'
  });
});

// page rendering - gallery
app.get('/gallery', (req, res) => {
  res.render('pages/gallery', { 
    title: 'Gallery', 
    current: 'gallery-pg'
  });
});

// page rendering - team
app.get('/team', (req, res) => {
  res.render('pages/team', { 
    title: 'Team', 
    current: 'team-pg'
  });
});

// page rendering - subscribes
app.get('/subscribe', (req, res) => {
  res.render('pages/subscribe', { 
    title: 'Subscribe', 
    current: 'subscribe-pg'
  });
});

// page rendering - admin
app.get('/admin', (req, res) => {
  res.render('pages/admin', { 
    title: 'Admin', 
    current: 'admin-pg'
  });
});


// JSON Endpoint: Product list 
app.get('/api/v0/gallery', (req, res) => {
  Products.find({}, (req, res) => { 
    if (!products) {
      return res.send('Product list does not exist.');
    }
    res.json(products);
  });
})

// JSON Endpoint: One Product ID
app.get('/gallery/:id', (req, res) => {
  let productId = req.params.id;
  Products.findOne({'id': productId}, (req, res) => {
    if (!product) {
      return res.send('This product ID does not exist. Please try again!');
    }
    res.json(product);
  });
})

// JSON POST Endpoint: for Subscriber Form
app.post('/subscribers', (req, res) => {
  let subscribers = new Subscribers(req.body);
  subscribers.save((err) => {
    if (err) return res.status(500).send(err);
    res.send(`<h3>Thank you, ${req.body.name}</h3> <br> <p>Please check out our special offer with your ${req.body.email}.</p>`);
  });
})


// JSON GET Endpoint: for Subscribers Admin
app.get('/api/v0/subscribers', (req, res) => {
  Subscribers.find({}, (req, res) => { 
    if (!subscribers) {
      return res.send('Subscribers list does not exist.');
    }
    res.json(subscribers);
  });
})

// Return 404 errors when a file cannot be found
app.use(function(req, res, next) {
  res.status(404);
  res.send('404 Error: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});