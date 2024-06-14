import React, { useState, useEffect } from "react";
import moment from "moment";
import ProductoraBuscar from "./ProductoraBuscar";
import ProductoraListado from "./ProductoraListado";
import ProductoraRegistro from "./ProductoraRegistro";
import { documentalesMockService as documentalesService } from "../../services/documentales-mock.service";

function Productora() {
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

  const [Documentales, setDocumentales] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarDocumentales() {
      let data = await documentalesService.Buscar();
      setDocumentales(data);
    }
    BuscarDocumentales();
  }, []);

async function Buscar() {
    setAccionABMC("L");
    // harcodeamos 2 articulos para probar
    setItems([
      {
        CodigoProd: 1123,
        Nombre: "Rodrigo",
        Codigo: 11111,
        Fecha_nacimiento: "1973-05-24",
        Activo: true,
      },
      {
        CodigoProd: 1923,
        Nombre: "Anabela",
        Codigo: 99999,
        Fecha_nacimiento: "1973-05-22",
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
        CodigoProd: 1234,
        Nombre: '',
        Codigo: 23415,
        Fecha_nacimiento: moment(new Date()).format("YYYY-MM-DD"),
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
        Productora <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <ProductoraBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
        />
      }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <ProductoraListado
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
        <ProductoraRegistro
          {...{ AccionABMC, Documentales, Item, Grabar, Volver }}
        />
      }
    </div>

  );
}
export { Productora };
