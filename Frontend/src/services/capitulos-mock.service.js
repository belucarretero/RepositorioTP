import arrayCapitulos from '../datos-mock/capitulos-mock';
async function Buscar() {
     return arrayCapitulos;
}
async function BuscarPorId(CodigoCapitulo) {
  return arrayCapitulos.find((capitulos) => capitulos.CodigoCapitulo === CodigoCapitulo);
}

async function Agregar(capitulos) {
  capitulos.CodigoCapitulo = arrayCapitulos.length + 1;  // simula autoincremental
  arrayCapitulos.push(capitulos);
}

async function Modificar(capitulos) {
    let capitulosEncontrado = arrayCapitulos.find((capitulosfind) => capitulosfind.CodigoCapitulo === capitulos.CodigoCapitulo);
    if (capitulosEncontrado) {
      capitulosEncontrado.Nombre = capitulos.Nombre;
    }
}
async function Eliminar(CodigoCapitulo){
    let capitulosEncontrado = arrayCapitulos.find((capitulosfind) => capitulosfind.CodigoCapitulo === CodigoCapitulo);
    if (capitulosEncontrado) {
        arrayCapitulos.splice(arrayCapitulos.indexOf(capitulosEncontrado), 1);
        //arrayCapitulos.indexOf(capituloEncontrado) me da la pos
        // del elemento y el ,1) que solo se elimina un elemento a partir
        //de esa pos, lo elimino por que uso el .splice
    }
}
export const capitulosMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};