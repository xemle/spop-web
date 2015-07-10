var client = require('./client'),
    router = require('express').Router(),
    ms = require('ms');

/**
 * Spop middelware
 *
 * @param {Object} options Spop options. See client options
 */
module.exports = function(options) {

  /**
   * Add cache control to spop commands
   *
   * @param {Object} req HTTP Request
   * @param {Object} res HTTP Response
   * @param {Object} next Next middleware function
   */
  function cache(req, res, next) {
    var paths = req.path.substr(1).split('/'),
        command = paths[0];

    if (command === 'uimage') {
      res.set('Cache-Control', 'max-age=' + ms('30 days'));
    } else if (command === 'search') {
      res.set('Cache-Control', 'max-age=' + ms('1m'));
    } else {
      res.set('Cache-Control', 'max-age=' + ms('1 days'));
    }
    next();
  }

  /**
   * Serves cover as binary JPEG file
   *
   * @param {Object} req HTTP Request
   * @param {Object} res HTTP Response
   */
  function uimage(req, res) {
    var uri = req.params.uri,
        size = req.params.size ? ' ' + req.params.size : '',
        command = 'uimage ' + uri + size;
    client(options).command(command, true).then(function(data) {
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

  /**
   * Generic command which serves JSON data
   *
   * @param {Object} req HTTP Request
   * @param {Object} res HTTP Response
   */
  function command(req, res) {
    var command = unescape(req.path.substr(1));
    client(options).command(command, true).then(function(data) {
      res.json(data);
    }, function(err) {
      res.status(500).json(err);
    });
  }

  router.use(cache);

  router.get('/uimage/:uri/:size', uimage);
  router.get('/uimage/:uri', uimage);
  router.get('*', command);

  /**
   * Return middleware router for spop
   */
  return router;
};
