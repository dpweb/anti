anti
====

Sequel to anti-db, auto-persist an object for Node or browser.  Takes any object and auto-saves it to file (Node) or localStorage (browser) upon program (or browser) exit, and optionally at a specified interval.

####anti(obj, [name], [interval]);

####Node
````
var anti = require('./anti.js');
var x = {a: 1, b: 2};
anti(x);

// check out db.json file

// load
var x = require('./db.json');

````

####Browser
````
var x = {a: 1, b: 2};
anti(x, null, 1000);

console.log(localStorage['./db.json']);
````

####Source
````
function anti(o, fn, t){
	var isnode = typeof window==='undefined';
	var save = function(){
		var f = isnode ? require('fs').writeFileSync : localStorage.setItem.bind(localStorage);
		f(fn||'./db.json', JSON.stringify(o));
	}
	if(isnode){
		process.on('exit', save);
		process.on('SIGINT', save);
	} else {
		window.onunload = save;
	}
	if(t) setInterval(save, t);
	return(o);
}
````
