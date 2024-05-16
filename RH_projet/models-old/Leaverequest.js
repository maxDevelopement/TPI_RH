const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Leaverequest', {
    id_leave_request: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idLeaveRequest'
    },
    fk_contract: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkContract'
    },
    star_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'StarDate'
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
};
