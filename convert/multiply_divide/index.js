require('mm_expand');
const denominator = require('../../math/base/denominator');

/**
 * 乘除
 * @param {String} expression 公式
 */
function multiply_divide(expression) {
	expres = expression.replace(/ /g, '').replace(/\*/g, ' *').replace(/\//g, ' /');
	var arr = expres.split(' ');
	var dict = {};
	var exp = "";
	var multiply = 1;
	var divide = 1;
	// 统计代数个数
	arr.map(function(str) {
		var k = str.replace('*', '').replace('/', '');
		k = k.left('^', true);
		if (isNaN(k)) {
			if (str.indexOf('^') !== -1) {
				var n = Number(str.right('^'));
				if (!dict.hasOwnProperty(k)) {
					if (str.indexOf('/') !== -1) {
						dict[k] = -n;
					} else {
						dict[k] = n;
					}
				} else {
					if (str.indexOf('/') !== -1) {
						dict[k] += -n;
					} else {
						dict[k] += n;
					}
				}
			} else {
				if (k.indexOf('_') === -1) {
					// console.log(k);
					var ar = k.split(/[a-zA-Z]+/);
					if (ar) {
						for (var i = 0; i < ar.length; i++) {
							var txt = ar[i];
							if (txt) {
								var m = Number(txt);
								if (str.indexOf('/') != -1) {
									if (multiply % m === 0) {
										multiply = multiply / m;
									} else {
										divide = divide * m;
									}
								} else {
									multiply = multiply * m;
								}
							}
						}
					}
					var ar_k = k.match(/[a-zA-Z]+/g, '');
					if (ar_k) {
						for (var i = 0; i < ar_k.length; i++) {
							var v = ar_k[i];
							if (!dict.hasOwnProperty(v)) {
								dict[v] = 0;
							}
							if (str.indexOf('/') !== -1) {
								dict[v] -= 1;
							} else {
								dict[v] += 1;
							}
						}
					}
				} else {
					if (!dict.hasOwnProperty(v)) {
						dict[k] = 0;
					}
					if (str.indexOf('/') !== -1) {
						dict[k] -= 1;
					} else {
						dict[k] += 1;
					}
				}
			}
		} else {
			var m = 1;
			if (str.indexOf('^') !== -1) {
				var n = Number(str.right('^'));
				var x = Number(k);
				m = Math.pow(x, n);
			} else {
				m = Number(k);
			}
			if (str.indexOf('/') != -1) {
				if (multiply % m === 0) {
					multiply = multiply / m;
				} else {
					divide = divide * m;
				}
			} else {
				multiply = multiply * m;
			}
		}
	});
	if (multiply === 0 || divide === 0) {
		return 0;
	}
	var bl = false;
	var left = "";
	if (multiply % divide === 0) {
		var shan = (multiply / divide);
		if (shan !== 1) {
			left = shan + '';
		}
		bl = true;
	} else {
		var param = denominator(multiply, divide);
		multiply = param.multiply;
		divide = param.divide;
	}

	var right = "";
	// 合并公式
	for (var k in dict) {
		var val = dict[k];
		if (val === 1) {
			left += k
		} else if (val !== 0) {
			if (val > 0) {
				left += k + '^' + val
			} else {
				var n = -val;
				if (n === 1) {
					right += k
				} else {
					right += k + '^' + n
				}
			}
		}
	}
	var result = "";
	if (!bl) {
		if (multiply !== 1) {
			result = multiply + left;
		} else {
			result = left;
		}
		if (divide !== 1) {
			result += '/' + divide + right;
		} else {
			result += '/' + right;
		}
	} else {
		if (right) {
			result = left + '/' + right;
		} else {
			result = left;
			if(!result)
			{
				result = "1";
			}
		}
	}
	if (result.indexOf('/') === 0) {
		result = 1 + result;
	}
	return result;
};

module.exports = multiply_divide;