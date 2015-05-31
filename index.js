var spopd = require('./lib/spopdClient');

var spopdOptions = {
  port: 6602
};

spopd('help', spopdOptions).then(function (data) {
  console.log(data.toString());
});
