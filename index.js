var spopd = require('./lib/spopd/client');

var spopdOptions = {
  port: 6602
};

spopd('help', spopdOptions).then(function (data) {
  console.log(data.toString());
});
