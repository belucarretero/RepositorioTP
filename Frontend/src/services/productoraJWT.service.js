import {config} from "../config";
import httpService from "./http.service";
const urlServidor = "https://labsys.frc.utn.edu.ar/dds-backend-2024"
const urlResourceProductora = urlServidor + "/api/productoraJWT";




const urlResource = urlResourceProductora;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.CodigoProd);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.CodigoProd);
}


async function Grabar(item) {
  if (item.CodigoProd === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.CodigoProd, item);
  }
}


export const productoraJWTService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
