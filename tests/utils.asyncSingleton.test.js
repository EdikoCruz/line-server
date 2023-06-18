import { describe, expect, test, vi } from "vitest";
import { getInstance } from "../src/utils.asyncSingleton";

describe("asyncSingleton", () => {
  test("on Success: should return value on first call", async () => {
    const key = "on Success: should return value on first call";
    const factoryFuntion = () => Promise.resolve("Success!");
    await expect(getInstance(key, factoryFuntion)).resolves.toBe("Success!");
  });
  // test("on Success: should return value from promise", async () => {
  //   const key = "on Success: should return value from promise";
  //   const factoryFuntion = () =>
  //     new Promise((res) => {
  //       setTimeout(() => res("Success!"), 100);
  //     });
  //   await expect(
  //     Promise.all([factoryFuntion(), factoryFuntion()])
  //   ).resolves.toStrictEqual(["Success!", "Success!"]);
  // });
  test("on Success: should call factoryFuntion only once", async () => {
    const key = "on Success: should call factoryFuntion only once";
    const factoryFuntion = vi.fn(() => Promise.resolve("Success!"));
    await expect(getInstance(key, factoryFuntion)).resolves.toBe("Success!");
    await expect(getInstance(key, factoryFuntion)).resolves.toBe("Success!");
    expect(factoryFuntion).toBeCalledTimes(1);
  });

  test("on Error: should return error on first call (try/catch)", async () => {
    const key = "on Error: should return error on first call (try/catch)";
    const factoryFuntion = () =>
      new Promise((res, rej) => {
        throw new Error("Error!");
      });
    await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
      "Error!"
    );
  });

  test("on Error: should return error on first call (then/catch)", async () => {
    const key = "on Error: should return error on first call (then/catch)";
    const factoryFuntion = () => Promise.reject("Error!");
    await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
      "Error!"
    );
  });

  test("on Error: should call factoryFuntion only once", async () => {
    const key = "on Error: should call factoryFuntion only once";
    const factoryFuntion = vi.fn(() => Promise.reject("Error!"));

    await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
      "Error!"
    );
    await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
      "Error!"
    );
    expect(factoryFuntion).toBeCalledTimes(1);
  });

  // describe("broken factory function", () => {

  //   test("should throw error when factoryFuntion is not a function", async () => {
  //     const factoryFuntion = "Forced";
  //     const key = "broken factory function 3";

  //     await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
  //       /must be a funtion$/
  //     );
  //   });
  // });

  // describe("cache", () => {
  //   test("should get cached promise on second call", async () => {
  //     const factoryFuntion = vi.fn(() => Promise.resolve(""));
  //     const key = "cache instance";
  //     await Promise.all([
  //       getInstance(key, factoryFuntion),
  //       getInstance(key, factoryFuntion),
  //     ]);

  //     expect(factoryFuntion).toBeCalledTimes(1);
  //   });

  //   test("should get cached error on second call", async () => {
  //     const factoryFuntion = vi.fn(() => {
  //       throw new Error("Forced");
  //     });
  //     const key = "cache error";
  //     await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
  //       "Forced"
  //     );
  //     await expect(getInstance(key, factoryFuntion)).rejects.toThrowError(
  //       "Forced"
  //     );
  //     expect(factoryFuntion).toBeCalledTimes(1);
  //   });
  // });
});
