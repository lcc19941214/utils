/**
 * make a async function callback to ignore the not fresh callbacks
 * @param {function} fn the async function
 * @param {boolean} promisify the flag to use promise as the return value
 *  if `true`, fn should return a thenable object
 *  if `false`, the last argument of fn should be a function
 * @return {any}
 */
function ignoreLateCall(fn, promisify = true) {
  let id = 0;
  let lastId = 0;

  return function wrappedFn(...args) {
    const fnId = ++id;
    const executer = handler => (...iArgs) => {
      if (fnId <= lastId) {
        return;
      }
      lastId = fnId;
      handler(...iArgs);
    };

    if (!promisify) {
      const len = args.length;
      const cb = args[len - 1];
      if (typeof cb !== 'function') {
        throw new TypeError('the last item of arguments should be a function when set lastArgIsCallback');
      }
      args[len - 1] = executer(cb);
    }

    let rst = fn.apply(this, args);
    if (promisify) {
      if (!(rst instanceof Promise)) {
        rst = Promise.resolve(rst);
      }
      return new Promise((resolve, reject) => {
        rst.then(executer(resolve), executer(reject));
      });
    }
  };
}

export default ignoreLateCall;
