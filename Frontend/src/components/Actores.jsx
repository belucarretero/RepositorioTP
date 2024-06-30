import React, {useState, useEffect, act} from 'react';
import { actoresMockService } from '../services/actores-mock.service';
function Actores() {
  const tituloPagina = 'Actores';
  const [actores, setActores] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => { 
    BuscarActores();
  }, []);
  async function BuscarActores() {
    let data = await actoresMockService.Buscar();
    setActores(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>CodigoAct</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {actores &&
            actores.map((actores) => (
              <tr key={actores.CodigoAct}>
                <td>{actores.CodigoAct}</td>
                <td>{actores.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

}


export {Actores};