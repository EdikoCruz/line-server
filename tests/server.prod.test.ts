import { describe, expect, test, vi } from "vitest";
import { viteNodeApp } from "../src/server";

vi.mock("express", () => {
  return {
    default: () => ({
      get: () => {},
      listen: vi.fn(() => {}),
    }),
  };
});

describe("SERVER", () => {
  describe("on production", () => {
    test("should call listen", () => {
      expect(viteNodeApp.listen).toHaveBeenCalled();
    });
  });
});
