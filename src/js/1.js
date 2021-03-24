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

function demo5() {
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
}

function demo4() {
    const p3 = new Promise((resolve, reject) => {
        resolve('B');
    });
    
    const p1 = new Promise((resolve, reject) => {
        // resolve 又是一个 Promise
        resolve(p3);
    });
    
    const p2 = new Promise((resolve, reject) => {
        resolve('A');
    });
    
    p1.then(res => {
        console.log('p1 then = ', res);
    });
    
    p2.then(res => {
        console.log('p2 then = ', res);
    }).then(res => {
        console.log('p2 then2 = ', res);
    }).then(res => {
        console.log('p2 then3 = ', res);
    });
}


function demo3() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
    });
    // 注册了 3 次都会被执行
    p.then(res => {
        console.log('res1 = ', res);
    });
    p.then(res => {
        console.log('res2 = ', res);
    });
    p.then(res => {
        console.log('res2 = ', res);
    });
}
// demo3();

function demo6() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
    })
    .then(res => {
        return res + ':' + 'fe';
    })
    .then(res => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(res + ':' + 'promise');
            }, 1000);
        });
    })
    .then(res => {
        return res + ':' + 'love';
    })
    .then(res => {
        console.log(res);
    })
}
// demo6();

function demo7() {
    let p = new Promise((resolve, reject) => {
        resolve('suyan');
    });
    p.then(res => {
        suyan.call();
        console.log('success: ', res);
    }, error => {
        console.log('fail: ', error);
    })
    .catch(error => {
        console.log('fail2: ', error);
    });
}
demo7();