const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get('/api/productora', async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de artículos con filtros y paginacion

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
  const { count, rows } = await db.productora.findAndCountAll({
    attributes: [
      'CodigoProd',
      'Codigo',
      'Nombre',
      'Fecha_nacimiento',
      'Activo',
    ],
    order: [['CodigoProd', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/productora/:codigoProd', async function (req, res, next) {
  // #swagger.tags = ['Productora']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['codigoProd'] = { description: 'identificador del Articulo...' }
  let items = await db.productora.findOne({
    attributes: [
      'CodigoProd',
      'Codigo',
      'Nombre',
      'Fecha_nacimiento',
      'Activo',
    ],
    where: { CodigoProd: req.params.codigoProd },
  });
  res.json(items);
});

router.post('/api/productora/', async (req, res) => {
  // #swagger.tags = ['Productora']
  // #swagger.summary = 'agrega un Articulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Artículo',
                schema: { $ref: '#/definitions/Productora' }
    } */
  try {
    let data = await db.productora.create({
      Nombre: req.body.Nombre,
      Codigo: req.body.Codigo,
      CodigoProd: req.body.CodigoProd,
      Fecha_lanzamiento: req.body.Fecha_lanzamiento,
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

router.put('/api/productora/:codigoProd', async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/Articulos' }
    } */

  try {
    let item = await db.articulos.findOne({
      attributes: [
      'CodigoProd',
      'Codigo',
      'Nombre',
      'Fecha_nacimiento',
      'Activo',
      ],
      where: { CodigoProd: req.params.codigoProd },
    });
    if (!item) {
      res.status(404).json({ message: 'Artículo no encontrado' });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Codigo = req.body.Codigo;
    item.CodigoProd = req.body.CodigoProd;
    item.Fecha_lanzamiento = req.body.Fecha_lanzamiento;
    item.Activo = req.body.Activo;
    await item.save();

    // otra forma de hacerlo
    // let data = await db.articulos.update(
    //   {
    //     Nombre: req.body.Nombre,
    //     Precio: req.body.Precio,
    //     CodigoDeBarra: req.body.CodigoDeBarra,
    //     IdArticuloFamilia: req.body.IdArticuloFamilia,
    //     Stock: req.body.Stock,
    //     FechaAlta: req.body.FechaAlta,
    //     Activo: req.body.Activo,
    //   },
    //   { where: { IdArticulo: req.params.id } }
    // );
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

router.delete('/api/productora/:codigoProd', async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.productora.destroy({
      where: { CodigoProd: req.params.codigoProd },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE articulos SET Activo = case when Activo = 1 then 0 else 1 end WHERE CodigoProd = :CodigoProd',
        {
          replacements: { CodigoProd: +req.params.codigoProd },
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
  '/api/productoraJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
                 "bearerAuth1": []
          }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.productora.findAll({
      attributes: [
      'CodigoProd',
      'Codigo',
      'Nombre',
      'Fecha_nacimiento',
      'Activo',
      ],
      order: [['CodigoProd', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;