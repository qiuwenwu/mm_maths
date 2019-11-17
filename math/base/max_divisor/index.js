/**
 * 最大公约数
 * @param {number} 值
 * @return {number} 返回公约数
 */
function max_divisor(a, b) {
	return b === 0 ? a : max_divisor(b, a % b);
}
module.exports = max_divisor;