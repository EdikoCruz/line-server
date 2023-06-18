import { describe, expect, test } from "vitest";
import { getByFilePath } from "../src/fileModel";

describe("index model", () => {
  test("should throw error when path is invalid", async () => {
    await expect(
      getByFilePath("./files/lorem_ipsum2.txt")
    ).rejects.toThrowError(
      "NOENT: no such file or directory, open './files/lorem_ipsum2.txt'"
    );
  });
});
