const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')
const Evaluation = sequelize.define('Evaluation', {
  id_evaluation: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'idEvaluation'
  },
  fkContract: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fkContract'
  },
  evaluationDate: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'EvaluationDate'
  },
  performanceNote: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'PerformanceNote'
  },
  positiv: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Positiv'
  },
  negativ: {
    type: DataTypes.STRING,
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
  ]
})
module.exports = Evaluation
