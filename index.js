/**
 * @fileOverview 数学公式变形、转换成js 并计算模块
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

/**
 * 数学公式计算函数
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
		 * 字典
		 * @property {Array} identities 恒等式（注释列表）
		 * @property {Array} math 计算函数（注释列表）
		 * @property {Array} convert 变换函数（注释列表）
		 * @property {Array} symbol 符号替换函数（注释列表）
		 */
		this.dict = {
			identities: [],
			math:[],
			convert: [],
			symbol: []
		};

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
		 *  类型，base基础、geometry几何数学
		 */
		this.type = "base";
	}
}

/**
 * 初始化
 */
Maths.prototype.init = function() {
	
};

/**
 * 载入公式
 * @param {String} path 检索的路径
 * @param {String} type 类型, 例如: identities恒等式、convert变换函数、symbol符号、math计算函数、
 * @return {String} 成功返回true，失败返回错误类型；
 */
Maths.prototype.load = function(path, type) {
	
};

/**
 * 设置常量
 * @param {Object} constant 常量集合，采用键值对的方式 例如：{ a: 10, b: 15, d: [1,-1] }
 */
Maths.prototype.set_const = function(constant) {
	$.push(this.const, constant, true);
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

