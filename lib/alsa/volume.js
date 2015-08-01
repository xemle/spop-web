var router = require('express').Router();
var spawn = require('child_process').spawn;

/**
 * Spop middelware
 *
 * @param {Object} options Spop options. See client options
 */
module.exports = function(options) {

  /**
   * Extract volume information from amixer output.
   *
   * Volume information have the format of
   *
   *     Mono: Playback 5 [12%] [-55.50dB] [on]
   *
   * for mono or
   *
   *     Front Left: Playback 253 [99%] [-0.40dB]
   *     Front Right: Playback 253 [99%] [-0.40dB]
   *
   * for stereo
   *
   * @param {String} data
   * @returns {Object}
   */
  function extractVolume(data) {
    var values = data
      .split(/\n/) // split lines
      .filter(function(line) { // get lines with left bracket
        return line.indexOf('[') > 0;
      })
      .map(function(line) { // get percent number
        return +line.match(/\[(\d+)%/)[1];
      });

    // Add value on mono output
    if (values.length === 1) {
      values.push(values[0]);
    }
    return {
      left: values[0],
      right: values[1]
    };
  }

  function setVolume(req, res) {
    var value = +req.params.value,
        out = '',
        err = '',
        cmd;

    value = Math.max(0, Math.min(100, value));
    cmd = spawn('amixer', ['sset', options.mixer, value + '%']);
    cmd.stdout.on('data', function(data) {
      out += data.toString();
    });
    cmd.stderr.on('data', function(data) {
      err += data.toString();
    });
    cmd.on('close', function(code) {
      if (err || code) {
        res.status(500).json({status: 500, code: code, msg: err}).end();
      } else {
        res.json(extractVolume(out)).end();
      }
    });
  }

  function getVolume(req, res) {
    var out = '',
        err = '',
        cmd;

    cmd = spawn('amixer', ['sget', options.mixer]);
    cmd.stdout.on('data', function(data) {
      out += data.toString();
    });
    cmd.stderr.on('data', function(data) {
      err += data.toString();
    });
    cmd.on('close', function(code) {
      if (err || code) {
        res.status(500).json({status: 500, code: code, msg: err}).end();
      } else {
        res.json(extractVolume(out)).end();
      }
    });
  }

  router.get('/:value', setVolume);
  router.get('/', getVolume);

  /**
   * Return volume middleware
   */
  return router;
};
