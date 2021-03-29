/**
 * @author 公众号素燕
 * @description 自定义迭代器
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

class Counter {
    constructor(limit) {
        this.count = 1;
        this.limit = limit;
    }
    
    [Symbol.iterator]() {
        let count = 1;
        let limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return {
                        done: false,
                        value: count++
                    };
                }
                else {
                    return {
                        done: true,
                        value: undefined
                    };
                }
            },
            return() {
                // 提前结束
                console.log('Exiting early');
                return { done: true };
            }
        }
    }
}

let counter = new Counter(3);

for(let i of counter) {
    console.log(i);
    if(i > 1) {
        break;
    }
}
// 一个 counter 可以多次迭代
for(let i of counter) {
    console.log(i);
}