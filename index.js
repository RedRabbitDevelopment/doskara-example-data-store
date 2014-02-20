
mysql = require('mysql');
Doskara = require('doskara');

var data = [
  'booya',
  'gee',
  'one'
];

Doskara.on('getAll', function() {
  return data;
});

Doskara.on('save', function(data) {
  data.push(data);
});

