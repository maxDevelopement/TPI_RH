const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const JobOffer = sequelize.define('Joboffer', {
    idJobOffer: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idJobOffer'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Name'
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Place'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "pending",
      field: 'Status'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Rate'
    }
  }, {
    sequelize,
    tableName: 'JobOffer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idJobOffer" },
        ]
      },
      {
        name: "idJobOffer_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idJobOffer" },
        ]
      },
    ]
});
module.exports = JobOffer
