// opcion 1 cuando se hacen pruebas locales
const urlServidor = "http://localhost:3000"


const urlResourceProductora = urlServidor + "/api/productora";
const urlResourceDocumentales = urlServidor + "/api/documentales";
const urlResourceProductoraJWT = urlServidor + "/api/ProductoraJWT";
const urlResourceCapitulos = urlServidor + "/api/capitulos";
const urlResourceSeries = urlServidor + "/api/serie";
const urlResourceSeriesJWT = urlServidor + "/api/SeriesJWT"
const urlResourcePeliculas = urlServidor + "/api/pelicula"
const urlResourcePeliculaJWT = urlServidor + "/api/PeliculaJWT"
const urlResourceActores = urlServidor + "/api/actores"
;


export const config = {
    urlServidor,
    urlResourceProductora,
    urlResourceDocumentales,
    urlResourceProductoraJWT,
    urlResourceCapitulos,
    urlResourceSeries,
    urlResourceSeriesJWT,
    urlResourcePeliculas,
    urlResourcePeliculaJWT,
    urlResourceActores
}


