/**
 * @author 公众号素燕
 * @description async\await 使用
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

const { request } = require("http");
const { send } = require("process");

//  async 关键字的定义
function demo0() {
    async function suyan() {

    }
    let add = async function() {};
    let sub = async () => {};
    class Suyan {
        async request() {

        }
    }
}

function demo1() {
    async function request() {
        console.log('request start');
        // 返回一个值，但是会被包装成一个 promise 对象
        return 'suyan';
    }
    // ret 为一个 Promise
    let ret = request();
    console.log('request end', ret);
}
// demo1();

function demo2() {
    function request() {
        return new Promise((reject, resolve) => {
            setTimeout(() => {;
                resolve('suyan')
            }, 100);
        })
    }
    async function send() {
        try {
            // 只有在异步函数中才能使用 await
            // await 需要等待一个实现 thenable 的接口或者一个普通值
            // 同步函数中使用 await 将会抛出异常
            // JavaScript 运行时在碰 到 await 关键字时，会记录在哪里暂停执行。
            // 等到 await 右边的值可用了，JavaScript 运行时会向消息 队列中推送一个任务，这个任务会恢复异步函数的执行。
            let res = await request();
            console.log('res = ', res);
        } catch (error) {
            console.log('error =', error);
        }
    }
    send();
}
// demo2();

function demo3() {
    async function suyan() {
        console.log(2);
        // await 后面的代码会异步执行，即使 await 后面已经有了可用值
        await 10;
        console.log(4);
    }
    console.log(1);
    suyan();
    console.log(3);
}
// demo3();

// 实现一个延迟
function demo4() {
    async function sleep(delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, delay);
        });
    }
    async function call() {
        const start = Date.now();
        await sleep(100);
        // 这个时间其实并不准，有时候是 104、106、107
        console.log(Date.now() - start);
    }
    call();
}
// demo4();

function demo5() {
    async function randomDelay(id) {
        const delay = (Math.random() * 100).toFixed(0);
        console.log(`${id}-${delay} start`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`${id}-${delay} finished`);
                resolve();
            }, delay);
        })
    }
    // 串行执行
    async function callSeril() {
        const start = Date.now();
        await randomDelay(0);
        await randomDelay(1);
        await randomDelay(2);
        // 三个任务必须一个执行完采取执行另一个
        // 必选等待上面的任务都执行完成才会执行下面的任务
        console.log(`${Date.now() - start}ms elapsed`);
    }
    // 并行执行
    async function callParallel() {
        // 任务之间不必等待，可同时执行
        const start = Date.now();
        let p0 = randomDelay(0);
        let p1 = randomDelay(1);
        let p2 = randomDelay(2);
        await p0;
        await p1;
        await p2;
        // 必选等待上面的任务都执行完成才会执行下面的任务
        console.log(`${Date.now() - start}ms elapsed`);
    }
    callSeril();
}
demo5();