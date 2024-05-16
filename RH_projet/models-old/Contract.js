const Sequelize = require('sequelize');
const Contract = function(sequelize, DataTypes) {
  return sequelize.define('Contract', {
    id_contract: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idContract'
    },
    fk_employee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkEmployee'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Type'
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'StartDate'
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
  });
};

module.exports = { Contract }