type FunctionKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];

type obj = {
  prop: string;
  method?: () => number;
  method2: () => number;
};

type functionK = FunctionKeys<obj>;
