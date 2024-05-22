const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Contract = sequelize.define('Contract', {
  id_contract: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'idContract'
  },
  fkEmployee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fkEmployee'
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Type'
  },
  startDate: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'StartDate'
  },
  endDate: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'EndDate'
  }
}, {
  sequelize,
  tableName: 'contract',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idContract" },
      ]
    },
  ]
})
module.exports = Contract
