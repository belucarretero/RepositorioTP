const express = require('express');
const router = express.Router();

let arr_ActoresMock = [
  {
    CodigoAct: 54329,
    Nombre: 'John', 
  },
  {
    CodigoAct: 54328,
    Nombre: 'Michael',
  },
  {
    CodigoAct: 54327,
    Nombre: 'Sarah', 
  },
  {
    CodigoAct: 54326,
    Nombre: 'David',
   
  },
  {
    CodigoAct: 54325,
    Nombre: 'Laura', 
  },
  {
    CodigoAct: 54324,
    Nombre: 'Simon', 
  },
  {
    CodigoAct: 54323,
    Nombre: 'Alvaro', 
  },
  {
    CodigoAct: 54322,
    Nombre: 'Sofia', 
  },
  {
    CodigoAct: 54321,
    Nombre: 'Maria', 
  },
  {
    CodigoAct: 54320,
    Nombre: 'Tobias', 
  },
];

router.get('/api/actoresmock', async function (req, res) {
    res.json(arr_ActoresMock);
  });
  
  router.get('/api/actoresmock/:codigoAct', async function (req, res) {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct 
    );
    if (act) res.json(act);
    else res.status(404).json({ message: 'Actor no encontrado' });
  });
  
  router.post('/api/actoresmock/', (req, res) => {
    const { Nombre } = req.body;
    let act = {
      Nombre,
      CodigoAct: Math.floor(Math.random()*100000),
    };
  
    // aqui agregar a la coleccion
    arr_ActoresMock.push(act);
  
    res.status(201).json(act);
  });
  
  router.put('/api/actoresmock/:codigoAct', (req, res) => {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct 
    );
  
    if (act) {
      const { Nombre } = req.body;
      act.Nombre = Nombre;
      res.json({ message: 'Actor actualizado' });
    } else {
      res.status(404).json({ message: 'Actor no encontrado' });
    }
  });
  
  router.delete('/api/actoresmock/:codigoAct', (req, res) => {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct 
    );
  
    if (act) {
      arr_ActoresMock = arr_ActoresMock.filter(
        (x) => x.CodigoAct != req.params.codigoAct
      );
      res.json({ message: 'Actor eliminado' });
    } else {
      res.status(404).json({ message: 'Actor no encontrado' });
    }
  });
  
  module.exports = router;
  