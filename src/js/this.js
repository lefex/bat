function demo1() {
    function foo(num) {
        // foo.count++;
        console.log('foo:' + num);
        // console.log(this.count); NAN
        this.count++;
    }
    foo.count = 0;

    var i;
    for(i = 0; i < 10; i++) {
        if (i > 5) {
            foo(i);
            // foo.call(foo, i); this 为 foo
        }
    }
    console.log(foo.count);
}

function demo2() {
    var a = 2;
    function foo(num) {
        // 严格模式 undefined
        // 非严格模式 2
        console.log(this.a);
    }
    // 函数的默认绑定
    // foo();
}

function demo3() {
    function foo(num) {
        // 2
        console.log(this.a);
    }
    var obj = {
        a: 2,
        foo: foo
    };
    obj.foo(); // 2
    // 隐式绑定
}



demo3();