var fs = require('fs'),
  objs = [],
  once = 1,
  basepath = require('path').dirname(require.main.filename);

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

    fn = basepath + '/' + fn + '.json';
    if(fs.existsSync(fn))
   	  o = require(fn);
    o = o || {};
    objs.push([fn, o]);

  } else {

  	var isArr = Array.isArray(fn);
  	var path = basepath + '/' + (isArr ? fn[0] : fn.dir);
    var spath = (isArr ? fn[0] : fn.dir);
  	var o = isArr ? [] : {};

  	fs.readdirSync(path).map(function(fn){
      if(!fn.match(/\.json$/)) return;
      var name = fn.replace('.json', '');
      var a = anti(spath + '/' + name, require(path + '/' + fn), t);
      isArr ? o.push(a) : o[name] = a;
  	})
    
  }

  var save = function(fn, o){
    fs.writeFileSync(fn, JSON.stringify(o, null, 4));
  }

  var saveAll = function(){
    objs.map(function(f){ save(f[0], f[1]) });
  }

  if(once){
    process.on('exit', saveAll);
    process.on('SIGINT', saveAll);
    once = 0;
  }

  if(t) setInterval(save, t);
  return o;

}

module.exports = anti;
