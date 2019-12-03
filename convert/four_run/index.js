const multiply_divide = require('../multiply_divide');
const plus_subtract = require('../plus_subtract');

/**
 * @description 四则运算
 * @param {String} expression 公式
 */
module.exports = function four_run(expression) {
	var express = expression.replace(/ /g, '');
	var arr = express.replace(/\^\-/g, '^@').replace(/\^\+/g, '^#').split(/[\+\-]/);
	if (arr.length > 0) {
		arr.map(function(x) {
			if (x.indexOf('*') !== -1 || x.indexOf('/') !== -1) {
				if (x.indexOf('^') !== -1) {
					x = x.replace(/\^@/g, '^-').replace(/\^#/g, '^+');
				}
				var ret = multiply_divide(x);
				console.log(ret);
				express = express.replace(x, ret);
			}
		});
	}
	return plus_subtract(express);
}