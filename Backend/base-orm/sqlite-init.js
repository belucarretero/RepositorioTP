// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;



  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'documentales'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table documentales( 
              Codigo INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Fecha_lanzamiento text,
            );`
    );


    console.log("tabla documentales creada!");
    await db.run(
      `insert into documentales values
        (11111, 'Animales salvajes', '2021-02-18'),
        (22222, 'Animales pasivos', '2021-06-23'),
        (33333, 'La primera guerra mundial', '2021-02-22'),
        (44444, 'La vida de Hitler', '2019-05-24'),
        (55555, 'El 2001 de Argentina', '2022-02-22'),
        (66666, 'Historia Argentina', '2020-12-30'),
        (77777, 'Etapa de industrializacion', '2023-09-01'),
        (88888, 'El frio de la Antartida', '1997-08-25'),
        (99999, 'La vida de Rodrigo Bueno El Potro', '2011-02-18'),
        (12345, 'La historia del Cuarteto', '2020-06-19');`
         
    );
 }
 existe = false;
 sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'productora'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table productora( 
            CodigoProd INTEGER PRIMARY KEY AUTOINCREMENT
          , Nombre text NOT NULL UNIQUE
          , Fecha_nacimiento text
          , Activo boolean
          , Codigo integer,
           FOREIGN KEY (Codigo) REFERENCES documentales(Codigo)
          );`
  );
  console.log("tabla productora creada!");
  await db.run(
    `insert into productora values
    (1123, 'Rodrigo', '1973-05-24', 1, 11111),
    (1223, 'Ulises', '1986-05-22', 1, 22222),
    (1323, 'Cristian', '1970-05-24', 1, 33333),
    (1423, 'Damian', '1990-04-17', 1, 44444),
    (1523, 'Euguenia', '1950-12-24', 1, 55555),
    (1623, 'Magali', '1973-05-24', 1, 66666),
    (1723, 'Cristina', '2000-05-30', 1, 77777),
    (1823, 'Rufino', '1952-02-01', 1, 88888),
    (1923, 'Anabela', '1973-05-22', 99999),
    (1233, 'Vanesa', '1993-11-19', 12345);`
  );

  // Crear tabla series si no existe
  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'series'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table series(
        CodigoSerie INTEGER PRIMARY KEY AUTOINCREMENT,
        ,CodigoCapitulo integer,
        ,Nombre text NOT NULL UNIQUE,
        ,FechaEstreno text
        ,Activo boolean,
        FOREIGN KEY (CodigoCapitulo) REFERENCES capitulos(CodigoCapitulo)
      );`
    );
    console.log("tabla series creada!");
    await db.run(
      `insert into series values
        (10000, 1000, 'One Tree Hill', '2003-09-23', 1),
        (20000, 2000, 'Gilmore Girls', '2000-10-05', 1),
        (30000, 3000, 'Gossip Girl', '2007-09-19', 1),
        (40000, 4000, 'Friends', '1994-09-22', 1),
        (50000, 5000, 'Modern Family', '2009-09-23', 1),
        (60000, 6000, 'Game Of Thrones', '2011-04-17', 1),
        (70000, 7000, 'The Summer I Turned Pretty', '2022-06-17', 1),
        (80000, 8000, 'My Life With The Walter Boys', '2023-12-07', 1),
        (90000, 9000, 'Succession', '2018-06-03', 1),
        (10001, 1111, 'How I Met Your Mother', '2005-09-19', 1);`
    );

  // Crear tabla capitulos si no existe
  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'capitulos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table capitulos(
        CodigoCapitulo INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre text NOT NULL UNIQUE,
      );`
    );
    console.log("tabla capitulos creada!");
    await db.run(
      `insert into capitulos values
        (1000, 'De Repente echo de Menos a Todos'),
        (2000, 'Written In The Stars'),
        (3000, 'The Lost Boy'),
        (4000, 'El Asistente de Rachel'),
        (5000, 'Terremoto'),
        (6000, 'The Gift'),
        (7000, 'Amor perdido'),
        (8000, 'Revolutions'),
        (9000, 'Lion in the Meadow'),
        (1111, 'El Padrino');`
    );
  }
  }
}
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'actores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table actores( CodigoAct INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla actores creada!");
    await db.run(
      "insert into actores values	(54329,'John'),(54328,'Michael'),(54327,'Sarah'),(54326,'David'),(54325,'Laura'),(54324,'Simon'),(54323,'Alvaro'),(54322,'Sofia'),(54321,'Maria'),(54320,'Tobias');"
    );
  }
  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      // VER A PARTIR DE ACA
      `CREATE table peliculas( 
              CodigoPel INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , CodigoAct integer
            , Fecha_lanzamiento text
            , Activo boolean,
            FOREIGN KEY (CodigoAct) REFERENCES actores(CodigoAct)
            );`
    );
    console.log("tabla peliculas creada!");

    await db.run(
      `insert into peliculas values
      (98769,'Titanic',54329,'2017-01-19', 1 ),
      (98768,'El padrino',54328,'2017-01-31', 1 ),
      (98767,'Star Wars: Episode IV - A New Hope',54327,'2017-01-12', 1 ),
      (98766,'The Lord of the Rings: The Return of the King',54326,'2017-01-30', 1 ),
      (98765,'Avatar',54325,,'2016-12-28', 1 ),
      (98764,'Jurassic Park',54324,'2017-01-01', 1 ),
      (98763,'Los juegos del hambre',54323,'2017-02-03', 1 ),
      (98762,'El diario de una princesa',54322,'2017-01-18', 1 ),
      (98761,'Los ilusionistas',54321,'2016-12-25', 1 )
      (98760,'Misterio a Bordo',54320,'2016-12-25', 1 )
      ;`
    );
  }  
 // cerrar la base
 db.close();
  
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
