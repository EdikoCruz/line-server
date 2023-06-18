import { describe, expect, test } from "vitest";
import supertest from "supertest";
import { viteNodeApp } from "../src/server";

describe("SERVER:API", () => {
  const server = supertest(viteNodeApp);

  test("It should return an a tag on GET /", async () => {
    const response = await server.get("/");
    expect(response.text.split("</a>").length).toBe(5);
  });

  describe("/lines/:line endpoint", () => {
    test("It should response 200 when :line is valid", async () => {
      const response = await server.get("/lines/1");
      expect(response.statusCode).toBe(200);
    });

    describe("when invalid", () => {
      test("It should response 413 when :line is beyond EOF", async () => {
        const response = await server.get("/lines/10000");
        expect(response.statusCode).toBe(413);
      });
      test("It should response 413 when :line is not a number", async () => {
        const response = await server.get("/lines/abc");
        expect(response.statusCode).toBe(413);
      });
    });

    test("It should response 500 on server runtime error", async () => {
      const response = await server.get("/lines/-1");
      expect(response.statusCode).toBe(500);
    });
  });
});
