const fs = require("fs");
const Maths = require("./index");
const Http = require('./https.js');

var machs = new Maths();
machs.update(null, "stock");

/**
 * @param {Object} H
 * @param {Object} L
 * @param {Object} C
 * @param {Object} V
 * @param {Object} CHG
 * @param {Object} DATE
 */
async function(H, L, C, V, CHG, DATE) {
	
}

async function test(marketId) {
	var hp = new Http();
	// "https://www.bw.io/exchange/config/controller/website/marketcontroller/getByWebId";

	var res = await hp.get(`https://www.bw.io/api/data/v1/klines?marketId=${marketId}&type=1D&dataSize=250`);

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

	var d = 7;
	var now = new Date();
	var date = now.addDays(-d);
	console.log(date.toStr('yyyy-MM-dd'));
	
	if (res.body) {
		var arr = res.body.toJson().datas;
		var ar = arr.reverse().slice(0, arr.length - d);
		ar.map(o => {
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
		var Yi = AYIN(OPEN, CLOSE, CHG, 4, 0.04);
		var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 3);
		var Ya = AYANG(OPEN, CLOSE, CHG, 2, 0.04);
		return Yi && Sr && Ya
	`;
	console.log("早晨十字星", machs.run_code(exp));

	// machs.constant.OPEN = [5, 4, 3, 2, 1];
	// machs.constant.CLOSE = [5.2, 4.1, 3.2, 2, 1.2];

	// 黄昏十字星 (看跌 +1)
	exp =
		`
		var Ya = AYANG(OPEN, CLOSE, CHG, 4, 0.04);
		var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 3);
		var Yi = AYIN(OPEN, CLOSE, CHG, 2, 0.04);
		return Ya && Sr && Yi
	`;
	console.log("黄昏十字星", machs.run_code(exp));

	// 蜻蜓点水 (看涨 +2)
	exp =
		`
		var C1 = REF(CLOSE, 2);
		var C2 = REF(CLOSE, 3);
		var A1 = RIGHT(CLOSE, 5);
		var A2 = LEFT(A1, 3);
		var Ld = DOWN(LOW);
		var Cn = C1 * 1.04
		return Ld && C2 > Cn
	`;
	console.log("蜻蜓点水", machs.run_code(exp));

	// 旱地拔葱 (看涨 +2)
	exp =
		`
		var H1 = REF(HIGH, 2);
		var H2 = REF(HIGH, 3);
		var A1 = RIGHT(HIGH, 6);
		var A2 = LEFT(A1, 4);
		var Ha = AP(A2, 0.03);
		var Hn = H2 * 1.04;
		return Ha && H1 > Hn
	`;
	console.log("旱地拔葱", machs.run_code(exp));
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
