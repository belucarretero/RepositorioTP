import React, {useState, useEffect} from 'react';
import { capitulosMockService } from '../services/capitulos-mock.service';
function Capitulos() {
  const tituloPagina = 'Capitulos';
  const [capitulos, setCapitulos] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => { // CAMBIAR NOMBRE
    BuscarCapitulos();
  }, []);
  async function BuscarCapitulos() {
    let data = await capitulosMockService.Buscar();
    setCapitulos(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>CodigoCapitulo</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {capitulos &&
            capitulos.map((capitulo) => (
              <tr key={capitulo.CodigoCapitulo}>
                <td>{capitulo.CodigoCapitulo}</td>
                <td>{capitulo.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

}


export {Capitulos};