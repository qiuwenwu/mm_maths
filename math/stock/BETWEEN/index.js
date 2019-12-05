/**
 * 取数组左边成员
 * @param {Array} arr 数组
 * @param {Number} l 取文本左边
 * @param {Number} r 取成员个数
 * @return {Array} 返回数组
 */
module.exports = function BETWEEN(arr, l, r) {
	if (r > n) {
		return [];
	}
	
	if (l < 1) {
		l > 1;
	} else if (l > arr.length) {
		l = arr.length;
	}

	if (r > arr.length) {
		r = arr.length;
	}

	return arr.slice(l - 1, r);
}
