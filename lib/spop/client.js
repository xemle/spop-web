var net = require('net'),
    Q = require('q');

module.exports = function(command, spopOptions) {
  var options = spopOptions || {},
      deferred = Q.defer(),
      commandExecuted = false,
      buf = new Buffer(''),
      end,
      client;

  options.port = options.port || 6602;
  options.host = options.host || 'localhost';

  client = net.connect(options);

  client.on('data', function(data) {
    if (!commandExecuted) {
      commandExecuted = true;
      client.write(command + '\r\n');
    } else {
      end = data.slice(data.length - 1, data.length);
      buf = Buffer.concat([buf, data]);
      if (end.toString().match(/\n/)) {
        deferred.resolve(buf.slice(0, buf.length - 1));
        client.end();
      }
    }
  });

  client.on('error', function(err) {
    client.end();
    deferred.reject(err);
  });

  return deferred.promise;
};
