import { describe, expect, test } from "vitest";
import supertest from "supertest";
import { viteNodeApp } from "../src/server";

describe("SERVER:API", () => {
  const server = supertest(viteNodeApp);

  test("It should return an a tag on GET /", async () => {
    const response = await server.get("/");
    expect(response.text).toBe('<a href="/lines/1">api</a>');
  });
});
