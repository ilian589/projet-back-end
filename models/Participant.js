const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Participant extends Model {}

Participant.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
        num_tel:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [10,13],
              isNumeric:true,
            },
          },
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
    },
    {
        sequelize: connection,
    }
);
module.exports = Participant;
