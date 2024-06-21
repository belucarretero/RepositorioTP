import arrayActores from '../datos-mock/actores-mock';
async function Buscar() {
     return arrayActores;
}
async function BuscarPorId(CodigoAct) {
      return arrayActores.find((actores) => actores.CodigoAct === CodigoAct);
}
async function Agregar(actores) {
    actores.CodigoAct = arrayActores.length + 1;  // simula autoincremental
    arrayActores.push(actores);
}
async function Modificar(actores) {
    let actoresEncontrado = arrayActores.find((actoresfind) => actoresfind.CodigoAct === actores.CodigoAct);
    if (actoresEncontrado) {
        actoresEncontrado.Nombre = actores.Nombre;
    }
}
async function Eliminar(CodigoAct){
    let actoresEncontrado = arrayActores.find((actoresfind) => actoresfind.CodigoAct === CodigoAct);
    if (actoresEncontrado) {
        arrayActores.splice(arrayActores.indexOf(actoresEncontrado), 1);
    }
}
export const actoresMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};