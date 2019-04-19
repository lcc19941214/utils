import watcher from './core/watcher';
import observer from './core/observer';

interface Obj {
  name: string;
  age: number;
  agePlus10?: number;
}

const obj: Obj = observer({ name: 'Bob', age: 25 });

watcher(
  obj,
  'agePlus10',
  () => {
    return obj.age + 10;
  },
  (val: number) => {
    console.log(`I'm ${val} years old in 10 years`);
  }
);
console.log(obj.agePlus10);
obj.age = 30;

