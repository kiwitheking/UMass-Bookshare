var express = require('express');
var router = express.Router();

/* GET image. */
router.get('/', function(req, res) {
  res.send('Image route');
});


router.get('/upload', function(req, res) {
  res.sendfile('./public/image-upload.html');
});



router.post('/upload', function(req, res){


 var multiparty = require("multiparty");
 var form = new multiparty.Form();

 form.parse(req, function(err,fields, files){

 //res.send("Name:"+fields.name);
 //console.log(files.images[0].originalFilename);
   var img =files.images[0];
   var fs =require("fs");

   fs.readFile(img.path, function (err, data){

   var path = "./public/images/"+img.originalFilename;
  //res.send(path)

   fs.writeFile(path,data,function(error){

   	if(error)console.log(error);
   	res.send("upload success!");

  });
 });
});
});
module.exports = router;
