const max = require('../array/max');

module.exports = function TRUERANGE(highs, lows, closes) {
	var tr = [],
		curr_diff, curr_high_diff, curr_low_diff, i;
	if (highs.length != lows.length || highs.length != closes.length) {
		//True ranges are found only when all arrays are of equal length
		return tr;
	}
	tr[0] = highs[0] - lows[0];
	for (i = highs.length - 1; i > 0; i--) {
		var tmp = [];
		tmp.push(highs[i] - lows[i]);
		tmp.push(Math.abs(lows[i] - closes[i + 1]));
		tmp.push(Math.abs(highs[i] - closes[i + 1]));
		tr[i] = max(tmp);
	}
	return tr;
}