import {config} from "../config";
import httpService from "./http.service";
const urlServidor = "https://labsys.frc.utn.edu.ar/dds-backend-2024"
const urlResourcePeliculas = urlServidor + "/api/peliculasJWT";


const urlResource = urlResourcePeliculas;

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


export const peliculasJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};