const request = require("supertest");
const app = require("../index");
const peliculaAlta = {
  Nombre: "Pelicula " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  CodigoAct: 54329,
  Fecha_lanzamiento: new Date().toISOString(),
  Activo: true,
};
const peliculaModificacion = {
  CodigoPel: 98769,
  Nombre: "Pelicula " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  CodigoAct: 54329,
  Fecha_lanzamiento: new Date().toISOString(),
  Activo: true,
};

// test route/pelicula GET
describe("GET /api/pelicula", () => {
  it("Deberia devolver todas las peliculas", async () => {
    const res = await request(app).get("/api/pelicula");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            CodigoPel: expect.any(Number),
            Nombre: expect.any(String),
            Fecha_lanzamiento: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/pelicula GET
describe("GET /api/pelicula con filtros", () => {
  it("Deberia devolver las peliculas según filtro ", async () => {
    const res = await request(app).get("/api/pelicula?Nombre=Titanic&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Titanic") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/pelicula/:CodigoPel GET
describe("GET /api/pelicula/:CodigoPel", () => {
  it("Deberia devolver la pelicula con el id 98769 ", async () => {
    const res = await request(app).get("/api/pelicula/98769");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoPel: expect.any(Number),
        Nombre: expect.any(String),
        CodigoAct: expect.any(Number),
        Fecha_lanzamiento: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/pelicula POST
describe("POST /api/pelicula", () => {
  it("Deberia devolver la pelicula que acabo de crear", async () => {
    const res = await request(app).post("/api/pelicula").send(peliculaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoPel: expect.any(Number),
        Nombre: expect.any(String),
        CodigoAct: expect.any(Number),
        Fecha_lanzamiento: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/pelicula/:CodigoPel PUT
describe("PUT /api/pelicula/:CodigoPel", () => {
  it("Deberia devolver la pelicula con el id 98769 modificado", async () => {
    const res = await request(app)
      .put("/api/pelicula/98769")
      .send(peliculaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/pelicula/:CodigoPel DELETE
describe("DELETE /api/pelicula/:CodigoPel", () => {
  it("Debería devolver la pelicula con el id 98769 borrado", async () => {
    const res = await request(app).delete("/api/pelicula/98769");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});
