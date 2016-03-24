// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');


// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {}, console: clone(console), setTimeout:setTimeout, setInterval:setInterval, util:util };
context.global = context;
var sandbox = vm.createContext(context);



// Читаем исходный код приложения из файла
var fileName = './'+process.argv[2];

context.console.log = function(msg) { 
var date = new Date().toLocaleTimeString(); 
console.log('['+date+'] '+fileName+' » '+msg);
};
function clone(obj) {
     var res = {};
     for (var key in obj) res[key] = obj[key];
     return res;
 }
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  if (err){
  	console.log("command line input issue");
  } else{


  		// Запускаем код приложения в песочнице
  		var script = vm.createScript(src, fileName);
  		script.runInNewContext(sandbox);
  		sandbox.module.exports(); 
  		// Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  		// сохранить в кеш, вывести на экран исходный код приложения и т.д.
	}
});
