var anti = require('./anti.js');
var db = anti({dir:'test'});

db[0].time = new Date();
console.log(db);

// now check the folder
