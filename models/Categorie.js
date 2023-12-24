const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Categorie extends Model {}

Categorie.init(
  {
    cate_nom:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    sequelize: connection,
  }
);



module.exports = Categorie;