/**
 *  a microtask is a small unit of code that is queued for execution on the microtask queue
 * 微任务是一个运行在微任务队列中的任务，其实就是一段代码
 * Microtasks are typically used for tasks that need to be executed as soon as possible, 
 * such as updating the UI after a state change or performing some other small, time-sensitive
 * operation.
 * 微任务通常是需要紧急执行，不耗时的事件，比如刷新UI
 * 本质上其实就是控制代码执行流程，能够异步执行代码，而不卡主线程
 */
export const runMicrotasks = function() {
  // 在当前任务中执行
  console.log('microtasks run');
  console.log('start');

  // 放到微任务队列中执行
  Promise.resolve().then(() => {
    console.log('microtask 1');
  });

  // 放到微任务队列中执行
  Promise.resolve().then(() => {
    console.log('microtask 2');
  });

  // 在当前任务中执行
  console.log('end');

  let count = 0;
  function increment() {
    count++;
    // 在微任务中更新UI
    queueMicrotask(() => {
      document.getElementById('count')!.textContent = `${count}`;
    });
  }
  document.getElementById('button')!.addEventListener('click', increment);



}