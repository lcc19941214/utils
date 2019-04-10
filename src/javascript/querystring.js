const query = {
  /**
   * stringify a query object
   * @param {object} obj
   * @param {boolean} hasPrefix
   * @return {string}
   * @example
   * stringify({ a: 1 }) => a=1
   * stringify({ a: '?' }, true) => ?%3F
   */
  stringify: (obj = {}, hasPrefix) => {
    const arr = [];
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      arr.push(`${key}=${encodeURIComponent(val)}`);
    });
    const str = arr.join('&');
    return hasPrefix ? `?${str}` : str;
  },

  /**
   * parse a query string to object
   * @param {string} str
   * @return {object}
   * @example
   * parse("?q=fetch+get&") => { q: "fetch+get" }
   */
  parse: (str = '') => {
    if (str.indexOf('?') === 0) {
      str = str.slice(1);
    }
    const arr = str.split('&');
    if (!arr.length) return;
    const obj = {};
    arr.forEach(v => {
      const [key, value] = v.split('=');
      obj[key] = decodeURIComponent(value);
    });
    return obj;
  }
};
