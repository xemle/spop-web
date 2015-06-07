var spop = require('./client');

module.exports = function(spopOptions) {
  function uimage(paths, res) {
    spop('uimage ' + paths[1], spopOptions).then(function(data) {
      var json;
      try {
        var json = JSON.parse(data.toString());

        if (json.status === 'ok') {
          res.set('Content-Type', 'image/jpeg');

          res.end(new Buffer(json.data, 'base64'));
        } else {
          res.status(500).json({status: 'error', message: 'Invalid response status: ' + status.status});
        }
      } catch (err) {
        res.status(500).json(err);
      }

    }, function(err) {
      res.status(500).json(err);
    });
  }

  function command(cmd, res) {
    spop(cmd, spopOptions).then(function(data) {
      res.set('Content-Type', 'application/json');
      res.end(data);
    }, function(err) {
      res.status(500).json(err);
    });
  }

  /**
   * Return middleware function
   */
  return function (req, res, next) {
    var cmd = unescape(req.path.substr(1));
    var paths = cmd.split('/');

    if (paths.length > 1 && paths[0] === 'uimage') {
      uimage(paths, res);
    } else {
      command(cmd, res);
    }
  };
};
