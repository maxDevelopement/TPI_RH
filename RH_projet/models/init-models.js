var DataTypes = require("sequelize").DataTypes;
var _Candidacy = require("./Candidacy");
var _Contract = require("./Contract");
var _Employee = require("./Employee");
var _Evaluation = require("./Evaluation");
var _Historic = require("./Historic");
var _Joboffer = require("./Joboffer");
var _Leaverequest = require("./Leaverequest");

function initModels(sequelize) {
  var Candidacy = _Candidacy(sequelize, DataTypes);
  var Contract = _Contract(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Evaluation = _Evaluation(sequelize, DataTypes);
  var Historic = _Historic(sequelize, DataTypes);
  var Joboffer = _Joboffer(sequelize, DataTypes);
  var Leaverequest = _Leaverequest(sequelize, DataTypes);

  Evaluation.belongsTo(Contract, { as: "fk_contract_contract", foreignKey: "fk_contract"});
  Contract.hasMany(Evaluation, { as: "evaluations", foreignKey: "fk_contract"});
  Historic.belongsTo(Contract, { as: "fk_contract_contract", foreignKey: "fk_contract"});
  Contract.hasMany(Historic, { as: "historics", foreignKey: "fk_contract"});
  Leaverequest.belongsTo(Contract, { as: "fk_contract_contract", foreignKey: "fk_contract"});
  Contract.hasMany(Leaverequest, { as: "leaverequests", foreignKey: "fk_contract"});
  Contract.belongsTo(Employee, { as: "fk_employee_employee", foreignKey: "fk_employee"});
  Employee.hasMany(Contract, { as: "contracts", foreignKey: "fk_employee"});
  Candidacy.belongsTo(Joboffer, { as: "fk_job_offer_joboffer", foreignKey: "fk_job_offer"});
  Joboffer.hasMany(Candidacy, { as: "candidacies", foreignKey: "fk_job_offer"});

  return {
    Candidacy,
    Contract,
    Employee,
    Evaluation,
    Historic,
    Joboffer,
    Leaverequest,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
