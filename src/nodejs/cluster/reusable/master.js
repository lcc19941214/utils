module.exports = callable => {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    console.log(`[master] ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`[master] worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`[worker] ${process.pid} started`);
    callable();
  }
};
