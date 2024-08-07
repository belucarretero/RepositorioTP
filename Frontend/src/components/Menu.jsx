import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
function Menu() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(
      AuthService.getUsuarioLogueado()
    );
  
  
    function CambioUsuarioLogueado(_usuarioLogueado) {
      setUsuarioLogueado(_usuarioLogueado);
    }
  
  
    useEffect(() => { // Efectos secundarios (Por ejemplo solicitudes de apis)
      AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
      return () => {
        AuthService.subscribeUsuarioLogueado(null);
      }
    }, []);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
       <div className="container-fluid">
        <a className="navbar-brand">
          <i className="fa fa-film"></i>
          &nbsp;<i>Contenidos</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/documentales">
                Documentales
              </NavLink>
            </li>
            <li className="nav-item">	
              <NavLink className="nav-link" to="/productora">
                Productora
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/capitulos">
                Capitulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/serie">
                Series
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/actores">
                Actores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pelicula">
                Peliculas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" title="exclusivo para administradores" to="/productorajwt">
                Productora JWT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" title="exclusivo para administradores" to="/seriesjwt">
                Series JWT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" title="exclusivo para administradores" to="/peliculajwt">
                Peliculas JWT
              </NavLink>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Informes
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#!">
                    Lo mas visto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="#!">
                    Recomendaciones
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="#!">
                    Tu lista
                  </a>
                </li>
              </ul>
            </li>
            </ul>




            <ul className="navbar-nav ms-auto">
              {usuarioLogueado && (
                <li className="nav-item">
                  <a className="nav-link" href="#!">Bienvenido: {usuarioLogueado}</a>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login/Inicio">
                  <span
                    className={
                      usuarioLogueado ? "text-warning" : "text-success"
                    }
                  >
                    <i
                      className={
                        usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                      }
                    ></i>
                  </span>
                  {usuarioLogueado ? " Logout" : " Login"}
                </NavLink>
              </li>
            </ul>
          </div>
      </div>
  </nav>
  );
}
export {Menu};
