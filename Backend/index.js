const express = require('express');

// crear servidor
const app = express();

require('./base-orm/sqlite-init'); // crea la bases de datos sino existe

app.use(express.json());

// controlar ruta
app.get('/', (req, res) => {
  res.send('Backend inicial dds-backend!');
});

const documentalesMockRouter = require('./routes/documentalesmock');
app.use(documentalesMockRouter);

const documentalesRouter = require('./routes/documentales');
app.use(documentalesRouter);

////////////////////////////////////////////////////////////////////////

const seriesRouter = require('./routes/series');
app.use(seriesRouter);

///////////////////////////////////////////////////////////////////////
const capitulosMockRouter = require('./routes/capitulosmock');
app.use(capitulosMockRouter);

const capitulosRouter = require('./routes/capitulos');
app.use(capitulosRouter);

///////////////////////////////////////////////////////////////////////

const productoraRouter = require('./routes/productora');
app.use(productoraRouter);

////////////////////////////////////////////////////////////////////////

const peliculasRouter = require('./routes/peliculas');
app.use(peliculasRouter);

////////////////////////////////////////////////////////////////////////

const actoresMockRouter = require('./routes/actoresMock');
app.use(actoresMockRouter);

const actoresRouter = require('./routes/actores');
app.use(actoresRouter);


////////////////////////////////////////////////////////////////////////

// seguridad 
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

////////////////////////////////////////////////////////////////////////

// configurar servidor
const cors = require('cors');
app.use(
  cors({
    origin: '*', // origin: 'https://Grupo-3K03-08.azurewebsites.net'
  })
);

// levantar servidor
if (!module.parent) {
  // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000; // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
}
module.exports = app; // para testing
