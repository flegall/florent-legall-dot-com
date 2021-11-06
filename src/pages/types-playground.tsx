type Expect<T extends true> = T;
// type ExpectTrue<T extends true> = T;
// type ExpectFalse<T extends false> = T;
// type IsTrue<T extends true> = T;
// type IsFalse<T extends false> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
// type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
// type IsAny<T> = 0 extends 1 & T ? true : false;
// type NotAny<T> = true extends IsAny<T> ? false : true;

// type Debug<T> = { [K in keyof T]: T[K] };
type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

// type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false;
// type ExpectValidArgs<
//   FUNC extends (...args: any[]) => any,
//   ARGS extends any[]
// > = ARGS extends Parameters<FUNC> ? true : false;

// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
//   k: infer I,
// ) => void
//   ? I
//   : never;

export const Pick = () => {
  type MyPick<T, K extends keyof T> = {
    [k in K]: T[k];
  };

  // @ts-ignore
  type cases = [
    Expect<Equal<Expected1, MyPick<Todo, "title">>>,
    Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
    // @ts-expect-error
    MyPick<Todo, "title" | "completed" | "invalid">,
  ];

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  interface Expected1 {
    title: string;
  }

  interface Expected2 {
    title: string;
    completed: boolean;
  }
};

export const ReadOnly = () => {
  /* _____________ Your Code Here _____________ */

  type MyReadonly<T> = {
    readonly [k in keyof T]: T[k];
  };

  // @ts-ignore
  type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

  interface Todo1 {
    title: string;
    description: string;
    completed: boolean;
  }
};

export const TupleToObject = () => {
  /* _____________ Your Code Here _____________ */

  type TupleToObject<T extends readonly any[]> = {
    [value in T[number]]: value;
  };

  /* _____________ Test Cases _____________ */

  const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

  // @ts-ignore
  type cases = [
    Expect<
      Equal<
        TupleToObject<typeof tuple>,
        {
          tesla: "tesla";
          "model 3": "model 3";
          "model X": "model X";
          "model Y": "model Y";
        }
      >
    >,
  ];
};

export const FirstOfArray = () => {
  type First<T extends unknown[]> = T extends [] ? never : T[0];

  // @ts-ignore
  type cases = [
    Expect<Equal<First<[3, 2, 1]>, 3>>,
    Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
    Expect<Equal<First<[]>, never>>,
    Expect<Equal<First<[undefined]>, undefined>>,
  ];
};

export const LengthOfTuple = () => {
  /* _____________ Your Code Here _____________ */

  type Length<T extends unknown> = T extends ReadonlyArray<any>
    ? T["length"]
    : never;

  const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
  const spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT",
  ] as const;

  // @ts-ignore
  type cases = [
    Expect<Equal<Length<typeof tesla>, 4>>,
    Expect<Equal<Length<typeof spaceX>, 5>>,
  ];
};

export const Exclude = () => {
  type MyExclude<T, U> = T extends U ? never : T;

  // @ts-ignore
  type cases = [
    Expect<
      Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>
    >,
    Expect<
      Equal<
        MyExclude<"a" | "b" | "c", "a" | "b">,
        Exclude<"a" | "b" | "c", "a" | "b">
      >
    >,
    Expect<
      Equal<
        MyExclude<string | number | (() => void), Function>,
        Exclude<string | number | (() => void), Function>
      >
    >,
  ];
};

export const Awaited = () => {
  type Awaited<T> = T extends Promise<infer A> ? A : never;

  type X = Promise<string>;
  type Y = Promise<{ field: number }>;
  type Z = Promise<Promise<boolean>>;

  // @ts-ignore
  type cases = [
    Expect<Equal<Awaited<X>, string>>,
    Expect<Equal<Awaited<Y>, { field: number }>>,
    Expect<Equal<Awaited<Z>, Promise<boolean>>>,
  ];
};

export const AwaitedRecursive = () => {
  type AwaitedRecursive<T> = T extends Promise<infer A>
    ? AwaitedRecursive<A>
    : T;

  type X = Promise<string>;
  type Y = Promise<{ field: number }>;
  type Z = Promise<Promise<boolean>>;

  // @ts-ignore
  type cases = [
    Expect<Equal<AwaitedRecursive<X>, string>>,
    Expect<Equal<AwaitedRecursive<Y>, { field: number }>>,
    Expect<Equal<AwaitedRecursive<Z>, boolean>>,
  ];
};

