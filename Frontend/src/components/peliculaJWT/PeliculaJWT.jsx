import React, { useState, useEffect } from "react";
import { peliculaJWTService } from "../../services/peliculaJWT.service";



function PeliculaJWT() {
  const tituloPagina = "Peliculas JWT (solo para administradores)";
  const [peliculas, setpeliculas] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarPeliculaJWT();
  }, []);


  async function BuscarPeliculaJWT() {
     try {
      let data = await peliculaJWTService.Buscar();
      setpeliculas(data);
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
            <th style={{ width: "20%" }}>Codigo Pelicula</th>
            <th style={{ width: "50%" }}>Nombre</th>
            <th style={{ width: "30%" }}>Codigo Actor</th>
          </tr>
        </thead>
        <tbody>
          {peliculas &&
            peliculas.map((peliculas) => (
              <tr key={peliculas.CodigoPel}>
                <td>{peliculas.CodigoPel}</td>
                <td>{peliculas.Nombre}</td>
                <td>{peliculas.CodigoAct}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
PeliculaJWT.NombreComponenteNoOfuscado = "PeliculaJWT";
export { PeliculaJWT };