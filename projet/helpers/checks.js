const LeaveRequest = require('../models/Leaverequest')
const JobOffer = require('../models/Joboffer')
const { Op } = require('sequelize')

// cette fonction check si une demande de congé a une meme startDate pour cet user
// calculer si une date fait partie d'une autre demande de congé ? 
async function checkValidityLeaveRequest(idUser, startDate){
    console.log("checkLeaveRequestValidity")
    const leaveReqCheck = await LeaveRequest.findAll(
        {
            where: {
                [Op.and]: [{fkContract: idUser}, {startDate: startDate}]
            },
        }
    )
    if(leaveReqCheck.length === 0) {
        return true
    }else{
        return false
    }
}

// verifie que le job existe et est statut toujours pending ==> insertCandidacy
async function checkValidityJobOffer(idJob){
    console.log("isJobOfferValid")
    const jobSearched = (await JobOffer.findOne({where: {idJobOffer: idJob}})).dataValues
    console.log("job : ", jobSearched)
    if(jobSearched && jobSearched.status === 'pending'){
        return true
    }else{
        return false
    }
}
// check si des infos ont changées dans le contrat
function checkChangeData(oldArray, newArray){
    const oldOne = JSON.stringify(oldArray)
    const newOne = JSON.stringify(newArray)

    if(oldOne === newOne){
        return true
    }else{
        return false
    }
}

module.exports = {
    checkValidityLeaveRequest, 
    checkValidityJobOffer,
    checkChangeData
}