
var doskara, Server, Q;
Q = require('q');
doskara = require('doskara');
_ = require('lodash');
doskara.init(require('./Doskara.json'));

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
      console.log('getting all', store);
      return store;
    },
    setBeforeSave: function(callback) {
      console.log('set before save');
      id++;
      console.log('before save', callback.toString());
      cbs[id] = callback;
      return cbs;
    },
    clearBeforeSave: function(id) {
      console.log('clear before save');
      delete cbs[id];
    },
    save: function(data) {
      console.log('saving', data, cbs);
      return Q.all(_.map(cbs, function(cb) {
        return cb(data);
      })).then(function(results) {
        console.log('got through');
        if(-1 !== results.indexOf(false) || true) {
          store.push(data);
          console.log('oh man', store);
          return true;
        };
      });
    }
  };
})());

server.listen(doskara.ports.main).then(function() {
  console.log('listening');
});
