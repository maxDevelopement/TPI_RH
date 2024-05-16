const Sequelize = require('sequelize');
const Evaluation = function(sequelize, DataTypes) {
  return sequelize.define('Evaluation', {
    id_evaluation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idEvaluation'
    },
    fk_contract: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkContract'
    },
    evaluation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'EvaluationDate'
    },
    performance_note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'PerformanceNote'
    },
    positiv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Positiv'
    },
    negativ: {
      type: DataTypes.INTEGER,
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
  });
};

module.exports = { Evaluation }