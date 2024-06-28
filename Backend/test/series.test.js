const request = require("supertest");
const app = require("../index");
const seriesAlta = {
  Nombre: (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  CodigoSerie: null,
  CodigoCapitulo: 1000,
  FechaEstreno: new Date().toISOString(),
  Activo: true,
};
const seriesModificacion = {
    Nombre: (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    CodigoSerie: null,
    CodigoCapitulo: 1000,
    FechaEstreno: new Date().toISOString(),
    Activo: true,
};

// test route/series GET
describe("GET /api/serie", () => {
  it("Deberia devolver todas las series", async () => {
    const res = await request(app).get("/api/serie");
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
describe("GET /api/serie con filtros", () => {
  it("Deberia devolver las series según filtro ", async () => {
    const res = await request(app).get("/api/serie?Nombre=Friends&Activo=true&Pagina=1");
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

// test route/serie/:codigoSerie GET
describe("GET /api/serie/:codigoSerie", () => {
  it("Deberia devolver la serie con el codigo 10000", async () => {
    const res = await request(app).get("/api/serie/10000");
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

// test route/series POST
describe("POST /api/serie", () => {
  it("Deberia devolver la serie que acabo de crear", async () => {
    const res = await request(app).post("/api/serie").send(seriesAlta);
    console.log(res.body); // Añade esta línea
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
describe("PUT /api/serie/:codigoSerie", () => {
  it("Deberia devolver la serie con el codigo 10000 modificado", async () => {
    const res = await request(app)
      .put("/api/serie/10000")
      .send(seriesModificacion);
    console.log(res.body); // Añade esta línea
    expect(res.statusCode).toEqual(204);
  });
});

// test route/series/:codigoSerie DELETE
describe("DELETE /api/serie/:codigoSerie", () => {
  it("Debería devolver la serie con el codigo 10000 borrado", async () => {
    const res = await request(app).delete("/api/serie/10000");
    expect(res.statusCode).toEqual(200);
  });
});