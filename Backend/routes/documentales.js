const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/documentales", async function (req, res, next) {
  let data = await db.documentales.findAll({
    attributes: ["Codigo", "CodigoProd", "Nombre", "Fecha_lanzamiento"],
  });
  res.json(data);
});

module.exports = router;
