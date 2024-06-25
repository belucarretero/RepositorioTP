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
  if (item.CodigoSerie === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.CodigoSerie, item);
  }
}

export const seriesService = {
  Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
