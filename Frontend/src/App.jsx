import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Documentales} from "./components/Documentales";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import { Productora } from "./components/productora/Productora";
function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/documentales" element={<Documentales />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
              <Route path="/produtora" element={<Productora/>} />

            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;





