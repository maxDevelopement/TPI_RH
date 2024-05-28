const Employee = require('../models/Employee')
const Contract = require('../models/Contract')
const JobOffer = require('../models/Joboffer')
const LeaveRequest = require('../models/Leaverequest')
const Evaluation = require('../models/Evaluation')
const { setArrayToSend } =require('./setters')

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

async function getAllEvaluationOfEmployee(idContract){
    try{
        const allEvaluation = await Evaluation.findAll({ where: {fkContract: idContract}})
        const dataToSend = setArrayToSend(allEvaluation)
        return dataToSend
    }catch(error){
        return null
    }
    
}

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