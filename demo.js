var volumes = require('./lib/index');

volumes.set(90).then(function(response) {
  console.log(response);
});
