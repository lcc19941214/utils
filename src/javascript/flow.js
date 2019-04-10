function compose() {
  const fns = Array.from(arguments);
  return function() {
    const context = this;

    const args = Array.from(arguments);
    const result = fns.reduceRight((rst, fn, index, arr) => {
      return fn.apply(context, [].concat(rst));
    }, args);
    return result;
  };
}

function composeLeft() {
  const fns = Array.from(arguments);
  return compose.apply(undefined, fns.concat().reverse());
}
