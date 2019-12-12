const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: {
      id: process.pid
    }
  });
  worker.on('message', console.log);
  worker.on('error', console.log);
  worker.on('exit', code => {
    if (code !== 0)
      console.log(new Error(`Worker stopped with exit code ${code}`));
  });
  setTimeout(() => {
    console.log('[main] timeout 100');
  }, 100);
  setTimeout(() => {
    console.log('[main] timeout 200');
  }, 200);
  setTimeout(() => {
    console.log('[main] timeout 300');
  }, 300);
} else {
  console.time('[worker]');
  parentPort.postMessage(workerData);

  // 平均耗时 250ms
  // 主线程的三个定时器，其中两个会在阻塞性的运算时，同步打印，意味着两个线程是同时执行的
  for (let index = 0; index < 10000000; index++) {
    const arr = [];
    arr.push(index);
  }
  console.timeEnd('[worker]');
}
