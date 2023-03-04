export function runAsyncAwait() {
  async function requestUserInfo(userId: string) {
    console.log('excute in requestUserInfo function');
    // 带有返回值时，为一个Promise.resolve
    return {
      name: userId
    }
  }

  async function requestUserInfoPromise(userId?: string) {
    console.log('excute in requestUserInfo function');
    // throw Error('userId is null');
    // 带有返回值时，为一个Promise.resolve
    if (userId) {
      return Promise.resolve({
        name: userId
      });
    }
    // 返回错误信息
    return Promise.reject('userId is null');
  }

  async function requestUserInfoAsync(userId?: string) {
    // 返回值为异步的
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: userId
        })
      }, 1000)
    });
  }

  function runWithPromise() {
    requestUserInfo('11').then(info => {
      // 异步执行
      console.log('requestUserInfo:', info);
    });
    console.log('excute 2');
  
    requestUserInfoPromise('').then(info => {
      // 异步执行
      console.log('requestUserInfoPromise:', info);
    }).catch(err => {
      console.log('requestUserInfoPromise catch:', err);
    });
  }

  async function runWithAwait() {
    try {
      // await可以让出JavaScript运行线程的执行，等到执行完成继续执行后面的操作
      const userInfo = await requestUserInfoPromise('runWithAwait');
      console.log('requestUserInfoPromise:', userInfo);
    } catch (error) {
      console.log('runWithAwait requestUserInfoPromise catch:', error);
    }
  }

  console.log('runWithAsyncFun --------------------------')

  async function runWithAsyncFun() {
    try {
      // await可以让出JavaScript运行线程的执行，等到执行完成继续执行后面的操作
      const userInfo = await requestUserInfoAsync('runWithAsyncFun');
      console.log('requestUserInfoAsync:', userInfo);
    } catch (error) {
      console.log('runWithAsyncFun requestUserInfoAsync catch:', error);
    }
  }
  runWithAsyncFun();

  console.log('testOrder0 --------------------------')

  async function testOrder0() {
    console.log(2);
    await null;
    console.log(4);
}
//   console.log(1);
//   testOrder0();
//   console.log(3);

  console.log('testOrder --------------------------')


  async function testOrder() {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
  }

  async function testOrde2() {
    console.log(4);
    console.log(await 6);
    console.log(7);
  }

  console.log(1);
  testOrder();
  console.log(3);
  testOrde2();
  console.log(5);
  // 1 2 3 4 5

  async function testSleep() {
    async function sleep(delay: number) {
      debugger
      return new Promise(resolve => setTimeout(resolve, delay));
    }
    await sleep(100);
    console.log('sleept');
  }
  // testSleep();
}