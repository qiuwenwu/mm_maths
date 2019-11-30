const EMA = require('../EMA');

/**
 * 异同移动平均线
 * @param {Array} arr
 * @param {Number} i12
 * @param {Number} i26 
 * @param {Number} i9 DIF周期时长
 * @return {type}
 */
module.exports = function MACD(arr, i12 = 12, i26 = 26, i9 = 9) {
	var ema12 = EMA(arr, i12),
		ema26 = EMA(arr, i26),
		macd = [],
		i, signal, histogram;
	for (i = 0; i < ema12.length; i++) {
		macd.push(ema12[i] - ema26[i]);
	}
	signal = EMA(macd, i9);
	histogram = [];
	for (i = 0; i < macd.length; i++) {
		histogram.push(macd[i] - signal[i]);
	}
	return {
		macd: macd,
		signal: signal,
		histogram: histogram
	};
};
