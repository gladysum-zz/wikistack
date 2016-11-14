const express = require("express");
const models = require('../models');
const router = express.Router();

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.post('/', function(req, res, next){
  console.log(req.body);


  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
    .then(function(){
      res.json(page);
    });

  // res.send('got to POST');
});

router.get('/add', function(req, res, next){
  res.render('addpage');
});

router.get('/users', function(req, res, next){

});
