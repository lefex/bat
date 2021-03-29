/**
 * @author 公众号素燕
 * @description 生成器 Generator的学习
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

// 生成器可以自定义迭代器，也可以实现协程
// 箭头函数不能使用生成器

function demo() {
    function *suyan1() {

    }
    let suyan2 = function *(){

    };
    let suyan3 = {
        *call() {

        }
    };
    class Suyan {
        *call() {

        }
    };
    // 生成器中实现了迭代器
    console.log(suyan1()[Symbol.iterator]);
}

function demo0() {
    var x = 1;

    function foo() {
        x++;
        // 如果在这之间可以暂停执行，做其它事情，其它事情做完后再回来
        bar();
        console.log('x = ', x);
    }

    function bar() {
        x++;
    }
    foo();
}
// demo0();

// yield 用来暂停和恢复生成器函数的执行
// rv = yield [expression] rv 
// expression： Defines the value to return from the generator function via the iterator protocol.
// If omitted, undefined is returned instead.
// rv：Retrieves the optional value passed to the generator's next() method to resume its execution.

function demo1() {
    // 我们称 learnStep 为生成器
    function *learnStep() {
        const welcome = '和素燕一起学JavaScript异步编程';
        console.log(welcome);
        // yield 可以看做是 return，遇到第一 yield 暂停，把表达式的值返回
        yield '第一步：学习回调';
        yield '第二步：学习Promise';
        console.log('恭喜你学完Promise');
        yield '第三步：学习生成器Generator';
        console.log('恭喜你学完生成器');
        yield '第四步：学习 async/await';
        yield (1 + 1 + 1 + 1);
        console.log('恭喜你，学完了 JavaScript 的异步编程');
    }
    // 我们称 it 为迭代器
    const it = learnStep();
    console.log('1', it.next());
    console.log('2', it.next());
    console.log('3', it.next('素燕'));
    console.log('4', it.next('素燕'));
    console.log('5', it.next());
    console.log('6', it.next());
}
// demo1();

function demo2() {
    let x = 2;
    function *add() {
        x += 4;
        // 第一个 next 将在这里暂停
        yield;
        console.log('x = ', x);
    }
    function bar() {
        x += 3;
    }
    // 创建一个迭代器 iterator，代码并没有开始执行
    let it = add();
    // 开启 Generator 执行，运行到第一个 yield
    it.next();
    // 在 add 这个函数中插入一个 bar 函数来执行
    bar();
    // 从上次暂停的位置继续执行 add 函数，整个函数运行结束
    it.next();
}
// demo2();

function demo3() {
    function *add(x, y) {
        return x + y;
    }
    // 使用参数创建一个迭代器
    let it = add(2, 3);
    console.log('1.', it.next());
}
// demo3();

function demo4() {
    // 首先看到 *，这是什么鬼，难道是个指针？这是一个生成器函数，包含一个参数
    function *suyan(x) {
        // 这里的 yield 要求一个值，调用 next 的时候需要传递一个参数
        // 这里应该被插入什么值？
        // yield 3 返回 3
        var y = x * (yield 0.5);
        y += (yield);
        return y;
    }
    // 创建一个迭代器 it，参数为 6，赋值给 x
    var it = suyan(6);
    console.log('1.', it);
    // 启动生成器
    // 第一个 next 总是启动一个生成器，并运行到第一个 yield 处
    // next 的个数总要比 yield 多一个（运行到函数结束）
    // 第一个 next 如果传递参数，将会被默认丢掉
    console.log('2.', it.next());

    // 4 表示 yield 表达式的参数
    console.log('3.', it.next(4));
    console.log('4.', it.next(3));
}
// demo4();

function demo5() {
    function* add() {
        // x 值需要下一个 next 的参数传递
        // yield 后面的内容需要返回给 next 调用
        var x = yield 2;
        console.log('x =', x);
        z++;
        // y 的值需要下一个 next 的参数传递
        // yield 后面的 x*z 需要返回给 next 的调用
        var y = yield(x * z);
        console.log('y =', y);
        console.log(x, y, z);
        // 最后一个 next 将得到 x+y+z 的结果
        return x + y + z;
    }
    var z = 1;

    var it1 = add();

    console.log('1.', it1.next());
    // x 的值为 3
    console.log('2.', it1.next(3));
    // y 的值为 4
    console.log('3.', it1.next(4));
}
// demo5();

function demo6() {
    var a = 1;
    var b = 200;
    function *foo() {
        a++;
        yield;
        b = b * a;
        // next 的参数加上 3 的值就是 a 的值
        a = (yield b) + 3;
    }
    function *bar() {
        b--;
        yield;
        a = (yield 8) + b;
        b = a * (yield 2);
    }

    let itFoo = foo();
    let itBar = bar();
    console.log(itFoo.next()); // a = 2 undefined
    // console.log(itBar.next()); // b = 199 undefined

    console.log(itFoo.next()); // b = 199 * 2 = 398 398
    // console.log(itBar.next()); // b = 199 8

    console.log(itFoo.next(5)); // b = 199 * 2 = 398 398
    // console.log(itBar.next()); // b = 199 8

    console.log('a = ', a);
    console.log('b = ', b);
}
// demo6();

function demo7() {
    let st = (function() {
        var nextVal;
        return {
            // [] 计算属性名
            // Symbol.iterator 定义的特殊 Symbol
            // iterable 的 key 必须为 Symbol.iterator，值为一个可迭代的对象，包含 next 函数
            [Symbol.iterator]: function() {
                return this;
            },
            // 迭代器必须提供一个 next 方法
            next: function() {
                if (nextVal === undefined) {
                    nextVal = 1;
                }
                else {
                    nextVal = 3 * nextVal + 6
                }
                // 准寻迭代器协议，done 标明是否结束
                // value 表示这次迭代的值
                return {
                    done: false,
                    value: nextVal
                };
            }
        }
    })();
    // console.log(st.next().value);
    // console.log(st.next().value);
    // console.log(st.next().value);
    // console.log(st.next().value);
    // console.log(st.next().value);

    // 迭代器遍历，每次遍历都会调用 next 函数
    for(let v of st) {
        console.log(v);
        if (v > 500) {
            break;
        }
    }
}
// demo7();

function demo8() {
    // 使用生成器返回一个可迭代的对象
    function *st() {
        var nexVal;
        try {
            while(true) {
                if (nexVal === undefined) {
                    nexVal = 1;
                }
                else {
                    nexVal += 1;
                }
                // yield 保证每次迭代完就会暂停，无需担心死循环
                // 相比 demo7 无需使用闭包来记录新的值
                yield nexVal;
            }
        } finally {
            console.log('生成器终止');
        }
    }
    // 通过一个生成器返回一个迭代器
    let it = st();
    // 迭代器可以进行遍历
    for(let v of it) {
        console.log(v);
        if (v > 5) {
            // 终止生成器
            it.return();
        }
    }
}
// demo8();

function demo9() {
    function request() {
        console.log('start request');
        let isError = false;
        setTimeout(() => {
            if (isError) {
                // 抛出一个异常
                it.throw(Error('error'));
            }
            else {
                // 把结果 suyan 给了上次 next 结束的返回值
                it.next('suyan');
            }
        }, 100);
    }
    function *main() {
        try {
            console.log('start main');
            let text = yield request();
            console.log('get data: ', text);
        } catch (error) {
            console.log('get data error', error);
        }
    }
    // 上面的 main 和 request 函数都不会执行
    var it = main();
    // 开始执行
    console.log(it.next());
}
// demo9();

function demo10() {
    function request() {
        console.log('start request');
        return new Promise((resolve, reject) => {
            let isError = false;
            setTimeout(() => {
                if (isError) {
                    reject(Error('error'));
                }
                else {
                    resolve('suyan');
                }
            }, 100);
        });
    }
    function *main() {
        try {
            console.log('start main');
            let text = yield request();
            console.log('get data: ', text);
        } catch (error) {
            console.log('get data error', error);
        }
    }
    // 上面的 main 和 request 函数都不会执行
    var it = main();
    // 开始执行
    let p = it.next().value;
    p.then(res => {
        console.log('res = ', res);
    });
}
// demo10(); 
function demo11() {
    function run(generator) {
        let args = [].slice.call(arguments, 1);
        // 初始化生成器
        let it = generator.apply(this, args);
        // 返回一个 promise
        return Promise.resolve()
            .then( function handleNext(value) {
                let next = it.next(value);
                return (function handleResult(next) {
                    if (next.done) {
                        return next.value;
                    }
                    else {
                        return new Promise.resolve(next.value)
                            .then(handleNext, function handleError(err) {
                                return Promise.resolve(it.throw(err))
                                .then(handleResult);
                            });
                    }
                })(next);
            });
    }
    function request() {
        console.log('start request');
        return new Promise((resolve, reject) => {
            let isError = false;
            setTimeout(() => {
                if (isError) {
                    reject(Error('error'));
                }
                else {
                    resolve('suyan');
                }
            }, 100);
        });
    }
    function *main() {
        try {
            console.log('start main');
            let text = yield request();
            console.log('get data: ', text);
        } catch (error) {
            console.log('get data error', error);
        }
    }
    run(main);
}
// demo11();

function demo12() {
    function *a() {
        for(const x of [1, 2, 3]) {
            yield x;
        }
    }
    for(let v of a()) {
        console.log(v);
    }
    function *b() {
        yield *[1, 2, 3];
    }
    for(let v of b()) {
        console.log(v);
    }
    // a 和 b 生成器等价
}
demo12();

// ES7 async await