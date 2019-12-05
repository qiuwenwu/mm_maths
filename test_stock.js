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
		HIGH: H,
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
	var ret = "";
	var exp = "";

	// 金叉 (看涨 +2)
	exp = `
		var MA5 = MA(CLOSE, 5);
		var MA10 = MA(CLOSE, 10);
		return CROSS(MA5, MA10);
	`;
	console.log("均线金叉", machs.run_code(exp));

	// 死叉 (看跌 +2)
	exp = `
		var MA5 = MA(CLOSE, 5);
		var MA10 = MA(CLOSE, 10);
		return CROSS(MA10, MA5);
	`;
	console.log("均线死叉", machs.run_code(exp));


	// 放量上涨 (看涨 +1)
	exp = `
		var V1 = UP(VOL);
		var C2 = REF(CLOSE, 2);
		var C1 = REF(CLOSE, 1);
		return V1 && C1 > C2;
	`;
	console.log("放量上涨", machs.run_code(exp));


	// 放量下跌 (看跌 +2)
	exp = `
		var V1 = UP(VOL);
		var C2 = REF(CLOSE, 2);
		var C1 = REF(CLOSE, 1);
		return V1 && C1 < C2;
	`;
	console.log("放量下跌", machs.run_code(exp));


	// 缩量上涨 (看涨 +2)
	exp = `
		var V1 = DOWN(VOL);
		var C2 = REF(CLOSE, 2);
		var C1 = REF(CLOSE, 1);
		return V1 && C1 > C2;
	`;
	console.log("缩量上涨", machs.run_code(exp));


	// 缩量下跌 (看跌 +1)
	exp = `
		var V1 = DOWN(VOL);
		var C2 = REF(CLOSE, 2);
		var C1 = REF(CLOSE, 1);
		return V1 && C1 < C2;
	`;
	console.log("缩量下跌", machs.run_code(exp));


	// 跳空高开 (看涨 +1)
	exp = `
		var O1 = REF(OPEN, 1);
		var H1 = REF(HIGH, 2);
		return O1 > H1;
	`;
	console.log("跳空高开", machs.run_code(exp));


	// 跳空低开 (看跌 +1)
	exp = `
		var O1 = REF(OPEN, 1);
		var L1 = REF(LOW, 2);
		return O1 < L1;
	`;
	console.log("跳空低开", machs.run_code(exp));


	// 均线多头 (看涨 +2)
	exp =
		`
		var MA5 = MA(CLOSE, 5);
		var MA10 = MA(CLOSE, 10);
		var MA30 = MA(CLOSE, 30);
		var MA60 = MA(CLOSE, 60);
		return REF(MA5, 2) > REF(MA10, 2) && REF(MA10, 2) > REF(MA30, 2) && REF(MA30, 2) > REF(MA60, 2);
	`;
	console.log("均线多头", machs.run_code(exp));


	// 均线空头 (看跌 +2)
	exp =
		`
		var MA5 = MA(CLOSE, 5);
		var MA10 = MA(CLOSE, 10);
		var MA30 = MA(CLOSE, 30);
		var MA60 = MA(CLOSE, 60);
		return REF(MA5, 2) < REF(MA10, 2) && REF(MA10, 2) < REF(MA30, 2) && REF(MA30, 2) < REF(MA60, 2);
	`;
	console.log("均线空头", machs.run_code(exp));

	// machs.constant.OPEN = [1, 3, 5];
	// machs.constant.CLOSE = [1, 3, 5];
	
	// 早晨十字星 (看涨 +1)
	exp =
		`
		var O1 = REF(OPEN, 2);
		var C1 = REF(CLOSE, 2);
		var Cu = UP(CLOSE);
		var RET = CP(O1, "~=", C1) || CP(O1 * 1.02, "~=", C1) || CP(O1, "~=", C1 * 1.02);
		return Cu && RET
	`;
	console.log("早晨十字星", machs.run_code(exp));

	// machs.constant.OPEN = [5, 4, 3, 2, 1];
	// machs.constant.CLOSE = [5.2, 4.1, 3.2, 2, 1.2];
	
	// 黄昏十字星 (看跌 +1)
	exp =
		`
		var O1 = REF(OPEN, 2);
		var C1 = REF(CLOSE, 2);
		var Cd = DOWN(CLOSE);
		var RET = CP(O1, "~=", C1) || CP(O1 * 1.02, "~=", C1) || CP(O1, "~=", C1 * 1.02);
		return Cd && RET
	`;
	console.log("黄昏十字星", machs.run_code(exp));
	
	// 蜻蜓点水 (看涨 +2)
	exp =
		`
		var C1 = REF(CLOSE, 2);
		var C2 = REF(CLOSE, 3);
		var Cd = DOWN(CLOSE);
		return Cd C2 > C1
	`;
	console.log("蜻蜓点水", machs.run_code(exp));
	
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
