const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get('/api/serie', async function (req, res, next) {
  
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
  const { count, rows } = await db.series.findAndCountAll({
    attributes: [
      'CodigoSerie',
      'Nombre',
      'FechaEstreno',
      'Activo',
    ],
    order: [['CodigoSerie', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/serie/:codigoSerie', async function (req, res, next) { 
    console.log(req.params.nombre);
  let items = await db.series.findOne({
    attributes: [
      'CodigoSerie',
      'CodigoCapitulo',
      'Nombre',
      'FechaEstreno',
      'Activo',
    ],
    where: { CodigoSerie: req.params.codigoSerie },
  });
  res.json(items);
});

router.post('/api/serie/', async (req, res) => {

  try {
    let data = await db.series.create({
      Nombre: req.body.Nombre,
      CodigoSerie: req.body.CodigoSerie,
      FechaEstreno: req.body.FechaEstreno,
      CodigoCapitulo: req.body.CodigoCapitulo,
      Activo: req.body.Activo
    });
    res.status(200).json(data.dataValues); // Devolvemos el registro agregado!
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

router.put('/api/serie/:codigoSerie', async (req, res) => {

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
    item.CodigoSerie = req.body.CodigoSerie;
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

router.delete('/api/serie/:codigoSerie', async (req, res) => {
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
      // Ordenar según Código de Serie
      order: [['CodigoSerie', 'ASC']],
    });
    res.json(items);
  }
);


module.exports = router;