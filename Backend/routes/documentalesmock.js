const express = require('express');
const router = express.Router();

let arr_DocumentalesMock = [
  {
    Codigo: 11111,
    Nombre: 'Animales salvajes',
  },
  {
    Codigo: 22222,
    Nombre: 'Animales pasivos',

  },
  {
    Codigo: 33333,
    Nombre: 'La primera guerra mundial',

  },
  {
    Codigo: 44444,
    Nombre: 'La vida de Hitler',

  },
  {
    Codigo: 55555,
    Nombre: 'El 2001 de Argentina',

  },
  {
    Codigo: 66666,
    Nombre: 'Historia Argentina',

  },
  {
    Codigo: 77777,
    Nombre: 'Etapa de industrializacion',

  },
  {
    Codigo: 88888,
    Nombre: 'El frio de la Antartida',

  },
  {
    Codigo: 99999,
    Nombre: 'La vida de Rodrigo Bueno El Potro',
  },
  {
    Codigo: 12345,
    Nombre: 'La historia del Cuarteto',
  },
];

router.get('/api/documentalesmock', async function (req, res) {
  res.json(arr_DocumentalesMock);
});

router.get('/api/documentalesmock/:codigo', async function (req, res) {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo);
  if (docu) res.json(docu);
  else res.status(404).json({ message: 'documental no encontrado' });
});

router.post('/api/documentalesmock/', (req, res) => {
  const { Nombre, FechaLanzamiento } = req.body;
  let docu = {
    Nombre,
    FechaLanzamiento, 
    Codigo: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_DocumentalesMock.push(docu);

  res.status(201).json(docu);
});

router.put('/api/documentalesmock/:codigo', (req, res) => {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo);

  if (docu) {
    const { Nombre } = req.body;
    docu.Nombre = Nombre;
    res.json({ message: 'documento actualizado' });
  } else {
    res.status(404).json({ message: 'documento no encontrado' });
  }
});

router.delete('/api/documentalesmock/:codigo', (req, res) => {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo);

  if (docu) {
    arr_DocumentalesMock = arr_DocumentalesMock.filter(
      (x) => x.Codigo != req.params.codigo
    );
    res.json({ message: 'documento eliminado' });
  } else {
    res.status(404).json({ message: 'documento no encontrado' });
  }
});

module.exports = router;
