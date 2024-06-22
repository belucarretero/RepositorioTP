import React, { useState, useEffect } from "react";
import { productoraJWTService } from "../../services/productoraJWT.service";




function ProductoraJWT() {
  const tituloPagina = "Productora JWT (solo para admintradores)";
  const [productora, setproductora] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarProductoraJWT();
  }, []);


  async function BuscarProductoraJWT() {
     try {
      let data = await productoraJWTService.Buscar();
      setProductora(data);
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
            <th style={{ width: "20%" }}>Codigo Productora</th>
            <th style={{ width: "50%" }}>Nombre</th>
            <th style={{ width: "30%" }}>Codigo Documental</th>
          </tr>
        </thead>
        <tbody>
          {productora &&
            productora.map((productora) => (
              <tr key={productora.CodigoProd}>
                <td>{productora.CodigoProd}</td>
                <td>{productora.Nombre}</td>
                <td>{productora.Codigo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
ProductoraJWT.NombreComponenteNoOfuscado = "ProductoraJWT";
export { ProductoraJWT };
