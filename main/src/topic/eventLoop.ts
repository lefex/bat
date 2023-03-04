export function runEventLoop() {

  type Task = () => (void);
  const microtaskQueue: Task[] = [];
  const macrotaskQueue: Task[] = [];

  function queueMicrotask(task: Task) {
    microtaskQueue.push(task);
  }

  function queueMacrotask(task: Task) {
    macrotaskQueue.push(task);
  }

  function runMicrotasks() {
    while (microtaskQueue.length > 0) {
      const task = microtaskQueue.shift();
      task && task();
    }
  }

  function runMacrotasks() {
    while (macrotaskQueue.length > 0) {
      const task = macrotaskQueue.shift();
      task && task();
    }
  }

  function eventLoop() {
    while (true) {
      // Run all microtasks before running any macrotasks
      runMicrotasks();
      
      // If there are no more tasks to execute, wait for new tasks to arrive
      if (microtaskQueue.length === 0 && macrotaskQueue.length === 0) {
        setTimeout(eventLoop, 0);
        return;
      }

      // Run the oldest macrotask
      runMacrotasks();
    }
  }

  // Example usage
  queueMicrotask(() => console.log("Microtask 1"));
  queueMicrotask(() => console.log("Microtask 2"));
  queueMacrotask(() => console.log("Macrotask 1"));
  queueMacrotask(() => console.log("Macrotask 2"));

  eventLoop();
}