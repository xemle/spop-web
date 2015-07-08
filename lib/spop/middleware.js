var client = require('./client');

module.exports = function(options) {
  function uimage(paths, res) {
    client(options).command('uimage ' + paths[1], true).then(function(data) {
      if (data.status === 'ok') {
        res.set('Content-Type', 'image/jpeg');

        res.end(new Buffer(data.data, 'base64'));
      } else {
        res.status(500).json({status: 'error', message: 'Invalid response status: ' + data.status});
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

  function command(cmd, res) {
    client(options).command(cmd, true).then(function(data) {
      res.json(data);
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
