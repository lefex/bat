/**
 * @author 公众号素燕
 * @description 几道面试题让你搞懂 Promise
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

// promiseAllRace();

const Promise = require('./promise');

function step() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
        console.log('1');
    });
    p.then(res => {
        console.log('2 resolve = ', res);
    }).then(res => {
        console.log('3 resolve = ', res);
    });
    p.then(res => {
        console.log('4 resolve = ', res);
    }, error => {
        console.log('4 reject = ', error);
    });
}
// step();

function asyncCall() {
    new Promise((resolve, reject) => {
        console.log('start fn');
        setTimeout(() => {
            console.log('timeout');
            resolve('suyan');
        }, 0);
        console.log('end fn');
    }).then(res => {
        console.log('resolve = ', res);
    });
    console.log('start');
}
// asyncCall();

function resolvePromise() {
    let p1 = new Promise((resolve, reject) => {
        console.log('start fn');
        resolve('suyan');
        console.log('end fn');
    });
    console.log('p1 = ', p1);
    let p2 = p1.then(res => {
        console.log('resolve = ', res);
        return new Promise((resolve, reject) => {
            console.log('inner fn start ');
            setTimeout(() => {
                console.log('inner timeout start ');
                let p = new Promise((resolve, reject) => {
                    console.log('inner timeout fn start ');
                    resolve('inner' + res);
                });
                resolve(p);
            }, 1000);
        })
    });
    console.log('p2 = ', p2);
    p2.then(res => {
        console.log('outer = ', res);
    });
}
resolvePromise();

function rejectCatch() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
    }).then(res => {
        suyan.age = 20;
        console.log('resolve = ', res);
    }, error => {
        console.log('reject error');
    }).catch(error => {
        console.log('catch error');
    });
}
// rejectCatch();

function onceState() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
        setTimeout(() => {
            reject('error');
        }, 100);
    }).then(res => {
        console.log('resolve = ', res);
    }, error => {
        console.log('reject error');
    });
}
// onceState();

function race() {
    const genPromise = time => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('excute: ', time);
                resolve(time);
            }, time);
        });
    };
    let p1 = genPromise(100);
    let p2 = genPromise(200);
    let p3 = genPromise(300);
    const tasks = [p1, p2, p3];
    Promise.race(tasks).then(res => {
        console.log('res = ', res);
    });
}
// race();

function raceIMP() {
    const genPromise = time => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('excute: ', time);
                resolve(time);
            }, time);
        });
    };
    let p1 = genPromise(100);
    let p2 = genPromise(200);
    let p3 = genPromise(300);
    const tasks = [p1, p2, p3];
    let p = new Promise((resolve, reject) => {
        for (let i = 0; i < tasks.length; i++) {
            Promise.resolve(tasks[i]).then(resolve, reject);
        }
    });
    p.then(res => {
        console.log('res = ', res);
    });
}
// raceIMP();

// 考察 Promise.resolve 的实现
function promseResolveIMP() {
    const handle = value => {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }
        return new Promise(resolve => {
            resolve(value)
        });
    };
    handle('suyan1').then(res => {
        console.log('res1 = ', res);
    });
    let p = new Promise(resolve => {
        resolve('suyan2')
    });
    handle(p).then(res => {
        console.log('res2 = ', res);
    });

    Promise.resolve('suyan3').then(res => {
        console.log('res3 = ', res);
    });
    let p2 = new Promise(resolve => {
        resolve('suyan4')
    });
    Promise.resolve(p2).then(res => {
        console.log('res4 = ', res);
    });
}
// promseResolveIMP();

function getTasks(count) {
    const genPromise = time => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('excute: ', time);
                resolve(time);
            }, time);
        });
    };
    let ret = [];
    for(let i = 1; i <= count; i++) {
        ret.push(genPromise(Math.floor(Math.random() * 10)));
    }
    return ret;
}

// 执行结果是什么？
function promiseAllRace() {
    Promise.all([]).then(res => {
        console.log('all = ', res);
    }, error => {
        console.log('all error = ', error);
    });
    Promise.race([]).then(res => {
        console.log('race = ', res);
    }, error => {
        console.log('race error = ', error);
    });
}


function promiseAllIMP() {
    let pall = new Promise((resolve, reject) => {
        const tasks = getTasks(5);
        const ress = [];
        let remaining = tasks.length;
        for(let i = 0; i < tasks.length; i++) {
            const excutePromise = tasks[i];
            excutePromise.then(res => {
                ress[i] = res;
                remaining -= 1;
                if (remaining === 0) {
                    resolve(ress);
                }
            }, error => {
                reject(error);
            });
        }
    });
    pall.then(res => {
        console.log('res = ', res);
    }, error => {
        console.log('error = ', error);
    });
}
// promiseAllIMP();

function testFinally() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
    }).then(res => {
        console.log('resolve = ', res);
    }).finally(res => {
        console.log('finally = ', res);
    });
}
// testFinally();