export const If = () => {
  type If<C, T, F> = C extends true ? T : F;

  // @ts-ignore
  type cases = [
    Expect<Equal<If<true, "a", "b">, "a">>,
    Expect<Equal<If<false, "a", 2>, 2>>,
  ];

  // @ts-expect-error
  type error = If<null, "a", "b">;
};

export const Concat = () => {
  type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

  // @ts-ignore
  type cases = [
    Expect<Equal<Concat<[], []>, []>>,
    Expect<Equal<Concat<[], [1]>, [1]>>,
    Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
    Expect<
      Equal<
        Concat<["1", 2, "3"], [false, boolean, "4"]>,
        ["1", 2, "3", false, boolean, "4"]
      >
    >,
  ];
};

export const Includes = () => {
  type Includes<T extends readonly any[], U> = U extends T[number]
    ? true
    : false;

  // @ts-ignore
  type cases = [
    Expect<
      Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
    >,
    Expect<
      Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
    >,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  ];
};

export const Push = () => {
  type Push<T extends readonly any[], U> = [...T, U];

  // @ts-ignore
  type cases = [
    Expect<Equal<Push<[1, 2], 3>, [1, 2, 3]>>,
    Expect<Equal<Push<[], 1>, [1]>>,
  ];
};

export const Unshift = () => {
  type Unshift<T extends readonly any[], U> = [U, ...T];

  // @ts-ignore
  type cases = [
    Expect<Equal<Unshift<[1, 2], 3>, [3, 1, 2]>>,
    Expect<Equal<Unshift<[], 1>, [1]>>,
  ];
};

export const Parameters = () => {
  type MyParameters<F> = F extends (...args: infer P) => any ? P : never;

  // @ts-ignore
  type cases = [
    Expect<
      Equal<MyParameters<(a: number, b: string) => string>, [number, string]>
    >,
    Expect<Equal<MyParameters<() => string>, []>>,
  ];
};

export const ReturnType = () => {
  type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;

  // @ts-ignore
  type cases = [
    Expect<Equal<string, MyReturnType<() => string>>>,
    Expect<Equal<123, MyReturnType<() => 123>>>,
    Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
    Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
    Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
  ];

  type ComplexObject = {
    a: [12, "foo"];
    bar: "hello";
    prev(): number;
  };

  const fn = (v: boolean) => (v ? 1 : 2);
  const fn1 = (v: boolean, _: any) => (v ? 1 : 2);
};

export const Omit = () => {
  type MyExclude<T, U> = T extends U ? never : T;
  type MyOmit<T, K extends keyof T> = {
    [k in MyExclude<keyof T, K>]: T[k];
  };

  // @ts-ignore
  type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
    Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  ];

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  interface Expected1 {
    title: string;
    completed: boolean;
  }

  interface Expected2 {
    title: string;
  }
};

export const Readonly2 = () => {
  type MyExclude<T, U> = T extends U ? never : T;
  type MyReadonly<T> = {
    readonly [k in keyof T]: T[k];
  };
  type MyReadonly2<T, K extends keyof T = keyof T> = MyExclude<T, K> &
    MyReadonly<Pick<T, K>>;

  // @ts-ignore
  type cases = [
    Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
    Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
    Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  ];

  interface Todo1 {
    title: string;
    description?: string;
    completed: boolean;
  }

  interface Todo2 {
    readonly title: string;
    description?: string;
    completed: boolean;
  }

  interface Expected {
    readonly title: string;
    readonly description?: string;
    completed: boolean;
  }
};

export const DeepReadonly = () => {
  type MyDeepReadonly<T> = {
    readonly [k in keyof T]: T[k] extends Record<string | number, unknown>
      ? MyDeepReadonly<T[k]>
      : T[k];
  };

  // @ts-ignore
  type cases = [Expect<Equal<MyDeepReadonly<X>, Expected>>];

  type X = {
    a: () => 22;
    b: string;
    c: {
      d: boolean;
      e: {
        g: {
          h: {
            i: true;
            j: "string";
          };
          k: "hello";
        };
      };
    };
  };

  type Expected = {
    readonly a: () => 22;
    readonly b: string;
    readonly c: {
      readonly d: boolean;
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true;
            readonly j: "string";
          };
          readonly k: "hello";
        };
      };
    };
  };
};

