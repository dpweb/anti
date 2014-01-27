anti
====

A db memory cache without the db!  Takes any object and auto-saves it to file (Node) or localStorage (browser) upon program (or browser) exit, and optionally at a specified interval.

Node
````
$ npm install dpweb/anti

var anti = require('anti'),
  o = anti('mydb');  // creates new or gets from disk
o.a = 1;
o.b = 2;
// now check mydb.json on disk

// default value
var anti = require('anti'),
  o = anti('mydb2', {key: 'value'});
// now check mydb2.json on disk

// array
var anti = require('anti'),
  o = anti('mydb3', []);
// now check mydb3.json on disk
````

You can also treat a whole folder like it was a database, with each file being a table
````
// multi-objects saved independently 
// myfolder is a directory containing some json files: a.json, b.json, c.json

var anti = require('anti'),
  a = anti({dir: 'myfolder'}, []);

a[0].say = 'Im A';
// saved to ./myfolder/a.json
a[1].say = 'Im B';
// saved to ./myfolder/b.json
a[2].say = 'Im C';
// saved to ./myfolder/c.json
````

or use as an object/hash
````
// multi-objects saved independently 
// myfolder is a directory containing some json files: a.json, b.json, c.json

var anti = require('anti'),
  o = anti({dir: 'myfolder'}, {});

o.a.a = 1;
// saved to ./myfolder/a.json
o.b.b = 2;
// saved to ./myfolder/b.json
o.c.c = 3;
// saved to ./myfolder/c.json
````

Browser
````
var x = {a: 1, b: 2};
anti(x, null, 1000);
console.log(localStorage['./db.json']);
````
