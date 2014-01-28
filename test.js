var anti = require('./anti.js'),
  o = anti('test/mydb');
o.a = 3;
o.time = new Date();
// now check mydb.json on disk

var anti = require('./anti.js'),
  o = anti('test/mydb2');
o.time = new Date();
// now check mydb2.json on disk

// array
var anti = require('./anti.js'),
  o = anti('test/mydb3', []);
// now check mydb3.json on disk

// multi-objects saved independently 
// myfolder is a directory containing some json files: a.json, b.json, c.json
var anti = require('./anti.js'),
  a = anti(['test2']);

a[0].say = new Date();
// saved to ./myfolder/a.json
a[1].say = 'Im Bs';
// saved to ./myfolder/b.json
a[2].say = 'Im Cs';
// saved to ./myfolder/c.json


// multi-objects saved independently 
// myfolder is a directory containing some json files: a.json, b.json, c.json

var anti = require('./anti.js'),
  o = anti({dir: 'test3'});

o.d.ttt = 10;
// saved to ./myfolder/d.json
o.e.ttt = 11;
// saved to ./myfolder/e.json
o.f.ttt = 12;
// saved to ./myfolder/f.json


//var anti = require('./anti.js'),
//  o = anti('test/mydb-timed', {}, 2000);  // save every 2 sec.

//setInterval(function(){ o.time = new Date() }, 1000);