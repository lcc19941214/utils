function debounce(fn, wait) {
  var timer, context, args;

  var debounced = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    context = this;
    args = arguments;

    timer = setTimeout(function() {
      fn.apply(context, args);
    }, wait);
  };

  debounced.cancel = function() {
    clearTimeout(timer);
    timer = context = args = null;
  }

  return debounced;
}