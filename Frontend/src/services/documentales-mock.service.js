import arrayDocumentales from '../datos-mock/documentales-mock';
async function Buscar() {
     return arrayDocumentales;
}
async function BuscarPorId(Codigo) {
  return arrayDocumentales.find((documental) => documental.Codigo === Codigo);
}

async function Agregar(documental) {
  documental.Codigo = arrayDocumentales.length + 1;  // simula autoincremental
    arrayDocumentales.push(documental);
}
async function Modificar(documental) {
    let documentalEncontrado = arrayDocumentales.find((documentalfind) => documentalfind.Codigo === documental.Codigo);
    if (documentalEncontrado) {
      documentalEncontrado.Nombre = documental.Nombre;
    }
}
async function Eliminar(Codigo){
    let documentalEncontrado = arrayDocumentales.find((documentalfind) => documentalfind.Codigo === Codigo);
    if (documentalEncontrado) {
        arrayDocumentales.splice(arrayDocumentales.indexOf(documentalEncontrado), 1);
        //arrayDocumentales.indexOf(documentalEncontrado) me da la pos
        // del elemento y el ,1) que solo se elimina un elemento a partir
        //de esa pos, lo elimino por que uso el .splice
    }
}
export const documentalesMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
