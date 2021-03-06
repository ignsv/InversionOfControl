// Вывод из глобального контекста модуля
console.log('From application global context');


var fileName = './README.md';


console.log('Application going to read ' + fileName);
fs.readFile(fileName, function(err, src) {
    console.log('File ' + fileName + ' size ' + src.length);
});
// Объявляем функцию для события таймера
//function timerEvent() {
//  console.log('From application timer event');
//}

// Устанавливаем функцию на таймер
//setTimeout(timerEvent, 1000);
fs.access(fileName, function (err) {
    console.log('File ' + fileName + (err ? ' no access!' : ' can read/write'));
})