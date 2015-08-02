var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var app = express();

jsx.install();


var DeveloperController = require('./views/index.jsx');

app.use('/style.css', express.static('./style.css'));

app.use('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

app.use('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.script({
        src: '/bundle.js'
      }),
      React.DOM.link({
        rel: 'stylesheet',
        type: 'text/css',
        href: './style.css'
      }),
      React.DOM.link({
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
      })
    )
  ));
});

var server = app.listen(3333, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});
