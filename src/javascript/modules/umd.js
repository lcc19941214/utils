/**
 * UMD(Universal Module Definition)
 * @see https://leohxj.gitbooks.io/front-end-database/content/javascript-modules/about-umd.html
 * @see https://www.cnblogs.com/snandy/archive/2012/03/19/2406596.html
 * @see https://github.com/amdjs/amdjs-api/wiki/AMD
 */

(function (root, factory) {
  // 判断 module.exports
  // 判断 define.amd
  // 判断 exports
  // fallback global
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    exports['xxx'] = factory();
  } else {
    root['xxx'] = factory();
  }
})(this, function () {
  return {};
});
