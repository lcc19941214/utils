const cp = require('child_process');
const child = cp.fork('./child.js');

console.log('[main] pid: ' + process.pid);
console.log('[main] child pid: ' + child.pid);

child.on('message', msg => {
  console.log('[main] got a message');
  console.log('[main] message: ' + msg);
});

// 监听子进程断开连接
child.on('exit', () => {
  console.log('[main] child process exited');
});

console.log('[main] sent a message');
child.send('hello world');

setTimeout(() => {
  child.disconnect();
  // process.kill(child.pid)
}, 3000);
