import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Contenidos</h1>
      <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        múltiples capas en Javascript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, Javascript, NodeJs y React.
      </p>
      <Link to="/documentales" className="btn btn-lg btn-primary me-3">
        <i className="fa fa-search me-2"></i> Ver Documentales
      </Link>
      <Link to="/actores" className="btn btn-lg btn-primary me-3">
        <i className="fa fa-search me-2"></i> Ver Actores
      </Link>
      <Link to="/capitulos" className="btn btn-lg btn-primary me-3">
        <i className="fa fa-search me-2"></i> Ver Capitulos
      </Link>
    </div>
  );
}

export { Inicio };
