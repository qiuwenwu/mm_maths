/**
 * 取最大值
 * @param {Array} arr
 * @return {Number} 返回最大值
 */
module.exports = function max(arr) {
	var number = 0;
	for (var i = 0; i < arr.length; i++) {
		var num = arr[i];
		if(num > number)
		{
			number = num;
		}
	}
	return number;
};