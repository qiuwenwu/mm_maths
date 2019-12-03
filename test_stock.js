const fs = require("fs");
const Maths = require("./index");
const Http = require('./https.js');

var machs = new Maths();
machs.update(null, "stock");

async function test(marketId) {
	var hp = new Http();
	// "https://www.bw.io/exchange/config/controller/website/marketcontroller/getByWebId";

	var res = await hp.get(`https://www.bw.io/api/data/v1/klines?marketId=${marketId}&type=1D&dataSize=180`);

	// 最高价
	var H = [];
	// 最低价
	var L = [];
	// 开盘价
	var O = [];
	// 收盘价
	var C = [];
	// 成交量
	var V = [];
	// 涨跌幅
	var CHG = [];
	// 日期
	var DATE = [];
	// 时间
	var TIME = [];
	
	if (res.body) {
		var arr = res.body.toJson().datas;
		arr.map(o => {
			H.push(Number(o[5]));
			L.push(Number(o[6]));
			O.push(Number(o[4]));
			C.push(Number(o[7]));
			V.push(Number(o[8]));
			CHG.push(Number(o[9]));
			var dateTime = new Date(Number(o[3]))
			DATE.push(dateTime.toStr('yyyy-MM-dd'));
			TIME.push(dateTime.toStr('hh:mm:ss'));
		});
	}
	H = H.reverse();
	L = L.reverse();
	O = O.reverse();
	C = C.reverse();
	CHG = CHG.reverse();
	V = V.reverse();
	
	machs.constant = {
		H: H,
		HEIG: H,
		L: L,
		LOW: L,
		O: O,
		OPEN: O,
		C: C,
		CLOSE: C,
		V: V,
		VOL: V,
		CHG: CHG
	};
	// console.log(machs.const);
	var exp = `
		var MA5 = EMA(CLOSE, 5);
		var MA10 = EMA(CLOSE, 10);
		// var MA30 = EMA(CLOSE, 30);
		// var MA60 = EMA(CLOSE, 60);
		var A1 = ARR(MA5, 10);
		var A2 = ARR(MA10, 10);
		return CROSS(A1, A2);
	`;

	var ret = machs.run_code(exp);
	console.log('公式执行结果:', ret);
}
test(281);

// "datas": [
        // [
        //     "K",          //数据类型，K线数据
        //     "281",        //市场id
        //     "btc_usdt",   //交易对
        //     "1569302520", //时间戳
        //     "9741.6",     //开盘价
        //     "9741.7",     //最高价
        //     "9737.2",     //最低价
        //     "9737.3",     //收盘价
        //     "5.18",       //成交量
        //     "0.0441",     //涨跌幅
        //     "1M",         //K线类型，1分钟：1M
        //     "50458.35"    //成交额
        // ],
// ]