export const MyTupleToUnion = () => {
  type TupleToUnion<T extends any[]> = T extends [infer FIRST, ...infer TAIL]
    ? FIRST | TupleToUnion<TAIL>
    : never;

  // @ts-ignore
  type test = TupleToUnion<[1, 2, 3]>;
  // @ts-ignore
  type cases = [
    Expect<Equal<TupleToUnion<[1, 2, 3]>, 1 | 2 | 3>>,
    Expect<Equal<TupleToUnion<[]>, never>>,
  ];
};

export const OtherTupleToUnion = () => {
  type TupleToUnion<T extends any[]> = T[number];

  // @ts-ignore
  type test = TupleToUnion<[1, 2, 3]>;
  // @ts-ignore
  type cases = [
    Expect<Equal<TupleToUnion<[1, 2, 3]>, 1 | 2 | 3>>,
    Expect<Equal<TupleToUnion<[]>, never>>,
  ];
};

export const ChainableOptions = () => {
  type Chainable<T extends {} = {}> = {
    option: <K extends string, V>(
      name: K,
      value: V,
    ) => Chainable<{
      [P in K | keyof T]: P extends K ? V : P extends keyof T ? T[P] : unknown;
    }>;
    get: () => T;
  };
  const config: Chainable = "" as any;

  // @ts-ignore
  const result = config
    .option("foo", 123)
    .option("name", "type-challenges")
    .option("bar", { value: "Hello World" })
    .get();

  // @ts-ignore
  type cases = [
    Expect<
      Equal<
        typeof result,
        {
          foo: number;
          name: string;
          bar: {
            value: string;
          };
        }
      >
    >,
  ];
};
export const LastOfArray = () => {
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type Last<T extends any[]> = T extends [...infer _, infer TAIL]
    ? TAIL
    : never;

  // @ts-ignore
  type tail1 = Last<arr1>; // expected to be 'c'
  // @ts-ignore
  type tail2 = Last<arr2>; // expected to be 1

  // @ts-ignore
  type cases = [
    Expect<Equal<Last<["a", "b", "c"]>, "c">>,
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
  ];
};

export const OtherLastOfArray = () => {
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type Last<T extends any[]> = [never, ...T][T["length"]];

  // @ts-ignore
  type tail1 = Last<arr1>; // expected to be 'c'
  // @ts-ignore
  type tail2 = Last<arr2>; // expected to be 1

  // @ts-ignore
  type cases = [
    Expect<Equal<Last<["a", "b", "c"]>, "c">>,
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
  ];
};

export const Pop = () => {
  type arr1 = ["a", "b", "c", "d"];
  type arr2 = [3, 2, 1];

  type Pop<T extends any[]> = T extends [...infer REST, infer _] ? REST : never;
  // @ts-ignore
  type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
  // @ts-ignore
  type re2 = Pop<arr2>; // expected to be [3, 2]

  // @ts-ignore
  type cases = [
    Expect<Equal<Pop<["a", "b", "c"]>, ["a", "b"]>>,
    Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  ];
};

export const Shift = () => {
  type arr1 = ["a", "b", "c", "d"];
  type arr2 = [3, 2, 1];

  type Shift<T extends any[]> = T extends [infer _, ...infer REST]
    ? REST
    : never;
  // @ts-ignore
  type re1 = Shift<arr1>; // expected to be ['a', 'b', 'c']
  // @ts-ignore
  type re2 = Shift<arr2>; // expected to be [3, 2]

  // @ts-ignore
  type cases = [
    Expect<Equal<Shift<["a", "b", "c"]>, ["b", "c"]>>,
    Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  ];
};

export const Promise_All = () => {
  type Awaited<T> = T extends Promise<infer A> ? Awaited<A> : T;
  type AwaitedArray<A extends Array<any>> = A extends [
    infer HEAD,
    ...infer TAIL
  ]
    ? [Awaited<HEAD>, ...AwaitedArray<TAIL>]
    : [];

  // @ts-ignore
  type z = Promise<AwaitedArray<[Promise<Promise<number>>, 42]>>;

  const PromiseAll = <T extends Array<any>>(
    _: readonly [...T],
  ): Promise<AwaitedArray<T>> => "LOBSTER" as any;
  // @ts-ignore
  const p = PromiseAll([
    Promise.resolve(3),
    42,
    new Promise<string>((resolve) => {
      setTimeout(resolve, 100, "foo");
    }),
  ] as const);

  type check = Expect<Equal<typeof p, Promise<[number, 42, string]>>>;

  // @ts-ignore
  const doSomething: check = 42 as any;
};
