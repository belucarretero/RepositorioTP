const express = require('express');
const router = express.Router();

let arr_CapitulosMock = [
  {
    CodigoCapitulo: 1000,
    Nombre: 'De Repente echo de Menos a Todos',
  },
  {
    CodigoCapitulo: 2000,
    Nombre: 'Written In The Stars',
  },
  {
    CodigoCapitulo: 3000,
    Nombre: 'The Lost Boy',
  },
  {
    CodigoCapitulo: 4000,
    Nombre: 'El Asistente de Rachel',
  },
  {
    CodigoCapitulo: 5000,
    Nombre: 'Terremoto',
  },
  {
    CodigoCapitulo: 6000,
    Nombre: 'The Gift',
  },
  {
    CodigoCapitulo: 7000,
    Nombre: 'Amor perdido',
  },
  {
    CodigoCapitulo: 8000,
    Nombre: 'Revolutions',
  },
  {
    CodigoCapitulo: 9000,
    Nombre: 'Lion in the Meadow',
  },
  {
    CodigoCapitulo: 1111,
    Nombre: 'El Padrino',
  },
];

router.get('/api/capitulosmock', async function (req, res) {
  res.json(arr_CapitulosMock);
});

router.get('/api/capitulosmock/:codigoCapitulo', async function (req, res) {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo == req.params.codigoCapitulo
  );
  if (cap) res.json(cap);
  else res.status(404).json({ message: 'Capitulo no encontrado' });
});

router.post('/api/capitulosmock/', (req, res) => {

  const { Nombre } = req.body;

  let cap = {
    Nombre,
    CodigoCapitulo: Math.floor(1000 + Math.random() * 9000),
  };

  // aqui agregar a la coleccion
  arr_CapitulosMock.push(cap);

  res.status(201).json(cap);
});

router.put('/api/capitulosmock/:codigoCapitulo', (req, res) => {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo== req.params.codigoCapitulo
  );

  if (cap) {
    const { Nombre } = req.body;
    cap.Nombre = Nombre;
    res.json({ message: 'Capitulo actualizado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

router.delete('/api/capitulosmock/:codigoCapitulo', (req, res) => {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo == req.params.codigoCapitulo
  );

  if (cap) {
    arr_CapitulosMock = arr_CapitulosMock.filter(
      (x) => x.CodigoCapitulo == req.params.codigoCapitulo
    );
    res.json({ message: 'Capitulo eliminado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

module.exports = router;