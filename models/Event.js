const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Event extends Model {}

Event.init(
  {
    lieu:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    titre_event:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    date_event:{
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
      isDate:true,
      },
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



module.exports = Event;
