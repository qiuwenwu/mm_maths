var Maths = require('./index');

var maths = new Maths(__dirname);

// 第一步，载入公式及相关函数
maths.update(__dirname, "stock");

maths.const = {
	CLOSE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

maths.set_var({
	ma5: "MA(CLOSE, 5)"
});

console.log(new Date());
var ret = maths.run_code(`
	var a = MA(CLOSE, 5);
	return a;
`);

console.log(new Date());
var ret = maths.run_code(`
	var b = MA(CLOSE, 5);
	return REF(b, 0);
`);

console.log(new Date());
console.log(ret);





// console.log(Math.cos(0));
// var fd = (2*Math.PI / 360) * 30;
// console.log(Math.cos(fd));
// fd = (2*Math.PI / 360) * 60;
// console.log(Math.cos(fd));
// fd = (2*Math.PI / 360) * 90;
// console.log(Math.cos(fd));
// fd = (2*Math.PI / 360) * 180;
// console.log(Math.cos(fd));
// fd = (2*Math.PI / 360) * 270;
// console.log(Math.cos(fd));
// fd = (2*Math.PI / 360) * 360;
// console.log(Math.cos(fd));