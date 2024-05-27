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
    fkContract: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contract',
        key: 'idContract'
      },
      field: 'fkContract'
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
          { name: "fkContract" },
        ]
      },
    ]
});
module.exports = Historic
