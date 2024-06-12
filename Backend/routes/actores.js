const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/actores", async function (req, res, next) {
  let data = await db.actores.findAll({
    attributes: ["CodigoAct", "Nombre"],
  });
  res.json(data);
});

router.get("/api/actores/:CodigoAct", async function (req, res, next) {
  // #swagger.tags = ['Actores']
  // #swagger.summary = 'obtiene un Actor'
  // #swagger.parameters['CodigoAct'] = { description: 'identificador del Actor...' }
  let data = await db.actores.findAll({
    attributes: ["CodigoAct", "Nombre"],
    where: { CodigoAct: req.params.CodigoAct },
  });
  if (data.length > 0 ) res.json(data[0]);
  else res.status(404).json({mensaje:'No encontrado!!'})
});



module.exports = router;
