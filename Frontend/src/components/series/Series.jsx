import React, { useState, useEffect } from "react";
import moment from "moment";
import SeriesBuscar from "./SeriesBuscar";
import SeriesListado from "./SeriesListado";
import SeriesRegistro from "./SeriesRegistro";
import { capitulosMockService as capitulosService } from "../../services/capitulos-mock.service";

function Series() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  //const [Capitulos, setCapitulos] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarCapitulos() {
      let data = await capitulosService.Buscar();
      setCapitulos(data);
    }
    BuscarCapitulos();
  }, []);

async function Buscar() {
    setAccionABMC("L");
    // harcodeamos 2 articulos para probar
    setItems([
      {
        CodigoSerie: 10000,
        Nombre: "One Tree Hill",
        CodigoCapitulo: 1000,
        FechaEstreno: "2003-09-23",
        Activo: true,
      },
      {
        CodigoSerie: 20000,
        Nombre: "Gilmore Girls",
        CodigoCapitulo: 2000,
        FechaEstreno: "2000-10-05",
        Activo: false,
      },
    ]);
    alert("Buscando...");
  }

  async function BuscarPorId(item, accionABMC) {
    setAccionABMC(accionABMC);
    setItem(item);
    if (accionABMC === "C") {
      alert("Consultando...");
    }
    if (accionABMC === "M") {
      alert("Modificando...");
    }
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        CodigoSerie: 10002,
        Nombre: '',
        CodigoCapitulo: 2001,
        FechaEstreno: moment(new Date()).format("YYYY-MM-DD"),
        Activo: true,
      });
    alert("preparando el Alta...");
    console.log(Item);
  }


  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      alert("Activando/Desactivando...");
    }
  }

  async function Grabar(item) {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );

    Volver();
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Series <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <SeriesBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
        />
      }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <SeriesListado
        {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
          Imprimir,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
        />
      }

        {AccionABMC === "L" && Items?.length === 0 &&  
          <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
          </div>
        }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && 
        <SeriesRegistro
          {...{ AccionABMC, Documentales, Item, Grabar, Volver }}
        />
      }
    </div>

  );
}
export { Series }; //Series completo