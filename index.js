
mysql = require('mysql');
Doskara = require('doskara');

var store = [
  'booya',
  'gee',
  'one'
];

Doskara.on('getAll', function() {
  return store;
});

Doskara.on('save', function(data) {
  return Doskara.triggerEvent('beforeSave', data).then(function(data) {
    store.push(data);
    console.log(store);
  });
});

Doskara.listen(Doskara.ports.dataStore);

