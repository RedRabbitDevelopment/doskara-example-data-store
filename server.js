
var Q, _;
Q = require('q');
_ = require('lodash');
var config = require('./Doskara.json');

var io = require('socket.io')()

io.listen(config.ports.main);

io.sockets.on('connection', function(socket) {
  var store = [
    'booya',
    'gee',
    'one'
  ];
  socket.on('getAll', function(ignore, fn) {
    console.log('getting all', store);
    fn(store);
  });
  socket.on('save', function(data, fn) {
    console.log('saving');
    store.push(data);
    fn();
  });
});
