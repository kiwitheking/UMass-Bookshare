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
//var sequelize = new Sequelize('test', 'root', null, {host: 'localhost', port: 3000, logger: function(done) {console.log(text);}});

describe('Sample test', function(){
 describe('making sure test is working', function(){
 it('should return -1 when the value is not present', function(){
 assert.equal(-1, [1,2,3].indexOf(5));
 assert.equal(-1, [1,2,3].indexOf(0));
  });
 });
});



describe( 'addUserBasic', function(){
  it('add a new user', function(done, err){
      user.addUserBasic('testuser',0000,null,'qiwen','wang',null,5555555555,'umass'); 
      if (err) throw err; 
      done();

    });
});


describe('getUser', function(){
    it('respond with matching records', function(){
      db.getUser('testuser', function(err, res){
      assert.equal('wang', user.getUser('testuser').firstname);
      });
    });
  });

 describe('verifyUser', function(){
  it ('just verifyUser users', function(done){
    db.verifyUser('testuser',0000,function(err,res){
  app.post('/signup',function(req,res){
  username = req.body.username;
  password = req.body.password;
  fname = req.body.firstName;
  lname = req.body.lastName;
  email = req.body.email;
  phone = req.body.phone.replace(/\D/g,'');
  school = req.body.institution;
 

  bcrypt.hash(password, 10, function(err, hash) {
    console.log('hash' , hash)
    password = hash;
    db.checkUser(username, password, fname, lname, email, phone, school, res, req);
  });
});
      if (err) return done(err);
      done();
    });
  });
 });

 describe('addBookbyISBN', function(){
  it('addBookbyISBN',function(done,err){
      db.addBookbyISBN(9784789014401, 'testuser', false,false,false,true);
      if (err) return done(err); 
      done();

    });
  });
//****************************************************************************************
 describe('searchBook', function(){
  it ('search a book', function(done,err){
      db.addBookbyISBN(9781408865279,'testuser',false,false,false,false);
      searchTermA=db.search('harry');
      searchTermB=db.search('potter');
      assert.equal(searchTermA,searchTermB);
      if (err) return done(err); 
      done();
  });
 });
// test can pass but showing a unhandle error, have no idea why it says that, someone fix it plz.
//***************************************************************************************
 describe('addBookWish', function(){
  it ('add a book to wishlist by providing ISBN', function(done,err){
      testbook.addBookWish('testuser',9784789014401);
      if (err) return done(err); 
      done();
  });
 });

  describe('addBookCover', function(){
  it ('add a Book cover by ISBN, returna link for image from google, it does not store local', function(done, err){
      testbook.addBookCover(9784789014401, imgpath);
      if (err) return done(err); 
      done();
  });
 });

   describe('viewListing', function(){
  it ('post your book listing', function(done,res,err){
      db.postBookListing(9784789014401, res);
      if (err) return done(err); 
      done();
  });
 });

  describe('Listing', function(){
  it ('find a user listing ', function(done){
  app.post('/listing', function(req, res) {
  id = req.body.listingid;
  console.log(id);
  db.getListing(id, res);
  if (err) return done(err); 
});
      done();
  });
 });

   describe('deletelisting', function(){
  it ('delete a listing you made', function(done,res,err){
  app.post('/deletelisting', function(req,res){
  listid = req.body.listid;
  console.log(listid);
  db.deleteListing(listid, res,req);
  if (err) return done(err); 
});
  done();
  });
 });

// function add() {
//   return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
//     return prev + curr;
//   }, 0);
// }

// describe('add()', function() {
//   var tests = [
//     {args: [1, 2],       expected: 3},
//     {args: [1, 2, 3],    expected: 6},
//     {args: [1, 2, 3, 4], expected: 10}
//   ];

//   tests.forEach(function(test) {
//     it('correctly adds ' + test.args.length + ' args', function() {
//       var res = add.apply(null, test.args);
//       assert.equal(res, test.expected);
//     });
//   });
// });

// // it("Should fetch test.html", function(done) {
// //     console.log("test1");
// //     var body = "";
// //     http.get({host: "localhost", port:8100, path: "/"}, function(res) {
// //         res.on('data', function(chunk) {
// //             // Note: it might be chunked, so need to read the whole thing.
// //             body += chunk;
// //         });
// //         res.on('end', function() {
// //             assert.ok(body.toString().indexOf("<a href='/dummy.txt'>") !== -1);
// //             assert.equal(res.statusCode, 200);
// //             done();
// //         });
// //     })
// // });

// // it("Should fetch dummy.txt", function(done) {
// //     http.get({host: "localhost", port:8100, path: "/dummy.txt"}, function(res) {
// //         res.on('data', function(body) {
// //             assert.equal(res.statusCode, 200);
// //             assert.ok(body.toString().indexOf("test") === 0);
// //             done();
// //         });
// //     });
// // });

// // it("Should get 404", function(done) {
// //     http.get({host: "localhost", port:3000, path: "/qwerty"}, function(res) {
// //         assert.equal(res.statusCode, 404);
// //         done();
// //     });
// // });
