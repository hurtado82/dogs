const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("breed", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  });
};
