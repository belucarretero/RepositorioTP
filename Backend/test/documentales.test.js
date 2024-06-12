const request = require('supertest');
const app = require('../index');

describe('GET /api/documentales', function () {
  it('Devolveria todos los documentales', async function () {
    const res = await request(app)
      .get('/api/documentales')
      .set('content-type', 'application/json');
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Codigo: expect.any(Number),
          CodigoProd: expect.any(Number),
          Nombre: expect.any(String),
          Fecha_lanzamiento: expect.any(String),
        }),
      ])
    );
  });
});

describe('GET /api/documentales/:codigo', function () {
  it('respond with json containing a single documentales', async function () {
    const res = await request(app).get('/api/documentales/11111');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Codigo: 11111,
        CodigoProd: 1123,
        Nombre: expect.any(String),
        Fecha_lanzamiento: expect.any(String),
      })
    );
  });
});
