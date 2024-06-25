// opcion 1 cuando se hacen pruebas locales
const urlServidor = "http://localhost:5173"


// opcion 2 cuando se despliega el frontend en un servidor distinto al backend
//const urlServidor = "https://labsys.frc.utn.edu.ar/RepositorioTP-2024"
//const urlServidor = "https://RepositorioTP.azurewebsites.net"
//const urlServidor = "https://webapi.pymes.net.ar"


// opcion 3 cuando se despliega el frontend, en el mismo servidor que el backend
//const urlServidor = ""  



const urlResourceProductora = urlServidor + "/api/productora";
const urlResourceDocumentales = urlServidor + "/api/documentales";
const urlResourceProductoraJWT = urlServidor + "/api/ProductoraJWT";
const urlResourceCapitulos = urlServidor + "/api/capitulos";
const urlResourceSeries = urlServidor + "/api/series";
const urlResourceSeriesJWT = urlServidor + "/api/SeriesJWT"
const urlResourcePeliculas = urlServidor + "/api/peliculas"
const urlResourcePeliculasJWT = urlServidor + "/api/PeliculasJWT"
const urlResourceActores = urlServidor + "/api/actores"
;

//Agregar peliculasJWT

export const config = {
    urlServidor,
    urlResourceProductora,
    urlResourceDocumentales,
    urlResourceProductoraJWT,
    urlResourceCapitulos,
    urlResourceSeries,
    urlResourceSeriesJWT,
    urlResourcePeliculas,
    urlResourcePeliculasJWT,
    urlResourceActores
}


