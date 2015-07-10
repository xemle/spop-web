var express = require('express');
var compression = require('compression');
var spopMiddleware = require('./lib/spop/middleware');
var app = express();

var isDevelopment = process.env.NODE_ENV && process.env.NODE_ENV.match(/^dev/i);
var spopOptions = {
  port: 6602
};

app.use(compression());
app.use('/spop', spopMiddleware(spopOptions));

if (!isDevelopment) {
  app.use(express.static('dist', {maxAge: '1d'}));
} else {
  app.use(express.static('public'));
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
