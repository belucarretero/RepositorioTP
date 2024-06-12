const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get("/api/series", async function (req, res, next) {
  // #swagger.tags = ['Series']
  // #swagger.summary = 'obtiene todos las series'
  // Consulta de series con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== '') {
    where.Nombre = {
      [Op.like]: '%' + req.query.Nombre + '%',
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== '') {
    // True o false en el modelo, en base de datos es 1 o 0
    // Convertir el string a booleano
    where.Activo = req.query.Activo === 'true';
  }

  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.series.findAndCountAll({
    attributes: [
      'CodigoSerie',
      'Nombre',
      'FechaEstreno',
      'Activo',
    ],
    order: [['Nombre', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/series/CodigoSerie:', async function (req, res, next) {
  // #swagger.tags = ['Series']
  // #swagger.summary = 'Obtiene una serie'
  // #swagger.parameters['codigoSerie'] = { description: 'identificador de la serie...' }

  let items = await db.series.findOne({
    attributes: [
      'CodigoSerie',
      'Nombre',
      'FechaEstreno',
      'CodigoCapitulo',
      'Activo',
    ],
    where: { CodigoSerie: req.params.codigoSerie },
  });
  res.json(items);
});

router.post('/api/series/', async (req, res) => {
  // #swagger.tags = ['Series']
  // #swagger.summary = 'Agrega una serie'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva serie',
                schema: { $ref: '#/definitions/Series' }
    } */

  try {
    let data = await db.series.create({
      Nombre: req.body.Nombre,
      FechaEstreno: req.body.FechaEstreno,
      CodigoCapitulo: req.body.CodigoCapitulo,
      Activo: req.body.Activo
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

router.put('/api/series/:codigoSerie', async (req, res) => {
  // #swagger.tags = ['Series']
  // #swagger.summary = 'actualiza una serie'
  // #swagger.parameters['codigoCapitulo'] = { description: 'identificador de la serie...' }
  /*    #swagger.parameters['Series'] = {
                in: 'body',
                description: 'Series a actualizar',
                schema: { $ref: '#/definitions/Series' }
    } */

  try {
    let item = await db.series.findOne({
      attributes: [
      'CodigoSerie',
      'Nombre',
      'FechaEstreno',
      'CodigoCapitulo',
      'Activo',
      ],
      where: { CodigoSerie: req.params.codigoSerie},
    });
    if (!item) {
      res.status(404).json({ message: 'Serie no encontrada' });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaEstreno = req.body.FechaEstreno;
    item.CodigoCapitulo = req.body.CodigoCapitulo;
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

router.delete('/api/series/:codigoSerie', async (req, res) => {
  // #swagger.tags = ['Series']
  // #swagger.summary = 'elimina una serie'
  // #swagger.parameters['codigoSerie'] = { description: 'identificador de la serie..' }


  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.series.destroy({
      where: { CodigoSerie: req.params.codigoSerie },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE series SET Activo = case when Activo = 1 then 0 else 1 end WHERE CodigoSerie = :CodigoSerie',
        {
          replacements: { CodigoSerie: +req.params.codigoSerie },
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
  '/api/seriesJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
                 "bearerAuth1": []
          }] */

    // #swagger.tags = ['Series']
    // #swagger.summary = 'obtiene todos las series, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.series.findAll({
      attributes: [
      'CodigoSerie',
      'Nombre',
      'FechaEstreno',
      'CodigoCapitulo',
      'Activo',
      ],
      order: [['Nombre', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;
