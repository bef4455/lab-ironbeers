const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// image Beer:
app.get("/",function(req,res){
  const beerImage = "/images/beer.png"

  res.render("index", {pizza: beerImage})
})

// ...
app.get('/beers', (req, res) => {

  punkAPI.getBeers()
  .then(beersFromApi =>  {
    console.log(beersFromApi)
    res.render('beers', {allBeers: beersFromApi} )}) //sending the array allBeers
  .catch(error => console.log(error));
})

app.get("/random-beers",function(req,res){
  punkAPI.getRandom()
    .then(randomBeers => {
      console.log('Beers from the database: ', randomBeers)
    res.render("random-beers",{newRandomBeers: randomBeers[0]})
  }) 
  .catch(error => console.log(error))
})

app.get("/beer/:id", (req,res) => {

  const id = req.params // with the req.params you can use the information of your ID in the url bar
  console.log(id)
  
  punkAPI.getBeer(req.params.id)
  .then(getFreshBeer => {
    console.log(getFreshBeer)
    res.render("singleBeer", {getFreshBeer : getFreshBeer[0]})
  } )


})

app.get('/home', (req, res) => {
  res.render('home')
})


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
