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
    fk_employee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'idEmployee'
      },
      field: 'fkEmployee'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Type'
    },
    start_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'StartDate'
    },
    end_date: {
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