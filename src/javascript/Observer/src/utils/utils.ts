const noop = () => {};

export function getDescriptor(obj, key: string) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return {
    get: noop,
    set: noop,
    ...descriptor
  };
}
