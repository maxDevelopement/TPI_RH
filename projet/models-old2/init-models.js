var DataTypes = require("sequelize").DataTypes;
var _Candidacy = require("./Candidacy");
var _Contract = require("./Contract");
var _Employee = require("./Employee");
var _Evaluation = require("./Evaluation");
var _Joboffer = require("./Joboffer");
var _Leaverequest = require("./Leaverequest");

function initModels(sequelize) {
  var Candidacy = _Candidacy(sequelize, DataTypes);
  var Contract = _Contract(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Evaluation = _Evaluation(sequelize, DataTypes);
  var Joboffer = _Joboffer(sequelize, DataTypes);
  var Leaverequest = _Leaverequest(sequelize, DataTypes);

  // decraration of relations of models

  Employee.hasMany(Contract, { foreignKey : 'fk_employee'})
  Contract.belongsTo(Employee)

  Contract.hasMany(Evaluation, { foreignKey: 'fk_contract'})
  Evaluation.belongsTo(Contract)

  Contract.hasMany(Leaverequest, { foreignKey: 'fk_contract'})
  Leaverequest.belongsTo(Contract)

  Joboffer.hasMany(Candidacy, { foreignKey: 'fk_job_offer' })
  Candidacy.belongsTo(Joboffer)

  return {
    Candidacy,
    Contract,
    Employee,
    Evaluation,
    Joboffer,
    Leaverequest,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
