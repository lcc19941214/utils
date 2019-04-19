export default class Dep {
  private deps: Function[];
  public constructor() {
    this.deps = [];
  }

  public depend() {
    if (Dep.target && typeof Dep.target === 'function' && !this.deps.includes(Dep.target)) {
      this.deps.push(Dep.target);
    }
  }

  public notify() {
    this.deps.forEach(dep => {
      dep();
    });
  }

  public static target: Function = null;
}
