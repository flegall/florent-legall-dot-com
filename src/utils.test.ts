import * as t from "io-ts";
import { ioTypeCheck } from "./utils";

const UserType = t.type({ userId: t.number, name: t.string });
const checker = ioTypeCheck(UserType);

describe("ioTypeCheck", () => {
  it("should type check a valid structure", () => {
    const inputUser: t.TypeOf<typeof UserType> = {
      userId: 1234,
      name: "florent",
    };
    const decodedUser: t.TypeOf<typeof UserType> = checker(inputUser);
    expect(decodedUser).toEqual(inputUser);
  });

  it("should not type check an invalid structure", () => {
    expect(() => {
      checker({
        userId: "1234",
        name: "1",
      });
    }).toThrowError(
      'ioTypeCheck error(s): Invalid value "1234" supplied to : { userId: number, name: string }/userId: number : value : "{"userId":"1234","name":"1"}"',
    );
  });
});
