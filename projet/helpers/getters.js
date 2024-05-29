const Employee = require('../models/Employee')
const Contract = require('../models/Contract')
const JobOffer = require('../models/Joboffer')
const LeaveRequest = require('../models/Leaverequest')
const Evaluation = require('../models/Evaluation')
const { setArrayToSend } =require('./setters')

// Cette fonction recherche un employé par son pseudo et récupère ses informations complètes.
// Retourne un objet contenant les informations de l'employé, son contrat, ses demandes de congé et ses évaluations, ou null si non trouvé.
async function getEmployeeByPseudo(pseudo){
    try{
        const searchedEmployee = await Employee.findOne({where: {pseudo: pseudo}})
        const id = searchedEmployee.dataValues.idEmployee
        if(searchedEmployee){
            const searchedContract = await getContractOfEmployee(id)
            if(!searchedContract){
                return null
            }
            const searchedLeaveRequests = await getAllLeaveRequestsOfContract(searchedContract.idContract)
            const searchedEvaluations = await getAllEvaluationOfEmployee(searchedContract.idContract)
            const dataToReturn = {
                employee: searchedEmployee.dataValues,
                contract: searchedContract,
                leaveRequests: searchedLeaveRequests,
                evaluations: searchedEvaluations
            }
            return dataToReturn
        }else{
            return null
        }
    }catch(error){
        return null
    }
}
// Cette fonction recherche un employé par son identifiant.
// Retourne l'objet employé si trouvé, sinon retourne null.
async function getEmployeeById(idEmployee){
    try{
        const selectedEmployee = await Employee.findOne({idEmployee: idEmployee})
        if(!selectedEmployee){           
            return null
        }
        return selectedEmployee
    }catch(error){
        return null
    }
}
// Récupère toutes les évaluations d'un employé pour un contrat donné.
// Retourne un tableau des évaluations ou null en cas d'erreur.
async function getAllEvaluationOfEmployee(idContract){
    try{
        const allEvaluation = await Evaluation.findAll({ where: {fkContract: idContract}})
        const dataToSend = setArrayToSend(allEvaluation)
        return dataToSend
    }catch(error){
        return null
    }
    
}
// Recherche le contrat d'un employé par son identifiant.
// Retourne l'objet contrat si trouvé, sinon retourne null.
async function getContractOfEmployee(idEmployee){
    try{
        const searchedContract = (await Contract.findOne({where: {fkEmployee: idEmployee}}))
        if(!searchedContract){
                return null
        }
        return searchedContract
    }catch(error){
        console.log(error)
        return null
    }
}
// Recherche une offre d'emploi spécifique par son identifiant.
// Retourne les détails de l'offre d'emploi si trouvée, sinon retourne null.
async function getSpecificJobOffer(idJobOffer){
    try{
        const searchedJobOffer = await JobOffer.findOne({where: {idJobOffer: idJobOffer}})
        if(searchedJobOffer){
            return searchedJobOffer.dataValues
        }else{
            return null
        }
    }catch(error){
        return null
    }
}
// Récupère toutes les demandes de congé pour un contrat donné.
// Retourne un tableau des demandes de congé ou null en cas d'erreur.
async function getAllLeaveRequestsOfContract(idContract){
    try{
        const leaveReqSearched = await LeaveRequest.findAll({where: {fkContract: idContract}})
        if(leaveReqSearched){
            let leaveRequestsToReturn
            const lrToReturn = setArrayToSend(leaveReqSearched)
            return lrToReturn
        }else{
            return null
        }        
    }catch(error){
        return null
    }
}


module.exports = {
    getEmployeeById,
    getEmployeeByPseudo,
    getContractOfEmployee,
    getSpecificJobOffer,
    getAllLeaveRequestsOfContract,
    getAllEvaluationOfEmployee
}