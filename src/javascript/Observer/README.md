# Observer

```ts

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
console.log(obj.agePlus10); // register deps

obj.age = 30;
// 35
// I'm 35 years old in 10 years
```
