/**
 * 指数移动平均值
 * @param {Array} arr 数组
 * @param {Number} period 周期
 * @return {Array} 返回平均值数组
 */
module.exports = function EMA(arr, period) {
	var array = arr.slice().reverse(),
		iPos = 0,
		i, k, ema;
	for (iPos = 0; iPos < array.length && isNaN(array[iPos]); iPos++) {}
	array = array.slice(iPos);
	ema = [];
	k = 2 / (period + 1);
	for (i = 0; i < period - 1; i++) {
		ema[i] = NaN;
	}
	ema[period - 1] = array.slice(0, period).reduce(function(a, b) {
		return a + b;
	}) / period;
	for (i = period; i < array.length; i++) {
		ema[i] = array[i] * k + ema[i - 1] * (1 - k);
	}
	ema.reverse(); // reverse back for main consumption
	for (i = 0; i < iPos; i++) {
		ema.push(NaN);
	}
	return ema;
}
