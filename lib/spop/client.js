var net = require('net'),
    Q = require('q');

/**
 * Command object to hold spop command line, data buffer, and promise
 *
 * @param {String} command
 * @returns {Command}
 */
function Command(command) {
  this.command = command;
  this.data = new Buffer('');
  this.promise = Q.defer();
}
Command.prototype.onData = function(data) {
  this.data = Buffer.concat([this.data, data]);
};
Command.prototype.resolve = function() {
  this.promise.resolve(this.data);
};
Command.prototype.reject = function(err) {
  this.promise.reject(err);
};
Command.prototype.getPromise = function() {
  return this.promise.promise;
};

/**
 * Command Queue to queue multiple spop commands
 *
 * @param {Object} client
 * @returns {CommandQueue}
 */
function CommandQueue(client) {
  this.client = client;
  this.queue = [new Command('')]; // Used for spop info on connect
  this.current = 0;

  client.on('data', this.onData.bind(this));
  client.on('error', this.end.bind(this));
};
CommandQueue.prototype.push = function(command) {
  var cmd = new Command(command);
  this.queue.push(cmd);
  return cmd.getPromise();
};
CommandQueue.prototype.onData = function(data) {
  if (this.current < this.queue.length) {
    this.queue[this.current].onData(data);
    if (this.isEndOfData(data)) {
      this.resolve();
      this.nextCommand();
    }
  }
};
/**
 * Treat a tailing new line char as end of data
 *
 * @param {buffer} data
 * @returns {boolean}
 */
CommandQueue.prototype.isEndOfData = function(data) {
  var end = data.slice(data.length - 1, data.length);
  return end.toString().match(/\n/);
};
CommandQueue.prototype.resolve = function() {
  if (this.current < this.queue.length) {
    this.queue[this.current].resolve();
    this.removeHead();
  }
};
CommandQueue.prototype.reject = function(err) {
  if (this.current < this.queue.length) {
    this.queue[this.current].reject(err);
    this.removeHead();
  }
};
CommandQueue.prototype.rejectAll = function(err) {
  while (this.current < this.queue.length) {
    this.reject();
  }
};
/**
 * Remove all head commands to current position.
 */
CommandQueue.prototype.removeHead = function() {
  this.queue.splice(0, this.current + 1);
  this.current = 0;
};
CommandQueue.prototype.nextCommand = function() {
  if (this.current < this.queue.length) {
    this.client.write(this.queue[this.current].command + '\r\n');
  }
};
CommandQueue.prototype.end = function(err) {
  this.client.end();
  this.rejectAll(err);
};

/**
 * Creates a spop connection an returns a simple interface to send commands
 * to spop server.
 *
 * @param {Object} options Spop server options with host and port. Default host
 * is localhost. Default port is 6602.
 * @returns {Object}
 */
module.exports = function(options) {
  var options = options || {},
      queue,
      client;

  options.port = options.port || 6602;
  options.host = options.host || 'localhost';

  client = net.connect(options);
  queue = new CommandQueue(client);

  return {
    /**
     * Sends a command to spop server and return a promise
     *
     * @param {String} command line
     * @param {boolean} lastCommand If true, the connection is automatically
     * closed after receiving an answer (or error)
     * @returns {Promise} Promise with JSON data
     */
    command: function(command, lastCommand) {
      return queue.push(command).then(function(data) {
        return JSON.parse(data.toString());
      }).finally(function() {
        if (lastCommand) {
          queue.end();
        }
      });
    },
    /**
     * End connections (and reject all pending commands)
     */
    end: queue.end
  };
};
