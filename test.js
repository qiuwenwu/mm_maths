var Maths = require('./index');

var maths = new Maths(__dirname);

maths.update(__dirname, "base")
console.log(maths);

// // 第一步，载入公式
// compute.load_expression();

// // 第二步，载入函数式
// compute.load_function();

// // 第三步，设置常量
// var consts = {
// 	a: 10,
// 	b: 3
// };
// compute.set_constant(consts);

// // 第四步，转换公式
// var expression = "y = abc * ab3c * 2 * [(ba - 2) / 2]";
// var express = compute.convert(expression);
// console.log('打印公式: ', express);

// // 第五步，转换成JS代码
// var code = compute.toJS(express);
// console.log('打印代码: ', code);

// // 第六步，转换成函数
// var func = compute.toFunc(code);
// console.log('打印函数: ', func);

// // 第七步，执行函数
// if (func) {
// 	var result = func(variables);
// 	console.log('打印计算结果: ', result);
// }
