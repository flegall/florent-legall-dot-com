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

  type cases = [
    Expect<Equal<Length<typeof tesla>, 4>>,
    Expect<Equal<Length<typeof spaceX>, 5>>,
  ];
};

export const Exclude = () => {
  type MyExclude<T, U> = T extends U ? never : T;

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

  type cases = [
    Expect<Equal<AwaitedRecursive<X>, string>>,
    Expect<Equal<AwaitedRecursive<Y>, { field: number }>>,
    Expect<Equal<AwaitedRecursive<Z>, boolean>>,
  ];
};

export const If = () => {
  type If<C, T, F> = C extends true ? T : F;

  type cases = [
    Expect<Equal<If<true, "a", "b">, "a">>,
    Expect<Equal<If<false, "a", 2>, 2>>,
  ];

  // @ts-expect-error
  type error = If<null, "a", "b">;
};

export const Concat = () => {
  type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

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

export const ReturnType = () => {
  type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;

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
  const fn1 = (v: boolean, w: any) => (v ? 1 : 2);
};

export const Omit = () => {
  type MyExclude<T, U> = T extends U ? never : T;
  type MyOmit<T, K extends keyof T> = {
    [k in MyExclude<keyof T, K>]: T[k];
  };

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
