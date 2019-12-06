const STAR = require('../STAR');

/**
 * 判断是否十字星
 * @param {Array} arr_open 开盘价数组
 * @param {Array} arr_close 收盘价数组
 * @param {Array} arr_heig 最高价数组
 * @param {Array} arr_low 最低价数组
 * @param {Number} idx 索引
 * @param {Number} n 幅度
 * @return {Number} 判断正确返回1,否则返回0
 */
module.exports = function ASTAR(arr_open, arr_close, arr_heig, arr_low, idx, n) {
	var open = arr_open[idx - 1];
	var close = arr_close[idx - 1];
	var heig = arr_heig[idx - 1];
	var low = arr_low[idx - 1];
	return STAR(open, close, heig, low, n);
}
