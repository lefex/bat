// import promiseFinally from './finally';
// import allSettled from './allSettled';

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
//   console.log('promise init');
  /** @type {!number} */
  // 0 pending 1 fulfilled 2 rejected 3 value is a promise
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  // 创建完后，直接执行 resolve 函数
  doResolve(fn, this);
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
    // promise 的值不能是自己
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      // 如果 resolve 还是一个 promise
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

// 执行 resolve 或者 reject
function finale(self) {
  // reject
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    // 执行传进来的函数
    fn(
      function(value) {
        // resolve 只能执行一次，后面的不再执行
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        // reject 只能执行一次，后面的不能再执行
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    // 函数抛出了异常
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

// 捕获异常的方法
Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

/**
 * @constructor
 * then 后创建一个 promise
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  // 调用 handle 函数，
  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

// 执行函数
// self 为当前的 Promise
// deferred 为一个 Handler 对象
function handle(self, deferred) {
  // 如果状态是 3 需要找到最后一个 value 不是 Promise 的
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

// finally 的实现，不管成功与否总会调用该方法
Promise.prototype['finally'] = function(fn) {
  return this.then(value => {
    return Promise.resolve(fn()).then(res => {
      return value;
    });
  }, reason => {
    return Promise.resolve(fn()).then(res => {
      reject(reason);
    })
  });
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        // 判读是否为一个 Promise，看起是否实现了 then，这种方式为鸭子模型（长的像鸭子，叫起来像鸭子，那么就是鸭子）
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                // 递归调用
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          // 只有所有的 Promise 都完成后才能调用 resolve
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

// Promise.allSettled = allSettled;

// 直接创建 resolve
Promise.resolve = function(value) {
  // 如果 value 是 Promise，直接用这个 Promise 就好
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  // 新创建一个 Promise
  return new Promise(function(resolve) {
    resolve(value);
  });
};

// 直接创建 reject
Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

// 竞争，最先返回 resolve 或 reject 的
Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    // 空数组，永远不会决议，没有 reject 或 resolve
    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;
