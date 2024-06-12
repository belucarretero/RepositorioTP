const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/capitulos/", async function (req, res, next) {
  let data = await db.capitulos.findAll({
    attributes: ["CodigoCapitulo", "Nombre"],
  });
  res.json(data);
});

router.get("/api/capitulos/:CodigoCapitulo", async function (req,res,next){
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'Obtiene un Capítulo'
  // #swagger.parameters ['CodigoCapitulo'] = {description: 'Identificador del Capítulo..'}
  let data = await db.capitulos.findAll({
    attributes: ["CodigoCapitulo", "Nombre"],
    where: {CodigoCapitulo: req.params.CodigoCapitulo},
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({mensaje:'No encontrado'})
});

module.exports = router;