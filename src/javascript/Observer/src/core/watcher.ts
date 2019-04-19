import { observable } from '../types';
import Dep from './dep';

function watcher<T extends observable>(
  obj: T,
  key: string,
  computer: Function,
  onUpdate?: Function
) {
  const onUpdateHandler = () => {
    onUpdate(computer());
  };
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      Dep.target = onUpdateHandler;
      const val = computer();
      Dep.target = null;
      return val;
    },
    set() {
      throw new Error('Unable to set value for computed property');
    }
  });
}

export default watcher;
