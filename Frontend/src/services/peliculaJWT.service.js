import {config} from "../config";
import httpService from "./http.service";

//const urlResourcePeliculas = urlServidor + "/api/peliculasJWT";


const urlResource = config.urlResourcePeliculaJWT;

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.CodigoPel);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.CodigoPel);
}


async function Grabar(item) {
  if (item.CodigoPel === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.CodigoPel, item);
  }
}


export const peliculaJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};