var net = require('net'),
    Q = require('q');



module.exports = function(command, spopdOptions) {
  var options = spopdOptions || {},
      deferred = Q.defer(),
      commandExecuted = false,
      client;

  options.port = options.port || 6602;
  options.host = options.host || 'localhost';

  client = net.connect(options);

  client.on('data', function(data) {
    if (!commandExecuted) {
      commandExecuted = true;
      client.write(command + '\r\n');

    } else {
      deferred.resolve(data);
      client.end();
    }
  });

  client.on('error', function(err) {
    client.end();
    deferred.reject(err);
  });

  return deferred.promise;
};