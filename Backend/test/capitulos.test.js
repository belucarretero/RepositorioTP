const request = require('supertest');
const app = require('../index');

describe('GET /api/capitulos', function () {
  it('Devolveria todos los capitulos', async function () {
    const res = await request(app)
      .get('/api/capitulos')
      .set('content-type', 'application/json');
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodigoCapitulo: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});

describe('GET /api/capitulos/:codigoCapitulo', function () {
  it('respond with json containing a single capitulos', async function () {
    const res = await request(app).get('/api/capitulos/1000');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoCapitulo: 1000,
        Nombre: expect.any(String),
      })
    );
  });
});
