
var k = x.replace('+', '').replace('-', '');
		var val = "";
		if (k.indexOf('*') !== -1 || k.indexOf('/') !== -1) {
			k = multiply_divide(k);
			if (x.indexOf('-') === -1) {
				val = k;
			} else {
				val = '-' + k;
			}
		} else {
			val = x;
		}
		if (isNaN(k)) {
			if (/^[0-9]+$/.test(k.replace(/\//g, ''))) {
				var m = Number((k).left('/', true));
				var right = (k).right('/');
				var d = 1;
				if(right)
				{
					d = Number(right);
				}
				multiply = multiply * d + m * divide;
				divide = divide * d;
				var o = denominator(multiply, divide);
				multiply = o.multiply;
				divide = o.divide;
			} else {
				// console.log(val);
				if (/[0-9]/.test(k) && k.indexOf('^') === -1 && k.indexOf('/') === -1) {
					var ar_k = k.match(/[a-zA-Z]+/);
					var ar_n = k.split(/[a-zA-Z]+/);
					for (var i = 0; i < ar_k.length; i++) {
						var v = ar_k[i];
						var str = ar_n[i];
						var n = 1;
						if (str) {
							n = Number(str);
						}
						if (!dict.hasOwnProperty(v)) {
							dict[v] = 0;
						}
						if (x.indexOf('-') !== -1) {
							dict[v] -= n;
						} else {
							dict[v] += n;
						}
					}
				} else {
					if (k.indexOf('/') !== -1) {
						var v = k.replace(/[a-zA-Z]/, '');
						var m = (v).left('/');
						var d = (v).right('/');
						multiply *= Number(m);
						divide *= Number(d);
					}
					if (!dict.hasOwnProperty(k)) {
						dict[k] = 0;
					}
					if (x.indexOf('-') !== -1) {
						dict[k] -= 1;
					} else {
						dict[k] += 1;
					}
				}
			}
		} else {
			num += Number(val);
		}