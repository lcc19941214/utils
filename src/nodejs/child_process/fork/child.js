// 父进程 send 第一条消息时，才会开始执行子进程
const name = `[child:${process.pid}]`;
console.log(`${name} ppid: ${process.ppid}`);

process.on('message', function(msg) {
  console.log(`${name} got a message`);
  process.send(`${name} message length is ' + msg.length`);
});

setTimeout(() => {
  process.send(`${name} heart beat 1`);
}, 1000);

setTimeout(() => {
  process.send(`${name} heart beat 2`);
}, 2000);

// 监听父进程断开连接
process.on('disconnect', () => {
  console.log(`${name} disconnect`);
});
