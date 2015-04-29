var assert = require ("chai").assert;
var http = require("http");
var expect = require('expect');
var should = require('should');

//***********************************************************************************
//This test will only pass when server is running !!!!!
//**********************************************************************************
// describe('...', function(){
//   this.timeout(5000);
//   it('...', function(done){
//     this.timeout(5000);
//     setTimeout(done, 5000);
//   });
// });

it("Server is connected", function(done){
	http.get("http://localhost:3000",function(res){
		assert.equal(res.statusCode, 200);
		done();
	});
});

it("Home page connected", function(done){
	http.get("http://localhost:3000/home",function(res){
		console.log(res.statusCode)
		assert.equal(res.statusCode, 302);
		done();
	});
});


it("signup page connected", function(done){
	http.get("http://localhost:3000/signup",function(res){
		console.log(res.statusCode)
		assert.equal(res.statusCode, 200);
		done();
	});
});

it("profile page connected", function(done){
	http.get("http://localhost:3000/profile",function(res){
		console.log(res.statusCode)
		assert.equal(res.statusCode, 302);
		done();
	});
});

it("wishlist page connected", function(done){
	http.get("http://localhost:3000/wishlist",function(res){
		console.log(res.statusCode)
		assert.equal(res.statusCode, 302);
		done();
	});
});

it("Trying to connect a non exist website", function(done){
	http.get("http://localhost:3000/adsjfhnasdlkjfhasdlkfj",function(res){
		console.log(res.statusCode)
		assert.equal(res.statusCode, 404);
		done();
	});
	done();
});