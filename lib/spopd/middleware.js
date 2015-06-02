var spopd = require('./client');

module.exports = function(spopdOptions) {
  return function (req, res, next) {
    var cmd = unescape(req.path.substr(1));

    spopd(cmd, spopdOptions).then(function(data) {
      res.set('Content-Type', 'application/json');
      res.send(data);
    }, function(err) {
      res.status(500).json(err);
    });
  };
};
