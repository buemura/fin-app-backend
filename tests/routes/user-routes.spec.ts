import request from "supertest";
import express from "express";

describe("GET /api/users/:userId", () => {
  const app = express();

  it("should return user details", () => {
    request(app).get("/api/user/1").expect(200);
  });
});
