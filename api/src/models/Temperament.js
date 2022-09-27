const { DataTypes, Sequelize, BulkRecordError } = require("sequelize")
const { Breed } = require("./Breed")

module.exports = (sequelize) => {
  sequelize.define("temperament",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
