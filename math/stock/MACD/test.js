const MACD = require('./index');
console.log(MACD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 3, 2, 1));
console.log(MACD([2, 4, 6, 8, 16, 2, 4, 6, 8, 16], 3, 2, 1));
console.log(MACD([21, 37, 25, 36, 30.5, 21, 37, 25, 36, 30.5]));
