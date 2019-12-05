/**
 * 交叉
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Number} 上插返回1, 否则返回0
 */
module.exports = function CROSS(arr1, arr2) {
	if (arr1.length < 3 || arr2.length < 3) {
		return 0;
	}
	
	var ret = 0;
	var arr_x = arr1.slice().reverse();
	var arr_y = arr2.slice().reverse();
	
	for (var i = 0; i < arr_x.length; i++) {
		if (i + 2 == arr_x.length - 1) {
			break;
		}
		var x1 = arr_x[i];
		var x2 = arr_x[i + 1];
		var x3 = arr_x[i + 2];

		var y1 = arr_y[i];
		var y2 = arr_y[i + 1];
		var y3 = arr_y[i + 2];

		if (x1 >= x2 && x2 >= x3 && x1 > y1 && x3 < y3) {
			// 表示上一个是上叉
			ret = 1;
		}
		else if(y1 >= y2 && y2 >= y3 && y1 > x1 && y3 < x3) {
			// 表示上一个是下叉
			break;
		}
	}
	return ret;
};
