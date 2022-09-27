const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("breed",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
