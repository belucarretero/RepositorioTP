const request = require("supertest");
const app = require("../index");
const productoraAlta = {
  Nombre: (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Codigo: 11111,
  CodigoProd: 1123,
  Fecha_nacimiento: new Date().toISOString(),
  Activo: true,
};
const productoraModificacion = {
  Nombre: (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Codigo: 11111,
  CodigoProd: 1123,
  Fecha_nacimiento: new Date().toISOString(),
  Activo: true,
};

// test route/productora GET
describe("GET /api/productora", () => {
  it("Deberia devolver todas las productoras", async () => {
    const res = await request(app).get("/api/productora");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            CodigoProd: expect.any(Number),
            Nombre: expect.any(String),
            Fecha_nacimiento: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/productora GET
describe("GET /api/productora con filtros", () => {
  it("Deberia devolver las productoras según filtro ", async () => {
    const res = await request(app).get("/api/productora?Nombre=Rodrigo&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Rodrigo") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/productora/:codigoProd GET
describe("GET /api/productora/:codigoProd", () => {
  it("Deberia devolver la productora con el codigo 1123", async () => {
    const res = await request(app).get("/api/productora/1123");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoProd: expect.any(Number),
        Nombre: expect.any(String),
        Fecha_nacimiento: expect.any(String),
        Activo: expect.any(Boolean),
        Codigo: expect.any(Number),
      })
    );
  });
});

// test route/productora POST
describe("POST /api/productora", () => {
  it("Deberia devolver la prudctora que acabo de crear", async () => {
    const res = await request(app).post("/api/productora").send(productoraAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoProd: expect.any(Number),
        Nombre: expect.any(String),
        Fecha_nacimiento: expect.any(String),
        Activo: expect.any(Boolean),
        Codigo: expect.any(Number),
      })
    );
  });
});

// test route/productora/:codigoProd PUT
describe("PUT /api/productora/:codigoProd", () => {
  it("Deberia devolver la productora con el codigo 1123 modificado", async () => {
    const res = await request(app)
      .put("/api/productora/1123")
      .send(productoraModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/productora/:codigoProd DELETE
describe("DELETE /api/productora/:codigoProd", () => {
  it("Debería devolver la productora con el codigo 1123 borrado", async () => {
    const res = await request(app).delete("/api/productora/1123");
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
