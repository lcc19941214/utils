/**
 * 包裹一个返回 promise 的异步函数，使其每次调用，都必须等待前一次调用结束才真正生效
 * @param {() => Promise<any>} promiseGen
 */
function linearize(promiseGen) {
  let active = Promise.resolve();
  return (...args) => {
    active = active.then(() => promiseGen(...args));
    return active;
  };
}
