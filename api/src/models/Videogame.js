const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
    released: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {min: 0, max: 5}
    },
    background_image: DataTypes.STRING(1500)
  }, {timestamps: false});
//platforms[].platform.name
  sequelize.define('platform', {
    name: {
      type: DataTypes.STRING
    }
  }, {tableName: 'platform', timestamps: false})

  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING
    }
  }, {
        tableName: 'genres',
        timestamps: false
    })
};
