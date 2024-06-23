import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.min.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Importa Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Comenta o elimina esta línea si no estás usando reportWebVitals con Vite
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();