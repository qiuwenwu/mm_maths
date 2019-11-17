/**
 * 圆周率
 * @param {number} 倍数
 * @return {number} 返回数值
 */
module.exports = function PI(num) {
	if(num === undefined)
	{
		num = 1;
	}
	return Math.PI * num;
};
