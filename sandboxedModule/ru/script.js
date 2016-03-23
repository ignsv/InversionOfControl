console.log('Hello command line from new script');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};