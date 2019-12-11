// 父进程 send 第一条消息时，才会开始执行子进程
console.log('[child] ppid: ' + process.ppid);
console.log('[child] pid: ' + process.pid);

process.on('message', function(msg) {
  console.log('[child] got a message');
  process.send('[child] message length is ' + msg.length);
});

setTimeout(() => {
  process.send('[child] heart beat 1');
}, 1000);

setTimeout(() => {
  process.send('[child] heart beat 2');
}, 2000);

// 监听父进程断开连接
process.on('disconnect', () => {
  console.log('[child] disconnect');
});
