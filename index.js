// Connect module
const cookieSession = require('cookie-session');

const cookieSettings = {
  secret: 'testing',
  domain: '.session.dev'
};

// Set up express server
const express = require('express');
const expressApp = express();

// Configure express session
expressApp.use(cookieSession(cookieSettings));

// Express index route
expressApp.get('/', function (req, res) {
  // Get session
  const session = req.session;
  // Increase counter
  var n = session.views || 0;
  session.views = ++n;

  res.send('express.' + n);
});

// Start express server
expressApp.listen(7000, function() {
  console.log('Express server started on *:7000');
});

// Set up koa server
const koa = require('koa');
const koaConnect = require('koa-connect');
const koaApp = koa();

koaApp.use(koaConnect(cookieSession(cookieSettings)));

// Koa index route
koaApp.use(function *(next) {
  if (this.path === '/favicon.ico') return;

  // Get session
  const session = this.req.session;

  // Increase counter
  var n = session.views || 0;
  session.views = ++n;

  this.body = 'koa.' + n;
  yield next;
});

// Start koa server
koaApp.listen(7001, function() {
  console.log('Koa server started on *:7001');
});
