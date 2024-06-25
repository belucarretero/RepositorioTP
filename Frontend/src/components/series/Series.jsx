import React, { useState, useEffect } from "react";
import moment from "moment";
import SeriesBuscar from "./SeriesBuscar";
import SeriesListado from "./SeriesListado";
import SeriesRegistro from "./SeriesRegistro";
import { seriesService } from "../../services/series.service";
import { capitulosService } from "../../services/capitulos.service";
import modalDialogService from "../../services/modalDialog.service";

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

  const [Capitulos, setCapitulos] = useState(null);

  useEffect(() => {
    async function BuscarCapitulos() {
      let data = await capitulosService.Buscar();
      setCapitulos(data);
    }
    BuscarCapitulos();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await seriesService.Buscar(Nombre, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await seriesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item.CodigoSerie, "C");
  }

  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item.CodigoSerie, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      CodigoSerie: 0,
      Nombre: '',
      FechaEstreno: moment(new Date()).format("DD/MM/YYYY"),
      Activo: true,
    });
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (item.Activo ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await seriesService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await seriesService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      "Registro " +
      (AccionABMC === "A" ? "agregado" : "modificado") +
      " correctamente."
    );
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Series <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <SeriesBuscar
          Nombre={Nombre}
          Activo={Activo}
          setNombre={setNombre}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <SeriesListado
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
      )}

      {AccionABMC !== "L" && (
        <SeriesRegistro
          {...{
            Capitulos,
            Item,
            Grabar,
            Volver,
          }}
        />
      )}
    </div>
  );
}

export { Series };