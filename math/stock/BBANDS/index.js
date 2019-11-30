function average(a) {
	var r = {
			mean: 0,
			variance: 0,
			deviation: 0
		},
		t = a.length,
		m, l, s;
	for (m, s = 0, l = t; l--; s += a[l]) {}
	for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2)) {}
	return r.deviation = Math.sqrt(r.variance = s / t), r;
}

function BBANDS(array, period, deviation) {
	var bbands = {
			middleband: [],
			lowband: [],
			highband: []
		},
		sma = SMA(array, period),
		avg, i, arr;
	if (isNaN(deviation))
		deviation = 2;
	for (i = period - 1; i >= 0; i--) {
		arr = array.slice(i, i + period);
		avg = average(arr);
		bbands.highband[i] = sma[i] + (deviation * avg.deviation);
		bbands.lowband[i] = sma[i] - (deviation * avg.deviation);
		bbands.middleband[i] = sma[i];
	}
	return bbands;
}
exports.BBANDS = BBANDS;