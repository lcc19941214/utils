/**
 * 可复用的 cluster 启动脚本。
 * 将 worker 脚本作为回调传入给 master, 在 master 内封装统一的启动、重试、事件监听的等逻辑。
 */

const start = require('./master');

start(() => {
  const http = require('http');

  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`[worker:${process.pid}] hello world\n`);
    })
    .listen(8000);
});
