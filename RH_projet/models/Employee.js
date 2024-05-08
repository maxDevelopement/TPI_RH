const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    id_employee: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idEmployee'
    },
    pseudo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Pseudo'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Password'
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Lastname'
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Firstname'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Email'
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Job'
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Phone'
    },
    iban: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'IBAN'
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Street'
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Number'
    },
    npa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'NPA'
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'City'
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Rate'
    },
    activ: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Activ'
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEmployee" },
        ]
      },
      {
        name: "Pseudo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Pseudo" },
          { name: "Email" },
          { name: "Phone" },
          { name: "IBAN" },
        ]
      },
    ]
  });
};
