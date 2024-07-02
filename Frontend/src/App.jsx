import "./App.css";
import { ModalDialog } from "./components/ModalDialog";
//import modalDialogService from "../../services/modalDialog.service";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Documentales} from "./components/Documentales";
import {Capitulos} from "./components/Capitulos";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import { Productora } from "./components/productora/Productora";
import { Serie } from "./components/series/Serie";
import { Actores } from "./components/Actores";
import { Pelicula } from "./components/peliculas/Pelicula";
import { PeliculaJWT } from "./components/peliculaJWT/PeliculaJWT";
import { ProductoraJWT } from "./components/productoraJWT/ProductoraJWT";
import { SeriesJWT } from "./components/seriesJWT/SeriesJWT";
import {RequireAuth} from "./components/RequiereAuth" ;
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
      <ModalDialog/>
        <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/documentales" element={<Documentales />} />
              <Route path="/capitulos" element={<Capitulos />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
              <Route path="/productora" element={<Productora/>} />

              <Route
                path="/productorajwt"
                element={
                  <RequireAuth>
                    <ProductoraJWT />
                  </RequireAuth>
                }
              />
              <Route
                path="/seriesjwt"
                element={
                  <RequireAuth>
                    <SeriesJWT />
                  </RequireAuth>
                }
              />
              <Route
                path="/peliculajwt"
                element={
                  <RequireAuth>
                    <PeliculaJWT />
                  </RequireAuth>
                }
              />
              <Route path="/login/:componentFrom" element={<Login />} />
              <Route path="/serie" element={<Serie/>} />
              <Route path="/actores" element={<Actores />} />
              <Route path="/pelicula" element={<Pelicula />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;





