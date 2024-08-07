// Configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/contenido.db"); 

// Definicion del modelo de datos
  
const documentales = sequelize.define(
  "documentales",
  {
    Codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
  },

  {
  hooks: {
    beforeValidate: function (documentales, options) {
      if (typeof documentales.Nombre === "string") {
        documentales.Nombre = documentales.Nombre.toUpperCase().trim();
      }
    },
  },

  timestamps: false,

  },
);
const productora = sequelize.define(
  "productoras",
  {
    CodigoProd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha de Nacimiento es requerido",
          }
        }
      },
  
    Nombre: {
        // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 30],
            msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
          },
        },
      },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Activo es requerido",
          }
        }
      },
      Codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Codigo es requerido",
          }
        }
      },
  },

  {
  hooks: {
    beforeValidate: function (productora, options) {
      if (typeof productora.Nombre === "string") {
        productora.Nombre = productora.Nombre.toUpperCase().trim();
      }
    },
  },

  timestamps: false,

  },
);

// Definiendo el modelo de la tabla series (Tabla principal)
const series = sequelize.define(
  "series",
  {
    CodigoSerie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la serie es requerido",
        },
        len: {
          args: [5, 30],
          msg: "El nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de Estreno es requerida",
        }
      }
    },
    CodigoCapitulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Código del capítulo es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
  },
  {
    // Pasar a mayúsculas solo la primera letra del nombre
    hooks: {
      beforeValidate: function (serie, options) {
        if (typeof serie.Nombre === "string") {
          serie.Nombre = serie.Nombre.charAt(0).toUpperCase() + serie.Nombre.slice(1).toLowerCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

// Definiendo el modelo de la tabla capitulos (Tabla secundaria)
const capitulos = sequelize.define(
  "capitulos",
  {
    CodigoCapitulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre del capítulo es requerido",
        },
        len: {
          args: [5, 60],
          msg: "El nombre del debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
  },
  {
    timestamps: false,
    tableName: 'capitulos'
  }
);


const pelicula = sequelize.define(
  "peliculas",
  {
    CodigoPel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la pelicula es requerido",
        },
        len: {
          args: [5, 30],
          msg: "El nombre de la pelicula debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Fecha_lanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "La fecha de Lanzamiento de la pelicula es requerido",
        }
      }
    },
    CodigoAct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El Codigo de actor es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulo, options) {
        if (typeof articulo.Nombre === "string") {
          articulo.Nombre = articulo.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


const actores = sequelize.define(
  "actores",
  {
    CodigoAct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de el actor es requerido",
        },
        len: {
          args: [5, 60],
          msg: "El nombre de el actor debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "Este Nombre ya existe en la tabla!",
      },
    },
    
  },
  {
  // pasar a mayusculas
  hooks: {
    beforeValidate: function (articulofamilia, options) {
      if (typeof articulofamilia.Nombre === "string") {
        articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase().trim();
      }
    },
  },

  timestamps: false,
}
);

//capitulos.belongsTo(series, { foreignKey: "CodigoSerie" });
//actores.belongsTo(pelicula, { foreignKey: "CodigoPel" });

module.exports = {
    sequelize,
    productora,
    documentales,
    series,
    capitulos,
    pelicula,
    actores,
  };
