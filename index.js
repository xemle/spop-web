var express = require('express')
var spopd = require('./lib/spopd/client');
var app = express();

var spopdOptions = {
  port: 6602
};

app.use(express.static('public'));

app.use('/spopd', function (req, res, next) {
  var cmd = unescape(req.path.substr(1));
  spopd(cmd, spopdOptions).then(function(data) {
    res.set('Content-Type', 'application/json');
    res.send(data);
  }, function(err) {
    res.status(500).json(err);
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
