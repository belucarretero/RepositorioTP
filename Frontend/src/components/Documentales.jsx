import React, {useState, useEffect} from 'react';
import { documentalesMockService } from '../services/documentales-mock.service';
function Documentales() {
  const tituloPagina = 'Documentales';
  const [documentales, setDocumentales] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  async function BuscarArticulosFamilas() {
    let data = await documentalesMockService.Buscar();
    setDocumentales(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Codigo</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {documentales &&
            documentales.map((documental) => (
              <tr key={documental.Codigo}>
                <td>{documental.Codigo}</td>
                <td>{documental.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

}


export {Documentales};
