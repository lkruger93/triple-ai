// Load dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv').config();

// Import models
const Product = require(`./models/product.js`);
const Subscriber = require(`./models/subscriber.js`);

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
    tagline: "Enjoy with the TripleAI Gaming Solutions",
    description: "We sells products having artificial intelligence balanced between realistic ideas and artistic instincts.",
    current: 'home-pg'
  });
});

// page rendering - gallery
app.get('/gallery', (req, res) => {
  res.render('pages/gallery', { 
    title: 'Gallery', 
    tagline: 'Find a cool friend here who will be your hobby.', 
    description: '',
    current: 'gallery-pg'
  });
});

// page rendering - team
app.get('/team', (req, res) => {
  res.render('pages/team', { 
    title: 'Team', 
    tagline: 'We are always ready to help you.', 
    description: '',
    current: 'team-pg'
  });
});

// page rendering - subscribes
app.get('/subscribe', (req, res) => {
  res.render('pages/subscribe', { 
    title: 'Subscribe', 
    tagline: 'Sign-up for our Newsletter', 
    description: '',
    current: 'subscribe-pg'
  });
});

// page rendering - admin
app.get('/admin', (req, res) => {
  res.render('pages/admin', { 
    title: 'Admin', 
    tagline: 'Subscribers list', 
    description: 'The subscribers list',
    current: 'admin-pg'
  });
});


// JSON Endpoint: Product list 
app.get('/api/v0/gallery', (req, res) => {
  Product.find({}, (err, products) => { 
    if (!products) {
      res.send('Product list does not exist.');
    }
    res.json(products);
  });
})

// JSON Endpoint: One Product ID
app.get('/gallery/:id', (req, res) => {
  let productId = req.params.id;
  Product.findOne({'id': productId}, (err, product) => {
    if (!product) {
      res.send('This product ID does not exist. Please try again!');
    }
    res.json(product);
  });
})

// JSON POST Endpoint: for Subscriber Form
app.post('/subscribers', (req, res) => {
  let subscriber = new Subscriber(req.body);
  subscriber.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(`<h3>Thank you, ${req.body.name}</h3> <br> <p>Please check out our special offer with your ${req.body.email}.</p>`);
  });
})


// JSON GET Endpoint: for Subscribers Admin
app.get('/api/v0/subscribers', (req, res) => {
  Subscriber.find({}, (err, subscribers) => { 
    if (!subscribers) {
      res.send('Subscribers list does not exist.');
    }
    res.json(subscribers);
  });
})

// Return 404 errors when a file cannot be found
app.get( '*', (req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname})
  res.status(404).sendFile('./views/pages/404.html', { root: __dirname});
});
// app.use(function(req, res, next) {
//   res.status(404);
//   res.send('404 Error: File Not Found');
// });

// Set port preference with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});