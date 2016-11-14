"use strict";

const express = require("express");
const morgan = require("morgan");
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
// const fs = require('fs');
// const mime = require('mime');
// const socketio = require('socket.io');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const models = require('./models');

const app = express();

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// start the server
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', function(req, res, next){
  res.send('this is the homepage!');
})


// // modular routing that uses io inside it
// app.get('/', function(req, res, next){
// 	res.render("index");
// });

// var server = app.listen(1337, function(){
//   console.log('listening on port 1337');
// });
// var io = socketio.listen(server);
