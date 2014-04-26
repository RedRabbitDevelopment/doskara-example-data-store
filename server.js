
var doskara, Server;
doskara = require('doskara');
_ = require('lodash');

var server = new doskara.Server((function() {
  var store, cbs, id;
    
  store = [
    'booya',
    'gee',
    'one'
  ];
  cbs = {};
  id = 0;

  return {
    getAll: function() {
      return store;
    },
    setBeforeSave: function(callback) {
      id++;
      cbs[id] = callback;
      return cbs;
    },
    clearBeforeSave: function(id) {
      delete cbs[id];
    },
    save: function(data) {
      return _.map(cbs, function(cb) {
        return cb(data);
      }).then(function(results) {
        if(-1 !== results.indexOf(results)) {
          store.push(newData);
          return true;
        };
      });
    }
  };
})());

server.listen(doskara.ports.main).then(function() {
  console.log('listening');
});
