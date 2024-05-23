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
    evaluationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'EvaluationYear'
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
    createdAt: true,
    updatedAt: false,
    tableName: 'Evaluation',
    timestamps: true,
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