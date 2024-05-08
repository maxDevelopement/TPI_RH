const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Joboffer', {
    id_job_offer: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idJobOffer'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Name'
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Place'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Status'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Rate'
    }
  }, {
    sequelize,
    tableName: 'joboffer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idJobOffer" },
        ]
      },
    ]
  });
};
