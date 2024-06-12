const express = require("express");
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get('/api/peliculas', async function (req, res, next) {
  // #swagger.tags = ['Peliculas']
  // #swagger.summary = 'obtiene todos las Peliculas'
  // consulta de Peliculas con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== '') {
    where.Nombre = {
      [Op.like]: '%' + req.query.Nombre + '%',
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== '') {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === 'true';
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.peliculas.findAndCountAll({
    attributes: [
      'CodigoPel',
      'Nombre',
      'Fecha_lanzamiento',
      'Activo',
    ],
    order: [['Nombre', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/peliculas/:CodigoPel', async function (req, res, next) {
  // #swagger.tags = ['Peliculas']
  // #swagger.summary = 'obtiene una Pelicula'
  // #swagger.parameters['CodigoPel'] = { description: 'identificador de la Pelicula...' }
  let items = await db.Peliculas.findOne({
    attributes: [
      'CodigoPel',
      'Nombre',
      'Fecha_lanzamiento',
      'CodigoAct',
      'Activo',
    ],
    where: { CodigoPel: req.params.CodigoPel },
  });
  res.json(items);
});

router.post('/api/peliculas/', async (req, res) => {
  // #swagger.tags = ['Peliculas']
  // #swagger.summary = 'agrega una Pelicula
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva Pelicula',
                schema: { $ref: '#/definitions/Peliculas' }
    } */
  try {
    let data = await db.peliculas.create({
      Nombre: req.body.Nombre,
      Fecha_lanzamiento: req.body.Fecha_lanzamiento,
      CodigoAct: req.body.CodigoAct,
      Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach(
        (x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n')
      );
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put('/api/peliculas/:CodigoPel', async (req, res) => {
  // #swagger.tags = ['Peliculas']
  // #swagger.summary = 'actualiza una Pelicula '
  // #swagger.parameters['CodigoPel'] = { description: 'identificador de la Pelicula ...' }
  /*    #swagger.parameters['Pelicula'] = {
                in: 'body',
                description: 'Pelicula a actualizar',
                schema: { $ref: '#/definitions/Peliculas' }
    } */

  try {
    let item = await db.peliculas.findOne({
      attributes: [
        'CodigoPel',
        'Nombre',
        'Fecha_lanzamiento',
        'CodigoAct',
        'Activo',
      ],
      where: { CodigoPel: req.params.CodigoPel },
    });
    if (!item) {
      res.status(404).json({ message: 'Pelicula no encontrada' });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Fecha_lanzamiento = req.body.Fecha_lanzamiento;
    item.CodigoAct = req.body.CodigoAct;
    item.Activo = req.body.Activo;
    await item.save();

   
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => (messages += x.path + ': ' + x.message + '\n'));
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete('/api/peliculas/:CodigoPel', async (req, res) => {
  // #swagger.tags = ['peliculas']
  // #swagger.summary = 'elimina un pelicula'
  // #swagger.parameters['CodigoPel'] = { description: 'identificador de la pelicula..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.peliculas.destroy({
      where: { CodigoPel: req.params.CodigoPel },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE peliculas SET Activo = case when Activo = 1 then 0 else 1 end WHERE CodigoPel = :CodigoPel',
        {
          replacements: { CodigoPel: +req.params.CodigoPel },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  '/api/peliculasJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
                 "bearerAuth1": []
          }] */

    // #swagger.tags = ['Peliculas']
    // #swagger.summary = 'obtiene todos las Peliculas, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.peliculas.findAll({
      attributes: [
        'CodigoPel',
        'Nombre',
        'Fecha_lanzamiento',
        'CodigoAct',
        'Activo',
      ],
      order: [['Nombre', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;
