var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bcrypt = require('bcrypt'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('DB_Interface.js')
var login = require('./routes/login');
var profile = require('./routes/profile');
var wishlist = require('./routes/wishlist');
//ADDED THIS
var sequelize = require('sequelize');

var app = express();

var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 7 * 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

var pg = require('pg');
//put in your own connection here
var conString = "postgres://postgres:postgres@localhost/UMass-Books";

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

//login 
app.post('/', function(req, res) {
    db.loginUser(req.body.username, req.body.password, res, req);
});
  
//Home page
app.get('/home', function(req, res){
  if(req.session.user) {
    db.recentListing(res,req);
  } else {
    res.redirect('/');
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

//post createlisting
// ADD PRICE
app.post('/createlisting', function(req, res) {
  if (req.session.user) {
    username = req.body.username;
    isbn13 = req.body.isbn13;
    forRent = req.body.forRent;
    forSale = req.body.forSale;
    forBorrow = req.body.forBorrow;
    available = req.body.available;
    db.makeListing(username, isbn13, forRent, forSale, forBorrow, available);
    res.render('createlisting',{message:'Listing created'});
  } else {
    res.render('login',{message:'You must login to create a listing.'});
    // res.redirect('/createlisting',{message:'Listing not created'});
  }
});

// Don't post on homepage
app.post('/home', function(req,res){
  search = req.body.searchTerm;
  //db.searchBook(search, renderHome(res,record));
  db.postBookListing(search, res);
});

app.get('/profile', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    console.log(req.session.user);
    pg.connect(conString, function(err, client) {
    var query = client.query({
      text: 'Select * from users where username =$1',
      values: [req.session.user.replace(/\s+/g,'')]
    });
    query.on('row', function(row) {
         if (!row) {

        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        client.end();
        req.session.reset();
        res.redirect('/');
          } else {
            // expose the user to the template
            // render the profile page
            res.render('profile', { username: row.username, fname: row.firstname, 
              lname: row.lastname, email: row.email, phone: row.phone, school: row.institution});
          }
    });
  });
  } else {
    res.redirect('/');
  }
});

//handles logout
app.get('/logout', function(req, res) {
  console.log('logout');
  req.session.reset();
  res.redirect('/');
});

//handles get signup
app.get('/signup', function(req, res) {
  res.render('signup',{message:''});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/error', function(req, res){
    res.render('error');
});

var doNothing = function doNothing_(value)
{
  console.log(value);
}

//handles signup post, slow but uses db interface
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
  //creates a hashed password
  bcrypt.hash(password, 10, function(err, hash) {
    console.log('hash' , hash)
    password = hash;
    db.checkUser(username, password, age, fname, lname, sex, email, phone, school, res, req);
  });
});

app.get('/wishlist', function(req, res) {
  if(req.session.user) {
    res.render('wishlist');
  } else {
    res.redirect('/');
  }
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
