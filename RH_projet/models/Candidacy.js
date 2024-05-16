const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

  const Candidacy = sequelize.define('Candidacy', {
    idCandidacy: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idCandidacy'
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
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Mail'
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Phone'
    },
    postulationDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'PostulationDate'
    },
    interviewDate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'InterviewDate'
    },
    decision: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "pending",
      field: 'Decision'
    },
    fkJobOffer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'joboffer',
        key: 'idJobOffer'
      },
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
      {
        name: "fk_Candidacy_Job_offers1_idx",
        using: "BTREE",
        fields: [
          { name: "fkJobOffer" },
        ]
      },
    ]
});

module.exports = Candidacy