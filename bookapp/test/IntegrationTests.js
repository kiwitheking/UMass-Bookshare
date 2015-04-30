//this integreation test will simulate one use case
//use case:user connect->login->make a listing->
//search the book he just listed to make sure the book has been listed-> log out. 
//make sure run the server before test it.

var assert = require ("chai").assert;
var http = require("http");
var expect = require('expect');
var should = require('should');
var assert = require("assert");
var expect = require('expect');
var should = require('should');
var db = require('../node_modules/DB_Interface.js');
var user = require('../node_modules/DB_user.js');
var testbook = require('../node_modules/DB_book.js')
var app = require('../app.js');
var err =new Error ('Oops, Something is wrong.');
var imgpath = '/images';
var Sequelize = require('sequelize');

 describe('Integreation Test', function(){
  it ('simulate a use case', function(done,res,req, err){

  db.loginUser('cute',0000,res);
  //user login
  db.addBookbyISBN(9784789014401, 'cute', false,false,false,true);
  //add a book to his listing
  //searchTermA=db.search('japan');
  //search the book he just listed, to make sure it is in there
  app.get('/logout', function(req, res) {
  console.log('logout');
  req.session.reset();
  res.redirect('/');
});
  //log out 
    if (err) return done(err); 
    done();
  });
 });
