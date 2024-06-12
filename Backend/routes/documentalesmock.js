const express = require('express');
const router = express.Router();

let arr_DocumentalesMock = [
  {
    Codigo: 11111,
    Nombre: 'Animales salvajes',
    Fecha_lanzamiento: '2021-02-18',
  },
  {
    Codigo: 22222,
    Nombre: 'Animales pasivos',
    Fecha_lanzamiento: '2021-06-23',
  },
  {
    Codigo: 33333,
    Nombre: 'La primera guerra mundial',
    Fecha_lanzamiento: '2021-02-22',
  },
  {
    Codigo: 44444,
    Nombre: 'La vida de Hitler',
    Fecha_ingreso: '2019-05-24',
  },
  {
    Codigo: 55555,
    Nombre: 'El 2001 de Argentina',
    Fecha_lanzamiento: '2022-02-22',
  },
  {
    Codigo: 66666,
    Nombre: 'Historia Argentina',
    Fecha_lanzamiento: '2020-12-30',
  },
  {
    Codigo: 77777,
    Nombre: 'Etapa de industrializacion',
    Fecha_lanzamiento: '2023-09-01',
  },
  {
    Codigo: 88888,
    Nombre: 'El frio de la Antartida',
    Fecha_lanzamiento: '1997-08-25',
  },
  {
    Codigo: 99999,
    Nombre: 'La vida de Rodrigo Bueno El Potro',
    Fecha_lanzamiento: '2011-02-18',
  },
  {
    Codigo: 12345,
    Nombre: 'La historia del Cuarteto',
    Fecha_lanzamiento: '2020-06-19',
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
