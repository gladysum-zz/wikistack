const express = require("express");
const models = require('../models');
const router = express.Router();
var Promise = require('bluebird');

var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
  User.findAll()
    .then(function(users){
      console.log(users);
      res.render("users", {users});
    });
});

router.get('/:userId', function(req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise, 
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('singleUser', { user: user, pages: pages });
  })
  .catch(next);

});