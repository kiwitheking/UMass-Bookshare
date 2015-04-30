var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bcrypt = require('bcrypt'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('DB_Interface.js')
var login = require('./routes/login');
var sequelize = require('sequelize');
var app = express();
var session = require('client-sessions');
var images = require('./routes/images');
var report = require('./routes/report');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 7 * 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'views')));

app.use('/', login);

app.use('/images',images);
app.use('/report',report);

//login user from login page
app.post('/', function(req, res) {
  db.loginUser(req.body.username,req.body.password,res,req);
});

//gets Home page and displays recent listing
app.get('/home', function(req, res){
  if(req.session.user) {
    db.recentListing(res,req);
  } else {
    res.redirect('/');
  }
});

//displays wishlist page for a user
app.get('/wishlist', function(req, res){
  if(req.session.user) {
    db.wishListing(req.session.user,res,req);
  } else {
    res.redirect('/');
  }
});

//add to users wishlist and removes hyphen in isbn
app.post('/addtowishlist', function(req, res){
  if(req.session.user) {
    console.log("add to wishlist");
    var isbn13_nohyphen = req.body.isbn13.replace(/[^\d]/g, '');
    console.log(isbn13_nohyphen);
    db.addBookWish(req.session.user,isbn13_nohyphen,res,req);
  }
});

//get createlisting page
app.get('/createlisting', function(req, res) {
  if(req.session.user) {
    res.render('createlisting',{message:''});
  } else {
    res.redirect('/');
  }
});

//gets profile to edit for a user
app.get('/editprofile', function(req,res){
  if(req.session.user){
    db.editProfile(req.session.user, res, req);
  }
});

//updates profile after editting it
app.post('/editprofile', function(req,res){
  db.updateProfile(req.session.user, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.institution, res, req);
});

//post createlisting
// ADD PRICE
app.post('/createlisting', function(req, res) {
  if (req.session.user) {
    username = req.session.user;
    isbn13 = req.body.isbn13;
    forRent = req.body.forRent;
    rentPrice = req.body.rentPrice;
    forSale = req.body.forSale;
    sellPrice = req.body.sellPrice;
    forBorrow = req.body.forBorrow;
    available = req.body.available;
    description = req.body.description;
    var isbn13_nohyphen = req.body.isbn13.replace(/[^\d]/g, '');
    console.log(isbn13_nohyphen);
    db.addBookbyISBN(isbn13_nohyphen,username, forRent, rentPrice, forSale, sellPrice, forBorrow, available, description, res, req);
    // for field checks
    // res.render('createlisting',{message:'Invalid input. Please try again.'});
  } else {
    res.render('login',{message:'You must login to create a listing.'});
    // res.redirect('/createlisting',{message:'Listing not created'});
  }
});

//searching for book on the home page
app.post('/home', function(req,res){
  if(req.body.searchTerm == ''){
    res.redirect('/home');
  }
  search = req.body.searchTerm;
  db.search(search,res);
});

//view listing for a certain book
app.post('/viewListing', function(req,res){
  isbn13 = req.body.isbn13;
  db.postBookListing(isbn13, res);
});

//view seller's profile from their listing
app.post('/sellerprofile', function(req,res){
  seller = req.body.seller;
  console.log(seller);
  db.viewProfile(seller, res,req);
});


//renders profile twice since wishlist and selling arrays are sometimes undefined
app.get('/profile', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    console.log(req.session.user);

    db.getProfile(req.session.user, res, req);
    db.getProfile(req.session.user, res, req);
  
  } else {
    res.redirect('/');
  }
});

//handles deleting a listing
app.post('/deletelisting', function(req,res){
  listid = req.body.listid;
  console.log(listid);
  db.deleteListing(listid, res,req);
});

//handles edit listing
app.post('/updatelisting', function(req,res){
  listid = req.body.listid;
  console.log(listid);
  forRent = req.body.forRent;
  rentPrice = req.body.rentPrice;
  forSale = req.body.forSale;
  sellPrice = req.body.sellPrice;
  forBorrow = req.body.forBorrow;
  available = req.body.available;
  description = req.body.description;
  db.updateListing(listid, forRent, rentPrice, forSale, sellPrice, forBorrow, available, description, res, req);
});

//handles edit listing
app.post('/editlisting', function(req,res){
  listid = req.body.listid;
  console.log(listid);
  db.editListing(listid, res,req);
});

//renders the support page
app.get('/help', function(req, res) {
  if(req.session.user){
    res.render('help');
  }else{
    res.redirect('/');
  }
});

app.get('/FAQ', function(req, res) {
  if(!req.session.user){
    res.render('faq');
  }
});

//handles logout of a user, resets user and sends to login
app.get('/logout', function(req, res) {
  console.log('logout');
  req.session.reset();
  res.redirect('/');
});

//handles get signup
app.get('/signup', function(req, res) {
  res.render('signup',{message:''});
});

//renders the team page
app.get('/team', function(req, res){
  if(req.session.user) {
    res.render('team');
  }
});

//renders the team2 page when the user is not logged in
app.get('/team2', function(req, res) {
  res.render('team2');
});

//renders error page
app.get('/error', function(req, res){
    res.render('error');
});

//handles signing up for a user
app.post('/signup',function(req,res){
  username = req.body.username;
  password = req.body.password;
  fname = req.body.firstName;
  lname = req.body.lastName;
  email = req.body.email;
  phone = req.body.phone.replace(/\D/g,'');
  school = req.body.institution;
  age = 0;
  sex = 'o';
  bcrypt.hash(password, 10, function(err, hash) {
    console.log('hash' , hash)
    password = hash;
    db.checkUser(username, password, age, fname, lname, sex, email, phone, school, res, req);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
