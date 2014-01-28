var fs = require('fs'),
  objs = [];

// help Win32 get SIGINT correctly
if (process.platform === "win32"){
  var readLine = require ("readline");
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ("SIGINT", function (){
    process.exit(1);
  });
}

function anti(fn, o, t){

  if(typeof fn === 'string'){
    fn = './' + fn + '.json';
    if(fs.existsSync(fn))
   	  o = require(fn);
    o = o || {};
  } else {
  	var isArr = Array.isArray(fn);
  	var path = isArr ? fn[0] : fn.dir;
  	var o = isArr ? [] : {};
  	fs.readdirSync(path).map(function(fn){
      var a = anti(path + '/' + fn.replace('.json', ''), require('./' + path + '/' + fn), t);
      isArr ? o.push(a) : o[fn.replace('.json', '')] = a;
  	})
  }

  var save = function(fn, o){
  	if(typeof fn !== 'string') return;
    fs.writeFileSync(fn, JSON.stringify(o, null, 4));
  }

  var saveAll = function(){
  	objs.map(function(f){ save(f[0], f[1]) });
  }

  if(!objs.length){
    process.on('exit', saveAll);
    process.on('SIGINT', saveAll);
  }

  objs.push([fn, o]);

  if(t) setInterval(save, t);
  return(o);
}

module.exports = anti;
