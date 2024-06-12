// probar con comando: jest ./test/actores.test.js

const request = require("supertest");
const app = require("../index");

describe("GET /api/actores", function () {
  it("Devolveria todos los actores", async function () {
    const res = await request(app)
      .get("/api/actores")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodigoAct: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/actores/:CodigoAct", function () {
  it("respond with json containing a single actores", async function () {
    const res = await request(app)
      .get("/api/actores/54328");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoAct: 54328,
        Nombre: expect.any(String),
      })
    );
  });
});
