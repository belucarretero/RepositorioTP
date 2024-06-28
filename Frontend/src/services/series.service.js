import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/series";

// más adelante podemos usar un archivo de configuración para el urlResource
import {config} from "../config";
const urlResource = config.urlResourceSeries;

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(CodigoSerie) {
  const resp = await httpService.get(urlResource + "/" + CodigoSerie);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.CodigoSerie);
}

async function Grabar(item) {
  if (!item.CodigoSerie || item.CodigoSerie === 0 || item.CodigoSerie > Date.now() - 10000000000) {
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
