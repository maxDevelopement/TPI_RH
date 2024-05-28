const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Contract = sequelize.define('contracts', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'phone'
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
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Salary'
    }
  }, {
    sequelize,
    tableName: 'contracts',
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