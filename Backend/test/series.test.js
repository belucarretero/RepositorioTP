const request = require("supertest");
const app = require("../index");
const seriesAlta = {
  Nombre: `Serie aleatoria ${Math.floor(Math.random() * 1000)}`,
  CodigoCapitulo: 1000,
  FechaEstreno: new Date().toISOString(),
  Activo: true,
};
const seriesModificacion = {
    CodigoSerie: 10000,
    Nombre: `Serie aleatoria ${Math.floor(Math.random() * 1000)}`,
    CodigoCapitulo: 1000,
    FechaAlta: new Date().toISOString(),
    Activo: true,
};

// test route/series GET
describe("GET /api/series", () => {
  it("Deberia devolver todas las series", async () => {
    const res = await request(app).get("/api/series");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            CodigoSerie: expect.any(Number),
            Nombre: expect.any(String),
            FechaEstreno: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/series GET
describe("GET /api/series con filtros", () => {
  it("Deberia devolver las series según filtro ", async () => {
    const res = await request(app).get("/api/series?Nombre=Friends&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Friends") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/series/:codigoSerie GET
describe("GET /api/series/:codigoSerie", () => {
  it("Deberia devolver la serie con el codigo 10000", async () => {
    const res = await request(app).get("/api/series/10000");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoSerie:10000,
        Nombre: expect.any(String),
        CodigoCapitulo: expect.any(Number),
        FechaEstreno: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/series POST
describe("POST /api/series", () => {
  it("Deberia devolver la serie que acabo de crear", async () => {
    const res = await request(app).post("/api/series").send(seriesAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoSerie: expect.any(Number),
        Nombre: expect.any(String),
        CodigoCapitulo: expect.any(Number),
        FechaEstreno: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/series/:codigoSerie PUT
describe("PUT /api/series/:codigoSerie", () => {
  it("Deberia devolver la serie con el codigo 10000 modificado", async () => {
    const res = await request(app)
      .put("/api/series/10000")
      .send(seriesModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/series/:codigoSerie DELETE
describe("DELETE /api/series/:codigoSerie", () => {
  it("Debería devolver la serie con el codigo 10000 borrado", async () => {
    const res = await request(app).delete("/api/series/10000");
    expect(res.statusCode).toEqual(200);
  });
});