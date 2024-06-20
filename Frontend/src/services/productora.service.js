import axios from "axios";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/articulos";
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}
async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.CodigoProd);
  return resp.data;
}
async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.CodigoProd);
}
async function Grabar(item) {
  if (item.CodigoProd === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.CodigoProd, item);
  }
}
export const productoraService = { Buscar,BuscarPorId,ActivarDesactivar,Grabar
};

