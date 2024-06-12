import arrayDocumentales from '../datos-mock/documentales-mock';


function Documentales() {
  const documentales = arrayDocumentales;
  const tituloPagina = 'Documentales';

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Codigo</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {documentales &&
            documentales.map((documental) => (
              <tr key={documental.Codigo}>
                <td>{documental.Codigo}</td>
                <td>{documental.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

}


export { Documentales };
