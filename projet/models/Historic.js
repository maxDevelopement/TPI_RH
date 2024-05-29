const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Historic = sequelize.define('historics', {
    idHistoric: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idHistoric'
    },
    fkEmployee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'FkEmployee'
    },
    service: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Service'
    },
    startDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'StartDate'
    },
    endDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'EndDate'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Rate'
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Job'
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Salary'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Email'
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'Phone'
    }, 
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Type'
    }
  }, {
    sequelize,
    tableName: 'historics',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idHistoric" },
        ]
      },
      {
        name: "fk_Historic_Contracts1_idx",
        using: "BTREE",
        fields: [
          { name: "FkContract" },
        ]
      },
    ]
});
module.exports = Historic
