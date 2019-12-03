/**
 * @fileOverview 数学公式变形、转换成js 并计算模块
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

/**
 * 数学公式计算函数
 * @property {Object} identities 恒等式（注释列表）
 * @property {Object} math 计算函数（注释列表）
 * @property {Object} convert 变换函数（注释列表）
 * @property {Object} symbol 符号替换函数（注释列表）
 */
class Maths {
	/**
	 * @param {String} dir 路径
	 */
	constructor(dir) {
		/**
		 * 检索文件路径
		 */
		this.dir = dir ? dir : __dirname;

		/**
		 * 常量（集合）
		 */
		this.constant = {};
		this.const = this.constant;

		/**
		 * 声明（集合）
		 */
		this.define = {};
		this.def = this.define;

		/**
		 * 已知条件
		 */
		this.known_conditions = {};
		this.known = this.known_conditions;

		/**
		 * 恒等式替换函数（集合）
		 */
		this.identities = {};
		this.eq = this.identities;

		/**
		 * 计算函数（集合）
		 */
		this.math = {};

		/**
		 * 变换函数（集合）
		 */
		this.convert = {};
		this.ct = this.convert;

		/**
		 * 符号替换函数（集合）
		 */
		this.symbol = {};
		this.sl = this.symbol;

		/**
		 * 学科方向，mathematical数学、physical物理、chemistry化学
		 */
		this.subject = "mathematical";

		/**
		 *  类型，base基础数学、geometry几何数学、stock股票
		 */
		this.type = "base";
	}
}

/**
 * 初始化
 */
Maths.prototype.init = function() {};

/**
 * 载入公式
 * @param {String} path 检索的路径
 * @param {String} type 类型
 * @param {String} expand 拓展类型, 例如: identities恒等式、convert变换函数、symbol符号、math计算函数
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load_sub = function(path, type, expand) {
	if (!path) {
		path = __dirname
	}
	if (!type) {
		type = "math";
	}
	if (!expand) {
		expand = "base";
	}
	var dict = this[expand];
	if (!dict) {
		console.log("不存在的类型", expand);
		return;
	}
	var searchFile = `*${expand}.json`;
	var files = $.file.getAll(path, searchFile);

	files.map(o => {
		var cg = o.loadJson();
		if (cg && cg.name) {
			if (!cg.type || cg.type.has(type)) {
				if (cg.func_file && cg.key) {
					dict[cg.key] = cg;
					var f = cg.func_file.fullname(o.dirname());
					if (f.hasFile()) {
						var func = require(f);
						if (func) {
							this[cg.key] = func;
						}
					}
				}
			}
		}
	});
};

/**
 * 更新
 * @param {String} path 路径
 * @param {String} type 类型
 */
Maths.prototype.clear = function(path, type) {

};

/**
 * 更新
 * @param {String} path 路径
 * @param {String} type 类型
 */
Maths.prototype.update = function(path, type) {
	this.clear(type);
	this.load(path, type);
};

/**
 * 载入恒等式变形函数
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如：default 默认，base 基础数学
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load_identities = function(path, type) {
	this.load_sub(path, type, "identities");
};

/**
 * 载入转换函数
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如：default 默认，base 基础数学
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load_convert = function(path, type) {
	this.load_sub(path, type, "convert");
};

/**
 * 载入符号处理函数
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如：default 默认，base 基础数学
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load_symbol = function(path, type) {
	this.load_sub(path, type, "symbol");
};

/**
 * 载入计算函数
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如：default 默认，base 基础数学
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load_math = function(path, type) {
	this.load_sub(path, type, "math");
};

/**
 * 载入公式
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如：default 默认，base 基础数学
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load = function(path, type) {
	this.load_identities(path, type);
	this.load_convert(path, type);
	this.load_symbol(path, type);
	this.load_math(path, type);
};

/**
 * 设置常量
 * @param {Object} constant 常量集合，采用键值对的方式 例如：{ a: 10, b: 15, d: [1,-1] }
 */
Maths.prototype.set_const = function(constant) {
	$.push(this.constant, constant, true);
};

/**
 * 下定义
 * @param {Object} def 定义集合, 例如：
 */
Maths.prototype.set_def = function(def) {
	$.push(this.def, def, true);
};

/**
 * 设置已知条件 
 * @param {Object} know 已知条件 { c: "a + b", e: "ab" }
 */
Maths.prototype.set_know = function(know) {
	$.push(this.know, know, true);
};

/**
 * 设置函数头
 */
Maths.prototype.head = function() {
	var head = "";
	for (var k in this.math) {
		if (!this.constant[k]) {
			head += "var " + k + " = math." + k + ";\r\n"
		}
	}
	for (var k in this.constant) {
		var value = this.constant[k];
		head += "var " + k + " = constant." + k + ";\r\n"
	}
	return head;
}

/**
 * 运行代码
 * @param {String} express 表达式
 * @return {Object} 执行结果
 */
Maths.prototype.run_code = function(express) {
	var head = this.head();
	var exp = head + express;
	let func = new Function('constant', 'math', exp);
	
	var ret;
	try {
		ret = func(this.constant, this);
	} catch (e) {
		console.log(e);
		//TODO handle the exception
	}
	return ret;
};

module.exports = Maths;
