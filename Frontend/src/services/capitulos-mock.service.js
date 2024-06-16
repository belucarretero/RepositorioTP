import arrayCapitulos from '../datos-mock/capitulos-mock';
async function Buscar() {
     return arrayCapitulos;
}
async function BuscarPorId(CodigoCapitulo) {
  return arrayCapitulos.find((capitulo) => capitulo.CodigoCapitulo === CodigoCapitulo);
}

async function Agregar(capitulo) {
  capitulo.CodigoCapitulo = arrayCapitulos.length + 1;  // simula autoincremental
    arrayCapitulos.push(capitulo);
}
async function Modificar(capitulo) {
    let capituloEncontrado = arrayCapitulos.find((capitulofind) => capitulofind.CodigoCapitulo === capitulo.CodigoCapitulo);
    if (capituloEncontrado) {
      capituloEncontrado.Nombre = capitulo.Nombre;
    }
}
async function Eliminar(CodigoCapitulo){
    let capituloEncontrado = arrayCapitulos.find((capitulofind) => capitulofind.CodigoCapitulo === CodigoCapitulo);
    if (capituloEncontrado) {
        arrayCapitulos.splice(arrayCapitulos.indexOf(capituloEncontrado), 1);
        //arrayCapitulos.indexOf(capituloEncontrado) me da la pos
        // del elemento y el ,1) que solo se elimina un elemento a partir
        //de esa pos, lo elimino por que uso el .splice
    }
}
export const capitulosMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};