import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/series";


import {config} from "../config";
const urlResource = config.urlResourceSeries;

// Funciones exportadas para ser usadas en el componente Serie.jsx, Buscar, BuscarPorId, ActivarDesactivar y Grabar

// Función para buscar series
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}
// Función para buscar series por Id (Útil en consultar y modificar)
async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.CodigoSerie);
  return resp.data;
}
// Función para activar o desactivar series
async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.CodigoSerie);
}
// Función para grabar series (Agregar o Modificar)
async function Grabar(item) {
  if (item.CodigoSerie === 0 ) {
    // Si es una nueva serie o tiene un CodigoSerie temporal
    delete item.CodigoSerie; // Eliminamos el CodigoSerie temporal
    const resp = await httpService.post(urlResource, item);
    return resp.data; // Devolvemos la respuesta del servidor que debería incluir el nuevo CodigoSerie
  } else {
    // Si es una serie existente
    await httpService.put(`${urlResource}/${item.CodigoSerie}`, item);
  }
}

export const seriesService = {
  Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
