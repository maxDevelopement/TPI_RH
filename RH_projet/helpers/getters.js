const Employee = require('../models/Employee')
const JobOffer = require('../models/Joboffer')

async function getEmployeeByPseudo(pseudo){
    try{
        const searchedEmployee = await Employee.findOne({where: {pseudo: pseudo}})
        if(searchedEmployee){
            return searchedEmployee.dataValues
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
            console.log("employee trouvé : ", selectedEmployee.dataValues)
            return selectedEmployee.dataValues
        }else{
            return null
        }
    }catch(error){
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