const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Contract = sequelize.define('Contract', {
    idContract: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idContract'
    },
    fkEmployee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'idEmployee'
      },
      field: 'fkEmployee'
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Type'
    },
    service: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Service'
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Job'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'StartDate'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'EndDate'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Rate'
    },
  }, {
    sequelize,
    tableName: 'Contract',
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
      {
        name: "fk_User_Employee_idx",
        using: "BTREE",
        fields: [
          { name: "fkEmployee" },
        ]
      },
    ]
});

module.exports = Contract