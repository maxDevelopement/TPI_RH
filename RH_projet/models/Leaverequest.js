const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Leaverequest', {
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
      references: {
        model: 'contract',
        key: 'idContract'
      },
      field: 'fkContract'
    },
    startDdate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'StarDate'
    },
    endDate: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      {
        name: "fk_Leave_requests_Contracts1_idx",
        using: "BTREE",
        fields: [
          { name: "fkContract" },
        ]
      },
    ]
  });
};
