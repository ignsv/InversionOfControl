// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');
setTimeout( function() {console.log("Hello, guys. Usage setTimeout");}, 1000);
//setInterval( function() {console.log("Task1. Usage setInterval");}, 1000);
console.log(util.isString(''));
console.log(util.isNull(null));
//
module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};
