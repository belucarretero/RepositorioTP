import axios from "axios";

//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/actores";
import {config} from "../config";
const urlResource = config.urlResourceActores;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const actoresService = {
  Buscar
};
