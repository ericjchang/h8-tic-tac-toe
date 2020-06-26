'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Room extends Model {}

  Room.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        notEmpty: {
          args: true,
          msg: 'Username name cannot be empty'
        }
      }
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          args: true,
          msg: "Room is required"
        },
        notEmpty: {
          args: true,
          msg: "Room cannot be empty"
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