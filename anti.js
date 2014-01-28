function anti(o, fn, t){
  if(o && o.dir){
	var arr = [];
	require('fs').readdirSync(o.dir).map(function(fn){
  	  var path = './' + o.dir + '/' + fn;
	  var data = require(path);
	  arr.push(anti(data, path, t));
	})
	o = arr;
  }

  var save = function(){
	  var f = isnode ? require('fs').writeFileSync : localStorage.setItem.bind(localStorage);
	  f(fn||'./db.json', JSON.stringify(o));
  }

	process.on('exit', save);
	process.on('SIGINT', save);

  if(t) setInterval(save, t);
  return(o);
}

if(typeof module!=='undefined')
  module.exports = anti;
