type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? U : never;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type Parameters<T extends (...args: any) => any> = T extends (...args: infer T) => any ? T : never;

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// -----------------------------

type obj = { a: string; b: number; c: boolean };
type readonly = Readonly<obj>;
type mutable = Mutable<Readonly<obj>>;

type key = keyof any;

type exclude = Exclude<1 | 2 | 3 | 4, 1 | 2 | 3>;
type extract = Extract<1 | 2 | 3 | 4, 1 | 2 | 3>;
type omit = Omit<obj, 'a'>;

type r = ReturnType<() => number>;
