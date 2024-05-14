const Employee = require('../models/Employee')
const JobOffer = require('../models/Joboffer')

async function getSpecificEmployee(idEmployee){
    try{
        const selectedEmployee = await Employee.findOne()
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
async function getSpecificCandidacy(){

}

module.exports = {
    getSpecificEmployee,
    getSpecificJobOffer
}