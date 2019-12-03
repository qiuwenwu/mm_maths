const multiply_divide = require('../multiply_divide');
const denominator = require('../../math/base/denominator');

/**
 * 加减
 * @param {String} expression 公式
 */
function plus_subtract(expression) {
	var expres = expression.replace(/\^\-/g, '^~');
	expres = expres.replace(/ /g, '').replace(/\+/g, ' +').replace(/\-/g, ' -');
	expres = expres.replace(/\^~/g, '^-');
	var arr = expres.split(' ');

	var dict = {};
	var exp = "";
	var num = 0;

	var multiply = 0;
	var divide = 1;

	// 统计代数个数
	arr.map(function(x) {
		if (/[a-zA-Z]/.test(x)) {
			var exp = x;
			// if (exp.indexOf("^") !== -1) {
			// 	var mh = exp.match(/[a-zA-Z]\^[0-9]+/);
			// 	if (mh) {
			// 		var key = mh[0];
			// 		var left = key.left("^");
			// 		var ex = "";
			// 		var right = key.right("^");
			// 		var n = Number(right);
			// 		for (var i = 0; i < n; i++) {
			// 			ex += " * left;
			// 		}
			// 		var value = eval(ex.replace(' * ', ''));
			// 		exp = exp.replace(key, value);
			// 	}
			// }
		
		} else {
			var exp = multiply_divide(x) + "";
			
			// 非代数加减
			if (exp.indexOf("^") !== -1) {
				var mh = exp.match(/[0-9]+\^[0-9]+/);
				if (mh) {
					var key = mh[0];
					var left = key.left("^");
					var ex = "";
					var right = key.right("^");
					var n = Number(right);
					for (var i = 0; i < n; i++) {
						ex += " * (" + left + ")";
					}
					var value = eval(ex.replace(' * ', ''));
					exp = exp.replace(key, value);
				}
			}
			if (exp.indexOf("/") !== -1) {
				var left = exp.left("/");
				var right = exp.right("/");
				var d = Number(right);
				multiply = Number(left) * divide + multiply * d;
				divide *= d;
			} else {
				num += Number(exp);
			}
		}
	});

	var result = '';
	// 合并公式
	for (var k in dict) {
		var val = dict[k];
		if (val === 1) {
			result += '+' + k
		} else if (val !== 0) {
			if (val > 0) {
				result += '+' + val + k
			} else {
				if (-val === 1) {
					result += '-' + k
				} else {
					result += val + k
				}
			}
		}
	}
	if (num > 0) {
		result += '+' + num
	} else if (num < 0) {
		result += num
	}
	if (multiply !== 0) {
		var o = denominator(multiply, divide);
		result += " +" + o.multiply + '/' + o.divide;
	}
	if (result.indexOf('+') === 0) {
		result = result.replace('+', '');
	}
	return result;
};

module.exports = plus_subtract;
