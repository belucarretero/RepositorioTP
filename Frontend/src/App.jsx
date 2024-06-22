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
import { Series } from "./components/series/Series";
import { Actores } from "./components/Actores";
import { Peliculas } from "./components/peliculas/Peliculas";
import { ProductoraJWT } from "./components/productoraJWT/ProductoraJWT";
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
              <Route path="/login/:componentFrom" element={<Login />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />

              <Route path="/series" element={<Series/>} />
              <Route path="/actores" element={<Actores />} />
              <Route path="/peliculas" element={<Peliculas />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;





