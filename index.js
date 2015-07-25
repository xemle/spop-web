var express = require('express');
var compression = require('compression');
var spopMiddleware = require('./lib/spop/middleware');
var app = express();

var isDevelopment = process.env.NODE_ENV && process.env.NODE_ENV.match(/^dev/i);
var spopOptions = {
  port: 6602
};

if (!isDevelopment) {
  app.use(express.static('dist', {maxAge: '1d'}));
} else {
  // Disable caching
  app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache');
    next();
  });
  // Enable live reload. Please use this with gulp serve
  var liveOptions = {
    port: 35729,
    src: 'http://localhost:35729/livereload.js'
  };
  app.use(require('connect-livereload')(liveOptions));
  // Serve plain javascript files
  var staticOptions = {
    etag: false
  };
  app.use(express.static('public', staticOptions));
}

app.use(compression());
app.use('/spop', spopMiddleware(spopOptions));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var mode = isDevelopment ? ' (dev mode)' : '';
  console.log('App listening at http://%s:%s%s', host, port, mode);
});
