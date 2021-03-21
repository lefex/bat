/**
 * @author 公众号素燕
 * @description 第1题：Promise
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

 function timeout() {
     console.log('1 - ');
    // 放到异步队列中执行，等下一个事件循环后执行
     setTimeout(() => {
        console.log('2 - ');
     }, 0);
     console.log('3 - ');
}
// timeout();

function demo1() {
    let p = new Promise((resolve, reject) => {
        console.log('1');
        setTimeout(() => {
            console.log('3');
            resolve('success');
        }, 0);
        // 表明不能从 fullfilled 状态转换成 rejected
        // setTimeout(() => {
        //     console.log('4');
        //     reject('fail');
        // }, 1000);
    }).then(res => {
        console.log('res = ', res);
    }, reason => {
        console.log('reason = ', reason);
    }).then(res => {
        console.log('res2 = ', res);
    }).then(res => {
        console.log('res3 = ', res);
    });
    console.log('2');
}
// demo1();

function addTen(x) {
    return Promise.resolve(x)
    .then(x => x + 2)
    .then(x => x + 3)
    .then(x => x + 5);
}
addTen(2).then(res => console.log(res));

// 如何实现未知数量的 Promise 串行队列

function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen2(x) {
    return [addTwo, addThree, addFive]
    .reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}
addTen2(4).then(res => {
    console.log(res);
});

let x = 3;
setTimeout(() => x = x + 4, 1000);
setTimeout((x) => {
    return x + 4;
}, 1000);