var volumes = require('./lib/index');

volumes.set(0).then(function(response) {
  console.log(response);
});

volumes.increase(5).then(function(response) {
  console.log(response);
});

volumes.increase(5).then(function(response) {
  console.log(response);
});
volumes.increase(50).then(function(response) {
  console.log(response);
});

volumes.decrease(60).then(function(response) {
  console.log(response);
});
