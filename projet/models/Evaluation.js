const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Evaluation = sequelize.define('Evaluation', {
    idEvaluation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idEvaluation'
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
    evaluationDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'EvaluationDate'
    },
    performanceNote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'PerformanceNote'
    },
    positiv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Positiv'
    },
    negativ: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Negativ'
    }
  }, {
    sequelize,
    tableName: 'evaluation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEvaluation" },
        ]
      },
      {
        name: "fk_Evaluations_Contracts1_idx",
        using: "BTREE",
        fields: [
          { name: "fkContract" },
        ]
      },
    ]
});
module.exports = Evaluation