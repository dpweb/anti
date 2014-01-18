function anti(o, fn, t){
	if(o && o.dir){
		var arr = [];
		require('fs').readdirSync(o.dir).map(function(fn){
			var path = './' + o.dir + fn;
			var data = require(path);
			arr.push(anti(data, path, t));
		})
	}

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

typeof module==='undefined' || module.exports = anti;
