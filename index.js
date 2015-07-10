var express = require('express')
var spopMiddleware = require('./lib/spop/middleware');
var app = express();

var spopOptions = {
  port: 6602
};

var isDevelopment = process.env.NODE_ENV && process.env.NODE_ENV.match(/^dev/i);

if (!isDevelopment) {
  app.use(express.static('dist'));
} else {
  app.use(express.static('public'));
}

app.use('/spop', spopMiddleware(spopOptions));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
