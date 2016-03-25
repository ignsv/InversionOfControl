// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');



//stream for writing to file
var stream=fs.createWriteStream('logfile.txt', {flags:'a'}); 
// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {}, console: clone(console), setTimeout:setTimeout, setInterval:setInterval, util:util };
context.global = context;
var sandbox = vm.createContext(context);



// Читаем исходный код приложения из файла
var fileName = './'+process.argv[2];

//context.console.logEx = context.console.log;
context.console.log = function(msg) {
  var date=new Date().toLocaleTimeString();
console.log('['+date+'] '+fileName+' » '+msg);
//write to file
stream.write('['+date+'] '+fileName+' » '+msg+'\n');
};
//write this function for dodge stackoverflow
function clone(obj) {
     var res = {};
     for (var key in obj) res[key] = obj[key];
     return res;
 }
 //task 6. logging calls
sandbox.require = function(moduleName){
  var date = new Date().toLocaleTimeString();
  stream.write('[' + date + ']' + moduleName + ' is required' + '\n');
  return require(moduleName);
};


fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  if (err){
  	console.log("command line input issue");
  } else{


  		// Запускаем код приложения в песочнице
  		var script = vm.createScript(src, fileName);
  		script.runInNewContext(sandbox);
  		var module =sandbox.module.exports;
      module.firstFunction();

  		// Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  		// сохранить в кеш, вывести на экран исходный код приложения и т.д.
      //Task 7. Export hash from app
      console.log('Task 7: list of exports');
      for (var key in sandbox.module.exports) {
        console.log(key + " " + typeof sandbox.module.exports[key]);
      }
	}
});
