import { observable } from '../types';
import { getDescriptor } from '../utils/utils';
import Dep from './dep';

function defineProperty<T extends observable>(obj: T, key: string, value: any) {
  const dep = new Dep();
  const descriptor = getDescriptor(obj, key);
  let $value = value;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      descriptor.get();
      dep.depend();
      return $value;
    },
    set(nextValue: typeof value) {
      descriptor.set(nextValue);
      $value = value;
      dep.notify();
    }
  });
}

function observer<T extends observable>(obj: T): T {
  const keys = Object.keys(obj);
  for (const key of keys) {
    defineProperty(obj, key, obj[key]);
  }
  return obj;
}

export default observer;
