function MathTool(init = 0) {
  // if (not number) return undefined

  const queue = [];
  const MAX_SIZE = 100;
  queue.push = function(...args) {
    if (queue.length <= MAX_SIZE) {
      [].push.apply(queue, args);
    } else {
      console.log(`MathTool can only hold ${MAX_SIZE} operators at the same time`);
    }
  };
  function _plus(num = 0) {
    return val => val + num;
  }
  function _minus(num = 0) {
    return val => val - num;
  }
  function _multiple(num = 1) {
    return val => val * num;
  }
  function _division(num = 1) {
    // num should not be zero
    return val => val / num;
  }

  const tool = {
    value() {
      return queue.reduce((pre, cur) => cur(pre), init);
    },
    plus(num) {
      queue.push(_plus(num));
      return this;
    },
    minus(num) {
      queue.push(_minus(num));
      return this;
    },
    multiple(num) {
      queue.push(_multiple(num));
      return this;
    },
    division(num) {
      queue.push(_division(num));
      return this;
    },
    group(fn) {
      return fn(this);
    }
  };

  return tool;
}

var a = MathTool(5)
  .group(tool => tool.plus(5).minus(3))
  .multiple(3)
  .value();

console.log(a);
