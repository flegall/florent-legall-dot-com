import { useMemo } from "react";
import { Type } from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import { isLeft } from "fp-ts/lib/Either";

export const ioTypeCheck = <A, O, I>(type: Type<A, O, I>) => (
  value: unknown,
): A => {
  const valueOrError = type.decode(value as any);
  if (isLeft(valueOrError)) {
    const error = new Error(
      `ioTypeCheck error(s): ${PathReporter.report(valueOrError).join(
        ",\n",
      )} : value : "${JSON.stringify(value)}"`,
    );
    throw error;
  } else {
    return valueOrError.right;
  }
};

export const useTypeChecker = <A, O, I>(
  type: Type<A, O, I>,
  data: unknown,
): A => useMemo(() => ioTypeCheck(type)(data), [data, type]);
