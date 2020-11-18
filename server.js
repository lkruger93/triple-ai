// required modules
const express = require('express');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();
const products = require ('./products.js');

// express app set up
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware and static
app.use(express.static(path.join(__dirname, 'public')));

// page rendering - home
app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Home', current: 'home-pg'});
});
// page rendering - gallery
app.get('/gallery', (req, res) => {
  res.render('pages/gallery', { title: 'Gallery', current: 'gallery-pg'});
});
// page rendering - team
app.get('/team', (req, res) => {
  res.render('pages/team', { title: 'Team', current: 'team-pg'});
});
// page rendering - subscribe
app.get('/subscribe', (req, res) => {
  res.render('pages/subscribe', { title: 'Subscribe', current: 'subscribe-pg'});
});
// page rendering - admin
app.get('/admin', (req, res) => {
  res.render('pages/admin', { title: 'Admin', current: 'admin-pg'});
});

// json gallery endpoint -- took forever to figure out that the endpoint needs to be placed prior to the 404 message
app.get('/api/v0/gallery', (req, res) => {
  res.json(products);
});

// 404 message using middleware
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});




// setting default port to 8080 if a port environment variable isn't found
const PORT = process.env.PORT || 3000;

// Listen for request
app.listen(PORT, () => {
  console.log(`Listening on port${PORT}`);
});

