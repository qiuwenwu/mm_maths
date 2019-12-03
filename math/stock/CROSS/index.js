// 返回上穿的周期数. 正数为上穿周数, 负数表示下穿的周数, 0指当前价格一样
module.exports = function cross(arr1, arr2) {
	var arr1 = arr1.reverse();
	var arr2 = arr2.reverse();
	// 参数个数为2个，从参数名可以看出，这两个 参数应该都是 数组类型，数组就
	// 好比是 在X轴为 数组索引值，Y轴为 指标值的 坐标系中的 线段， 该函数就是判断 两条线的 交叉情况 
	if (arr1.length !== arr2.length) { // 首先要判断 比较的两个 数组 长度是否相等
		throw "array length not equal"; // 如果不相等 抛出错误，对于 不相等 的指标线  无法 判断相交
	}
	var n = 0;
	// 声明 变量 n  用来记录  交叉状态 ，初始  0 ，未相交 
	for (var i = arr1.length - 1; i >= 0; i--) {
		// 遍历 数组 arr1， 遍历顺序 为 从最后一个元素 向前 遍历
		if (typeof(arr1[i]) !== 'number' || typeof(arr2[i]) !== 'number') {
			// 当 arr1 或者 arr2 任何一个数组 为 非数值类型 （即 无效指标） 时，跳出 遍历循环。
			break; // 跳出循环
		}
		if (arr1[i] < arr2[i]) {
			// 如果 arr1 小于 arr2 则 n-- ， 会记录 开始时 arr1、arr2 的相对 状态，（即 开始时  n 会根据 arr1[i] 、 arr2[i] 相对大小 自行调整，一旦出现 另一种 和 n 状态 相反的 arr1[i]、arr2[i] 大小关系， 即发生了 两条线交叉。）
			if (n > 0) {
				break;
			}
			n--;
		} else if (arr1[i] > arr2[i]) {
			// 如果 arr1 大于 arr2 则 n++
			if (n < 0) {
				break;
			}
			n++;
		} else {
			//  arr1[i] == arr2[i] ，则立即 跳出
			break;
		}
	}
	// 返回 n 值，代表 已经交叉了多少周期， 0 即 指标值相等。
	return n;
};

// 存在BUG
