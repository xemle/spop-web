var express = require('express')
var spopdMiddleware = require('./lib/spopd/middleware');
var app = express();

var spopdOptions = {
  port: 6602
};

app.use(express.static('public'));

app.use('/spopd', spopdMiddleware(spopdOptions));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
