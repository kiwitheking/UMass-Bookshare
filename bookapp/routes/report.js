var express = require('express');
var router = express.Router();

/* GET report. */
router.get('/', function(req, res) {
  res.sendfile('./public/bug-report.html');
});


// router.submit('/', function(req, res){


//  var multiparty = require("multiparty");
//  var form = new multiparty.Form();

//  form.parse(req, function(err,fields, files){

//    //var img =files.images[0];
//    var fs =require("fs");

//    fs.readFile(img.path, function (err, data){

//    var path = "./public/reportedbugs/"+files.fileNameToSaveAs;
//    fs.writeFile(path,data,function(error){

//     if(error)console.log(error);
//     res.send("upload success!");

//   });
//  });
// });
// });

module.exports = router;
