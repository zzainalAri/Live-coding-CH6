"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
      });
      this.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updater",
      });
      this.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "deleter",
      });
    }
  }

  Car.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Car name cannot be empty",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Car type cannot be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image: DataTypes.STRING,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );

  return Car;
};
