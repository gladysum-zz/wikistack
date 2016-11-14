const express = require("express");
const models = require('../models');
const router = express.Router();

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){ 
  Page.findAll()
    .then(function(pages){
      console.log(pages);
      res.render("index", {pages});
    });
  });

router.post('/', function(req, res, next){

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next){
  res.render('addpage');
});

router.get("/:urlTitle", function(req, res, next){
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    console.log(foundPage);
    res.render("wikipage", {page: foundPage});
  })
  .catch(next);
});

router.get('/users', function(req, res, next){
  User.findAll()
    .then(function(users){
      console.log(users);
      res.render("users", {users});
    });
});
