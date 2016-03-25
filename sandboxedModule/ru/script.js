var Module= require('fs');


console.log('Hello command line from new script');

//task7
module.exports = {
    firstFunction: function () {
        console.log('From application exported function');
    },
    secondFunction: function (string) {
        console.log(string);
    },
    variable: "Some String script.js"
  };