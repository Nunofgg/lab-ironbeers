const express = require('express');

const hbs = require('hbs');
const async = require('hbs/lib/async');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', { beers });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('random-beer', { beer });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
