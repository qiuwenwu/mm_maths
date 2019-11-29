/**
 * 取自然数
 * @param {Array} arr
 * @return {Array} 返回自然数数组
 */
module.exports = function natural(arr) {
	var arr_new = [];
	for (var i = 0; i < arr.length; i++) {
		var num = arr[i];
		if(num >= 0 && num === parseInt(num))
		{
			arr_new.push(num);
		}
	}
	return arr_new;
};