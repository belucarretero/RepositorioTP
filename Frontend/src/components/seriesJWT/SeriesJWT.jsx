import React, { useState, useEffect } from "react";
import { seriesJWTService } from "../../services/seriesJWT.service";



function SeriesJWT() {
  const tituloPagina = "Series JWT (solo para administradores)";
  const [series, setseries] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarSeriesJWT();
  }, []);


  async function BuscarSeriesJWT() {
     try {
      let data = await seriesJWTService.Buscar();
      setseries(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
    }
  }




  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Codigo Serie</th>
            <th style={{ width: "50%" }}>Nombre</th>
            <th style={{ width: "30%" }}>Codigo Capitulo</th>
          </tr>
        </thead>
        <tbody>
          {series &&
            series.map((series) => (
              <tr key={series.CodigoSerie}>
                <td>{series.CodigoSerie}</td>
                <td>{series.Nombre}</td>
                <td>{series.CodigoCapitulo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
SeriesJWT.NombreComponenteNoOfuscado = "SeriesJWT";
export { SeriesJWT };
