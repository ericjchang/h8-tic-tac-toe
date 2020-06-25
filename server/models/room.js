'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Room extends Model {}

  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Room name already exists'
      },
      validate: {
        len: {
          args: [4, 12],
          msg: 'Room name must be between 4 and 12 characters'
        },
        notNull: {
          args: true,
          msg: 'Room is required'
        },
        notEmpty: {
          args: true,
          msg: 'Room name cannot be empty'
        }
      }
    },
    players: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Username is required"
        },
        notEmpty: {
          args: true,
          msg: "Username is required"
        }
      }
    },
    row: {
      type: DataTypes.STRING
    },
    column: {
      type: DataTypes.STRING
    }
  }, {
    sequelize, 
    modelName: 'Room'
  });
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};