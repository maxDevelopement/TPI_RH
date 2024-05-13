const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

  const Candidacy = sequelize.define('Candidacy', {
    id_candidacy: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idCandidacy'
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Lastname'
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Firstname'
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Mail'
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Phone'
    },
    postulationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'PostulationDate'
    },
    interviewDate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'InterviewDate'
    },
    decision: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      field: 'Decision'
    },
    fkJobOffer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkJobOffer'
    }
  }, {
    sequelize,
    tableName: 'candidacy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCandidacy" },
        ]
      },
      {
        name: "Mail",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Mail" },
          { name: "Phone" },
        ]
      },
    ]
  })
  
module.exports = Candidacy 