type resolveDeps = Array<string> | string | Function;

interface Injector {
  dependencies: Object;
  register: Function;
  resolve(deps: resolveDeps, func?: Function | Object, scope?: Object): Function;
  resolveScope(deps: Array<string>, func: Function, scope?: Object): Function;
}

function createInjector(): Injector {
  return {
    dependencies: {},
    register(key: string, value: any) {
      this.dependencies[key] = value;
    },
    resolve(...args) {
      // resolve arguments
      let deps: string[] = [];
      let func: Function;
      let scope = {};
      if (Array.isArray(args[0])) {
        deps = args[0] as Array<string>;
        func = args[1] as Function;
        scope = args[2] || {};
      } else if (typeof args[0] === 'string') {
        deps = (args[0] as string).split(',');
        func = args[1] as Function;
        scope = args[2] || {};
      } else {
        func = args[0] as Function;
        scope = args[1] || {};
        const matched = func.toString().match(/function\s*[^(]*\(([^)]*)\)/m);
        if (matched) {
          deps = matched[1].replace(/\s/g, '').split(',');
        }
      }

      return (...args) => {
        let params = [];
        deps.forEach(d => {
          const dep = this.dependencies[d];
          params.push(d && dep ? dep : args.shift());
        });
        return func.apply(scope, params);
      };
    },
    resolveScope(deps = [], func, scope) {
      const args = [];
      scope = scope || {};
      deps.forEach(d => {
        const dep = this.dependencies[d];
        if (dep) {
          scope[d] = dep;
        } else {
          throw new Error(`Cannot resolve dependency '${d}'`);
        }
      });
      return function() {
        return func.apply(scope, Array.prototype.slice.call(arguments));
      };
    }
  };
}

function demo1() {
  const injector = createInjector();
  injector.register('hello', () => console.log('hello'));
  injector.register('world', () => console.log('world'));

  const scope = {};
  const func = injector.resolveScope(
    ['hello', 'world'],
    function(...args) {
      this.hello();
      this.world();
      console.log(...args);
    },
    scope
  );

  func('This', 'Is', 'Conan');
}

function demo2() {
  const injector = createInjector();
  injector.register('hello', 'hello');
  injector.register('world', 'world');

  const func = injector.resolve(function(hello, test, world, lastDay) {
    console.log(hello);
    console.log(test);
    console.log(world);
    console.log(lastDay);
  });
  func('test', 'lastDay');
}

demo2();
