/**
 * 上升趋势
 * @param {Object} arr
 * @return {Number} 上升返回1, 否则返回0
 */
module.exports = function UP(arr) {
	if (arr.length > 2) {
		var len = arr.length;
		var v1 = arr[len - 3];
		var v2 = arr[len - 2];
		var v3 = arr[len - 1];
		if (v3 > v2 && v2 > v1) {
			return 1
		}
	}
	return 0;
};
