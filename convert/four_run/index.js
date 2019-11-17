/**
 * @description 四则运算
 * @param {String} expression 公式
 */
function four_run(expression) {
	var express = expression.replace(/ /g, '');
	var arr = express.replace(/\^\-/g, '^@').replace(/\^\+/g, '^#').split(/[\+\-]/);
	if (arr.length > 0) {
		arr.map(function(x) {
			if (x.indexOf('*') !== -1 || x.indexOf('/') !== -1) {
				if (x.indexOf('^') !== -1) {
					x = x.replace(/\^@/g, '^-').replace(/\^#/g, '^+');
				}
				var ret = to_multiply_divide(x);
				express = express.replace(x, ret);
			}
		});
	}
	express = to_plus_subtract(express);
	return express;
}