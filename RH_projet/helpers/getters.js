const Employee = require('../models/Employee')
const Contract = require('../models/Contract')
const JobOffer = require('../models/Joboffer')

async function getEmployeeByPseudo(pseudo){
    try{
        const searchedEmployee = await Employee.findOne({where: {pseudo: pseudo}})
        const id =searchedEmployee.dataValues.idEmployee
        if(searchedEmployee){
            const searchedContract = await getContractOfEmployee(id)
            console.log("contrat trouvé : ", searchedContract)
            if(!searchedContract){
                return null
            }
            const dataToReturn = {
                employee: searchedEmployee.dataValues,
                contract: searchedContract
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
        if(selectedEmployee){
            const searchedContract = await getContractOfEmployee(searchedEmployee.dataValues.idEmployee)
            if(!searchedContract){
                return null
            }
            const dataToReturn = {
                employee: searchedEmployee.dataValues,
                contract: searchedContract
            }
            return dataToReturn
        }else{
            return null
        }
    }catch(error){
        return null
    }
}

async function getContractOfEmployee(idEmployee){
    try{
        const searchedContract = await Contract.findOne({where: {fkEmployee: idEmployee}})
        if(searchedContract){
            return searchedContract.dataValues
        }else{
            return null
        }
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

module.exports = {
    getEmployeeById,
    getEmployeeByPseudo,
    getSpecificJobOffer
}