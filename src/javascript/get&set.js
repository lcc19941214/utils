function getProp(target, path) {
  if (!isString(path) || !isObject(target)) return undefined;
  const arr = path.split(CONSTANT.PROP_PATH_PATTERN);

  let oTarget = target;
  for (const key of arr) {
    if (oTarget && oTarget.hasOwnProperty(key)) {
      oTarget = oTarget[key];
    } else {
      oTarget = undefined;
    }
  }
  return oTarget;
}

function setProp(target, path, val) {
  if (!isString(path) || !isObject(target)) return false;
  const arr = path.split(CONSTANT.PROP_PATH_PATTERN);

  let oTarget = target;
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const isLast = arr.length - 1 === i;
    if (!oTarget.hasOwnProperty(key) || !isLast) {
      oTarget[key] = {};
    }
    oTarget = oTarget[key];
    if (isLast) {
      oTarget[key] = val;
    }
  }
  return true;
}
