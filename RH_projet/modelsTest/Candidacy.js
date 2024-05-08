const Sequelize = require('sequelize');
const Candidacy =  function(sequelize, DataTypes) {
  return sequelize.define('Candidacy', {
    id_candidacy: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idCandidacy'
    },
    lastname: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Lastname'
    },
    firstname: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Firstname'
    },
    mail: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Mail'
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Phone'
    },
    postulation_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'PostulationDate'
    },
    interview_date: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'InterviewDate'
    },
    decision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Decision'
    },
    fk_job_offer: {
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
    ]
  });
};
module.exports = { Candidacy }