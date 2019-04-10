const isString = str => typeof str === 'string';

const isNumber = num => typeof num === 'number';

const isArray = arr => {
  if (Array.isArray) {
    return Array.isArray(arr);
  } else {
    return arr instanceof Array;
  }
};

const isFunc = fn => typeof fn === 'function';

const isNull = val => val === null;

const isUndef = val => val === undefined;

const isObject = obj => !isNull(obj) && typeof obj === 'object';

const isEmptyObject = obj => {
  if (Object.hasOwnProperty('keys')) {
    return Object.keys(obj).length === 0;
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
};

const isNode = node => {
  return isObject(Node)
    ? node instanceof Node
    : !!(node && isObject(node) && isNumber(node.nodeType) && isString(node.nodeName));
};

const isElement = elem => {
  return isObject(HTMLElement)
    ? elem instanceof HTMLElement
    : !!(elem && isObject(elem) && elem.nodeType === 1 && isString(elem.nodeName));
};
