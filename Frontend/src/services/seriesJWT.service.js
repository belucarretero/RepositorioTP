import {config} from "../config";
import httpService from "./http.service";
const urlServidor = "https://labsys.frc.utn.edu.ar/dds-backend-2024"
const urlResourceSeries = urlServidor + "/api/seriesJWT";


const urlResource = urlResourceSeries;

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.CodigoSerie);
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


export const seriesJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
