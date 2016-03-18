// Set up express server
const express = require('express');
const expressApp = express();

// Express index route
expressApp.get('/', function (req, res) {
  res.send('express.');
});

// Start express server
expressApp.listen(7000, function() {
  console.log('Express server started on *:7000');
});

// Set up koa server
const koa = require('koa');
const koaApp = koa();

// Koa index route
koaApp.use(function *(next) {
  this.body = 'koa.';
  yield next;
});

// Start koa server
koaApp.listen(7001, function() {
  console.log('Koa server started on *:7001');  
});
