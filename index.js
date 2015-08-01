var express = require('express');
var compression = require('compression');
var spopMiddleware = require('./lib/spop/middleware');
var app = express();

// Defaults
var PORT = 3000;
var SPOP_HOST = 'localhost';
var SPOP_PORT = 6602;

var opt = require('node-getopt').create([
  ['d', 'debug',         'Turn debug mode on'],
  ['p', 'port=ARG',      'Port of spop-web server. Default is ' + PORT],
  ['',  'spop-host=ARG', 'Host of spop server. Default is ' + SPOP_HOST],
  ['',  'spop-port=ARG', 'port of spop server. Default is ' + SPOP_PORT],
  ['',  'mixer=ARG',     'Name of volume mixer (alsa only)'],
  ['h', 'help',          'Display this help']
])
.bindHelp()
.parseSystem();

var devMode = opt.options.debug || process.env.NODE_ENV && process.env.NODE_ENV.match(/^dev/i);
var spopOptions = {
  host: opt.options['spop-host'] || SPOP_HOST,
  port: +opt.options['spop-port'] || SPOP_PORT
};

if (!devMode) {
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

if (opt.options.mixer) {
  var volumeOptions = {
    mixer: opt.options.mixer
  };
  app.use('/volume', require('./lib/alsa/volume')(volumeOptions));
}

var server = app.listen(+opt.options['port'] || PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  var mode = devMode ? ' (dev mode)' : '';
  console.log('App listening at http://%s:%s%s', host, port, mode);
});
