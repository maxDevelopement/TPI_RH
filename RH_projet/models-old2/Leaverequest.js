  const { DataTypes } = require('sequelize')
  const { sequelize } = require('../db/sequelize')
  const LeaveRequest =  sequelize.define('Leaverequest', {
    idLeaveRequest: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idLeaveRequest'
    },
    fkContract: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkContract'
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'StarDate'
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'EndDate'
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Reason'
    },
    payed: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'Payed'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "pending",
      field: 'Status'
    }
  }, {
    sequelize,
    tableName: 'leaverequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLeaveRequest" },
        ]
      },
    ]
  });

  module.exports = LeaveRequest
